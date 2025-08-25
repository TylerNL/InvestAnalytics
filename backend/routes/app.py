from flask import Flask, jsonify
from server import add_to_db, get_info, generate_json_text
from news_api import news_api
import json

app = Flask(__name__)
app.register_blueprint(news_api)

@app.route("/api/predictions", methods=["GET"])
def predictions():
    try:
        current_stock = "amzn"
        historical_data, reddit_data, news_data = get_info(current_stock)
        json_text = generate_json_text(current_stock, historical_data, reddit_data, news_data)
        current_information = json.loads(json_text)
        add_to_db(current_stock, current_information)
        return jsonify(current_information)
    except Exception as e:
        print(f"Error in prediction: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/news", methods=["GET"])
def news():
    return jsonify({"message": "News route"})

if __name__ == "__main__":
    app.run(debug=True)