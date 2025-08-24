import yfinance as yf
from google import genai
from google.genai import types
import json
import urllib.request
import praw
import psycopg2
import os
from datetime import datetime


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

reddit_client_id = os.getenv("reddit_client_id")
reddit_client_secret = os.getenv("reddit_client_secret")
reddit_user_agent = os.getenv("reddit_user_agent")

gnews_apikey = os.getenv("gnews_apikey")


def add_to_db(current_stock, stock_info):
    conn = psycopg2.connect(host = "localhost", dbname = "postgres", user = "postgres", password = "Password123")

    cur = conn.cursor()

    cur.execute(f"""
                CREATE TABLE IF NOT EXISTS {current_stock}(
                date DATE, high FLOAT, low FLOAT, close FLOAT
                )
                """)
    
    for information in stock_info["forecast"]["predictions"]:
        cur.execute(f"""
                    INSERT INTO {current_stock} (date, high, low, close)
                    VALUES (%s, %s, %s, %s)
                    """, (information["date"], information["predicted_high"], information["predicted_low"], information["predicted_close"]))
    
    for information in stock_info["historical"]:
        cur.execute(f"""
                    INSERT INTO {current_stock} (date, high, low, close)
                    VALUES (%s, %s, %s, %s)
                    """, (information["date"], information["high"], information["low"], information["close"]))
        
    cur.execute(f"""
                CREATE TABLE IF NOT EXISTS {current_stock}_gen_info(
                last_update TIMESTAMP, outlook TEXT, confidence INT, rationale TEXT
                )
                """)
    
    cur.execute(f"""
                INSERT INTO {current_stock}_gen_info (last_update, outlook, confidence, rationale)
                VALUES (%s, %s, %s, %s)
                """, (datetime.now(), stock_info["forecast"]["outlook"], stock_info["forecast"]["confidence"], stock_info["forecast"]["rationale"]))
        

    conn.commit()

    cur.close()
    conn.close()


