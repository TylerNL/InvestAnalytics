import os
import requests
from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
import json


ALPHA_VANTAGE_API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")
news_api = Blueprint("news_api", __name__)


@news_api.route("/api/news", methods=["GET"])
def get_news():
    cache_path = os.path.join(os.path.dirname(__file__), "cached_articles.json")
    cache_valid = False
    cached_data = None

    if os.path.exists(cache_path):
        with open(cache_path, "r") as f:
            try:
                cached_data = json.load(f)
                cache_time = datetime.fromisoformat(cached_data.get("timestamp", "1970-01-01T00:00:00"))
                if datetime.now() - cache_time < timedelta(hours=24):
                    cache_valid = True
            except Exception:
                pass

    if cache_valid and cached_data:
        articles = cached_data.get("articles", [])
        limited_articles = articles[:5]
        return jsonify(limited_articles)

    # If cache is missing or stale, fetch new data
    tickers_param = request.args.get("tickers", "AAPL,BTC")
    tickers_list = [t.strip() for t in tickers_param.split(",")]
    processed_tickers = []
    for t in tickers_list:
        if t.upper() in ["BTC", "ETH", "SOL", "DOGE", "ADA", "HBAR", "XRP"]:
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
    articles = data.get("feed", [])
    # Save to cache
    with open(cache_path, "w") as f:
        json.dump({"timestamp": datetime.now().isoformat(), "articles": articles}, f)
        print("Wrote new Articles")
    limited_articles = articles[:5]
    return jsonify(limited_articles)

       