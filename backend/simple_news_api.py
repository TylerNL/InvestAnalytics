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
            
            # Get tickers parameter for personalization
            tickers_param = request.args.get("tickers", "AAPL,BTC")
            requested_tickers = [t.strip().upper() for t in tickers_param.split(",")]
            print(f"Requested tickers: {requested_tickers}")
            
            # Filter articles based on relevance to requested tickers
            relevant_articles = []
            general_articles = []
            
            for article in articles:
                is_relevant = False
                
                # Check if article mentions any of the requested tickers
                ticker_sentiment = article.get("ticker_sentiment", [])
                for ticker_info in ticker_sentiment:
                    ticker_symbol = ticker_info.get("ticker", "").replace("CRYPTO:", "").replace("FOREX:", "")
                    if ticker_symbol in requested_tickers:
                        is_relevant = True
                        break
                
                # Also check title and summary for ticker mentions
                if not is_relevant:
                    title_upper = article.get("title", "").upper()
                    summary_upper = article.get("summary", "").upper()
                    for ticker in requested_tickers:
                        if f"${ticker}" in title_upper or f" {ticker} " in title_upper or ticker in title_upper:
                            is_relevant = True
                            break
                        if f"${ticker}" in summary_upper or f" {ticker} " in summary_upper:
                            is_relevant = True
                            break
                
                if is_relevant:
                    relevant_articles.append(article)
                else:
                    general_articles.append(article)
            
            # Prioritize relevant articles, then add general ones
            prioritized_articles = relevant_articles + general_articles
            
            # Return limited articles (first 12 for better performance)
            limited_articles = prioritized_articles[:12]
            
            print(f"Found {len(relevant_articles)} relevant articles out of {len(articles)} total")
            return jsonify(limited_articles)
            
    except Exception as e:
        print(f"Error loading cached articles: {e}")
        return jsonify([])

if __name__ == "__main__":
    print("Starting simple news API server...")
    app.run(debug=True, port=5000)