def generate_json_text(current_stock, historical_data, reddit_data, news_data):
    client = genai.Client(api_key=GEMINI_API_KEY)
    response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=f"""
            Role:
            You are a financial data analyst API endpoint. Your sole function is to analyze historical stock data and return predictions in strict JSON format.

            Critical Instructions:
            ALWAYS respond with valid JSON only,
            NO explanatory text before or after the JSON,
            NO markdown formatting or code blocks,
            Use consistent prediction methodology based on technical analysis patterns,
            Maintain numerical precision to 2 decimal places.
            Maintain consistent time intervals: Predicted dates must follow the exact same time gaps as the historical data (e.g., if historical data shows weekly intervals every Monday, predictions must be the next 3 consecutive Mondays)

            Input Format
            You will receive four data inputs for stock symbol {current_stock}:

            HIGH_PRICES: "YYYY-MM-DD,HH:MM,PRICE" (newline-separated)
            LOW_PRICES: "YYYY-MM-DD,HH:MM,PRICE" (newline-separated)
            CLOSE_PRICES: "YYYY-MM-DD,HH:MM,PRICE" (newline-separated)
            RECENT_NEWS: Recent headlines and article summaries
            SOCIAL_MEDIA_POSTS: User comments and influencer posts from Reddit

            Prediction Methodology:
            Use the following consistent approach:

            Technical Analysis (70% weight): Calculate 7-day moving average of closing prices, determine trend direction using linear regression on last 14 data points, apply volatility analysis using standard deviation of last 7 days
            Sentiment Analysis (30% weight): Analyze recent news and social media using this scoring system:

            Very Positive: +2 points (major positive developments, strong praise)
            Positive: +1 point (minor positive news, general optimism)
            Neutral: 0 points (factual reporting, mixed reactions)
            Negative: -1 point (concerns, minor setbacks)
            Very Negative: -2 points (major issues, strong criticism)



            Sentiment Integration Rules

            Calculate average sentiment score from news and social media
            If sentiment score >= 1.0: Add 2-4% to technical prediction
            If sentiment score <= -1.0: Subtract 2-4%% from technical prediction
            If sentiment score between -1.0 and 1.0: Adjust by sentiment score percentage

            Outlook Classification Rules

            "raise": Technical trend > 0.5% OR sentiment score >= 1.5
            "drop": Technical trend < -0.5% OR sentiment score <= -1.5
            "stable": Technical trend between -0.5%% and 0.5% AND sentiment score between -1.5 and 1.5

            Confidence Scoring Rules
            Calculate confidence using a point system, then convert to percentage:

            Base: 3 points
            Strong technical trend (>2%): +3 points
            Moderate technical trend (1-2%): +2 points
            Substantial sentiment data with clear direction: +3 points
            Moderate sentiment data: +2 points
            Technical and sentiment alignment: +2 points
            Low volatility: +1 point
            Conflicting signals: -3 points
            Sparse/poor data: -2 points

            Convert to percentage: (Points × 10) + 20 = Confidence %
            Required JSON Output Structure
            {{
            "historical": [
                {{
                "date": "YYYY-MM-DD",
                "high": 0.00,
                "low": 0.00,
                "close": 0.00
                }}
            ],
            "forecast": {{
                "predictions": [
                {{
                    "date": "YYYY-MM-DD",
                    "predicted_high": 0.00,
                    "predicted_low": 0.00,
                    "predicted_close": 0.00
                }},
                {{
                    "date": "YYYY-MM-DD",
                    "predicted_high": 0.00,
                    "predicted_low": 0.00,
                    "predicted_close": 0.00
                }},
                {{
                    "date": "YYYY-MM-DD",
                    "predicted_high": 0.00,
                    "predicted_low": 0.00,
                    "predicted_close": 0.00
                }}
                ],
                "outlook": "raise, drop, stable",
                "rationale": "Technical analysis shows [trend direction] with [X]%% sentiment score from recent news and social media coverage.",
                "confidence": X
              }}
            }}
            Data Input
            Stock: {current_stock}
            HIGH_PRICES:
            {historical_data["High"]}
            LOW_PRICES:
            {historical_data["Low"]}
            CLOSE_PRICES:
            {historical_data["Close"]}
            RECENT_NEWS:
            {news_data}
            SOCIAL_MEDIA_POSTS:
            {reddit_data}
            Final Reminder
            Respond ONLY with the JSON object. No additional text, explanations, or formatting.
            """,
    config={
        "response_mime_type": "application/json",
    },
    )
    return response.text



def get_info(current_stock: str):
    ticker = yf.Ticker(current_stock)
    current_historical = ticker.history(period="4mo", interval="1wk")

    reddit = praw.Reddit(
    client_id=reddit_client_id,
    client_secret=reddit_client_secret,
    user_agent=reddit_user_agent)


    reddit_data = ""
    submission_count = 0
    for submission in reddit.subreddit("all").search(f"${current_stock}",  sort = "relevance", time_filter = "month"):
        submission_count += 1
        reddit_data += f"Title: {submission.title} "
        if len(submission.selftext) < 200:
            reddit_data += f"Description: {submission.selftext} "
        else:
            reddit_data += f"Description: {submission.selftext[:200]}"
        if submission_count == 10:
            break



    news_url = f"https://gnews.io/api/v4/search?q=\"${current_stock}\"&lang=en&country=us&max=10&apikey={gnews_apikey}"
    news_data = ""
    with urllib.request.urlopen(news_url) as response:
        data = json.loads(response.read().decode("utf-8"))
        articles = data["articles"]
        for i in range(7):
            news_data += f"Title: {articles[i]['title']} "
            news_data += f"Description: {articles[i]['description']} "

    return current_historical, reddit_data, news_data



def server_run():
    current_stock = "amzn"
    historical_data, reddit_data, news_data = get_info(current_stock)
    json_text = generate_json_text(current_stock, historical_data, reddit_data, news_data)
    current_information = json.loads(json_text)
    add_to_db(current_stock, current_information)
    return current_information


if __name__ == "__main__":
    server_run()