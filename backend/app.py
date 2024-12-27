from flask import Flask, jsonify, request
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Constant for the number of articles per page
PER_PAGE = 12
MAX_ARTICLES = 185


# Function to generate unique articles for each page
def generate_articles_for_page(page, per_page):
    start_id = (page - 1) * per_page + 1
    end_id = (
        start_id + per_page if start_id + per_page <= MAX_ARTICLES else MAX_ARTICLES
    )
    articles = [
        {
            "id": i,
            "title": f"Breaking News: Event {i}",
            "content": f"Content of article {i}. This is a detailed description of event {i}. The article provides insights into the latest happenings in the world of news and current events.",
        }
        if i % 3 != 0
        else {
            "id": i,
            "title": f"Opinion: Thought on Topic {i}",
            "content": f"Content of opinion article {i}. A deep dive into the perspectives and views on topic {i}, analyzing the social, political, and cultural implications.",
        }
        for i in range(start_id, end_id)
    ]
    return articles


@app.route("/", methods=["GET"])
def hello():
    return jsonify({"status": 1, "message": "Hello World"}), 200


@app.route("/articles", methods=["GET"])
def get_articles():
    try:
        # Simulate user identification (e.g., via a header or token)
        user_id = request.headers.get("Authorization", "anonymous")
        assert user_id

        # Simulate a bad response randomly
        if random.choice([True, False]):
            return jsonify(
                {
                    "error": "Oops! Something went terribly wrong. Our servers are currently on a coffee break. Please try again later!"
                }
            ), 500

        # Get pagination parameters
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", PER_PAGE))

        if page < 1:
            return jsonify({"error": "Invalid page number"}), 400

        # Set the maximum number of articles
        max_pages = (MAX_ARTICLES + per_page - 1) // per_page

        # Generate articles for the current page
        paginated_articles = generate_articles_for_page(page, per_page)

        is_next = page < max_pages

        # Return paginated response
        return jsonify(
            {
                "page": page,
                "per_page": per_page,
                "is_next": is_next,
                "data": paginated_articles,
            }
        ), 200

    except Exception as e:
        # Return detailed error message
        return jsonify({"error": "An error occurred", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
