from flask import Flask, jsonify, request
from gemini import chat_with_gemini

app = Flask(__name__)

@app.route('/validate', methods=['POST'])
def validate_word_with_gemini():
    data = request.get_json()
    word = data.get("word")
    theme = data.get("theme")

    response = chat_with_gemini(word, theme).strip()

    if response == "200":
        return jsonify({"message": "Palavra existe e está relacionada ao tema!"}), 200
    elif response == "400":
        return jsonify({"message": "Palavra existe mas não tem relação com tema!"}), 400
    else:
        return jsonify({"message": "Palavra não existe"}), 404

if __name__ == '__main__':
    app.run(debug=True)
