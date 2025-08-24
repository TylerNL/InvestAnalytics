from flask import Flask, request, jsonify
import psycopg2
import json


app = Flask(__name__)


@app.route("/predictions", methods = ["GET"])
def get_stock_json():
    safe_symbols = {"nvda", "amzn"}
    symbol = request.args.get("symbol")
    if symbol not in safe_symbols:
        raise ValueError
    
    conn = psycopg2.connect(host = "localhost", dbname = "postgres", user = "postgres", password = "Password123")
    cur = conn.cursor()

    prices_dict = {}
    gen_info_dict = {}
    total_dict = {}

    cur.execute(f"""
                SELECT * FROM {symbol}
                """)

    for prediction in cur.fetchall():
        prices_dict[str(prediction[0])] = (prediction[1], prediction[2], prediction[3])

    cur.execute(f"""
                SELECT * FROM {symbol}_gen_info
                """)

    db_gen_info = cur.fetchone()
    gen_info_dict["outlook"] = db_gen_info[1]
    gen_info_dict["confidence"] = db_gen_info[2]
    gen_info_dict["reasoning"] = db_gen_info[3]

    total_dict["prices"] = prices_dict
    total_dict["info"] = gen_info_dict

    conn.commit()
    cur.close()
    conn.close()


    return jsonify(total_dict)



if __name__ == "__main__":
    app.run(debug=True)