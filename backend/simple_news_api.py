from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/api/news", methods=["GET"])
def get_news():
    # Load cached articles
    cache_path = os.path.join(os.path.dirname(__file__), "cached_articles.json")
    
    if not os.path.exists(cache_path):
        return jsonify([])
    
    try:
        with open(cache_path, "r") as f:
            cached_data = json.load(f)
            articles = cached_data.get("articles", [])
            
            # Get tickers parameter (for future personalization)
            tickers_param = request.args.get("tickers", "AAPL,BTC")
            print(f"Requested tickers: {tickers_param}")
            
            # Return limited articles (first 12 for better performance)
            limited_articles = articles[:12]
            return jsonify(limited_articles)
    except Exception as e:
        print(f"Error loading cached articles: {e}")
        return jsonify([])

if __name__ == "__main__":
    print("Starting simple news API server...")
    app.run(debug=True, port=5000)