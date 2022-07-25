from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

#app route
@app.route('/login', methods=['POST'])
def login():
    print(request.json.get("username"))
    print(request.json.get("password"))

    return request.json

@app.route("/members")
def members():
    return {'members': ['John', 'Mary', 'Bob']}

if __name__ == "__main__":
    app.run(debug=True)