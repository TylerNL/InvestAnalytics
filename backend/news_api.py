import os
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

ALPHA_VANTAGE_API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")

@app.route("/api/news")
def get_news():
    tickers_param = request.args.get("tickers", "AAPL,BTC")
    tickers_list = [t.strip() for t in tickers_param.split(",")]

    # Prefix crypto tickers with 'CRYPTO:'
    processed_tickers = []
    for t in tickers_list:
        if t.upper() in ["BTC", "ETH", "SOL", "DOGE", "ADA", "HBAR", "XRP"]:  # Add more crypto tickers as needed
            processed_tickers.append(f"CRYPTO:{t.upper()}")
        else:
            processed_tickers.append(t.upper())

    tickers_str = ",".join(processed_tickers)
    url = (
        f"https://www.alphavantage.co/query?function=NEWS_SENTIMENT"
        f"&tickers={tickers_str}&apikey={ALPHA_VANTAGE_API_KEY}"
    )
    response = requests.get(url)
    data = response.json()
    print(data)
    articles = data.get("feed", [])
    limited_articles = articles[:5]
    return jsonify(limited_articles)

if __name__ == "__main__":
    app.run(port=5173)
       