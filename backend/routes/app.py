from flask import Flask, jsonify, request
from server import add_to_db, get_info, generate_json_text
from news_api import news_api
import json
import psycopg2
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone

app = Flask(__name__)
app.register_blueprint(news_api)

load_dotenv()

user= os.getenv("SUPABASE_USER")
password=os.getenv("SUPABASE_PASS")
host=os.getenv("SUPABASE_HOST")
port=os.getenv("SUPABASE_PORT")
database=os.getenv("SUPABASE_DB")

TOP_STOCKS = {"nvda", "aapl", "amzn"}

def check_if_recent_in_db(current_stock):
    conn = psycopg2.connect(dbname = database, user = user, password = password, host = host, port = port)
    cur = conn.cursor()
    cur.execute("SELECT to_regclass(%s);", (f"{"public"}.{current_stock}",))
    found = cur.fetchone()[0] is not None
    if found:
        cur.execute(f"SELECT last_update FROM {current_stock}_gen_info")
        if datetime.now(timezone.utc) - cur.fetchone()[0].replace(tzinfo=timezone.utc) > timedelta(hours=6):
            cur.execute(f"DROP TABLE \"{current_stock}\", \"{current_stock}_gen_info\"")
            conn.commit()
            cur.close()
            conn.close()
            return False
    cur.close()
    conn.close()
    return found

def get_prediction_from_database(current_stock):
    try:
        conn = psycopg2.connect(dbname = database, user = user, password = password, host = host, port = port)
        cur = conn.cursor()

        prices_dict = {}
        gen_info_dict = {}
        current_information = {}

        cur.execute(f"""
                    SELECT * FROM {current_stock}
                    """)

        for prediction in cur.fetchall():
            prices_dict[str(prediction[0])] = (prediction[1], prediction[2], prediction[3])

        cur.execute(f"""
                    SELECT * FROM {current_stock}_gen_info
                    """)

        db_gen_info = cur.fetchone()
        gen_info_dict["outlook"] = db_gen_info[1]
        gen_info_dict["confidence"] = db_gen_info[2]
        gen_info_dict["reasoning"] = db_gen_info[3]

        current_information["prices"] = prices_dict
        current_information["info"] = gen_info_dict

        conn.commit()
        cur.close()
        conn.close()

        return jsonify(current_information)
    except Exception as e:
        print(f"Error in prediction: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/predictions", methods=["GET"])
def predictions():
    try:
        current_stock = request.args.get("symbol").lower()
        if current_stock not in TOP_STOCKS:
            if check_if_recent_in_db(current_stock) is False:
                historical_data, reddit_data, news_data = get_info(current_stock)
                json_text = generate_json_text(current_stock, historical_data, reddit_data, news_data)
                current_information = json.loads(json_text)
                add_to_db(current_stock, current_information)
        return get_prediction_from_database(current_stock)
    except Exception as e:
        print(f"Error in prediction: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/news", methods=["GET"])
def news():
    return jsonify({"message": "News route"})

if __name__ == "__main__":
    app.run(debug=True)