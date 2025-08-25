from flask import Blueprint, request, jsonify
import psycopg2 # type: ignore
import os
import json
from dotenv import load_dotenv # type: ignore

load_dotenv()
supabase_connection = os.getenv("SUPABASE_CONNECTION_STRING")

user= os.env("SUPABASE_USER")
password=os.env("SUPABASE_PASS")
host=os.env("SUPABASE_HOST")
port=5432
database=os.env("SUPABASE_DB")

prediction_api = Blueprint("prediction_api", __name__)


@prediction_api.route("/predictions", methods = ["GET"])
def get_stock_json():
    safe_symbols = {"nvda", "amzn"}
    symbol = request.args.get("symbol")
    if symbol not in safe_symbols:
        raise ValueError
    
    conn = psycopg2.connect(dbname = database, user = user, password = password, host = host, port = port)
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


