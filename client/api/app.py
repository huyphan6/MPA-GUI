import json
from flask import Flask, request, g, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import sqlite3

api = Flask(__name__)
CORS(api, resources={r"/*": {"origins": "*"}})

api.config["JWT_SECRET_KEY"] = '852e56d4-a722-4ce4-bc95-9260f6230da1'
jwt = JWTManager(api)
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = False

#sqlite database configuration
def connect_db():
    sql = sqlite3.connect('/Users/huyphan/gui_project/flask_server/database.db')
    # sql.row_factory = sqlite3.Row
    return sql

def get_db():
    if not hasattr(g, 'sqlite3'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

@api.teardown_appcontext
def close_db(error):
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

def getUser(username):
    conn = get_db()
    cursor = conn.cursor()
    cursor = conn.execute('SELECT username FROM users WHERE username = ?', (username,))
    result = cursor.fetchone()
    return result

with api.app_context():
    print(getUser('huyphan6'))

def getUserPassword(username):
    conn = get_db()
    cursor = conn.cursor()

    cursor = conn.execute('SELECT password FROM users WHERE username = ?', (username,))
    result = cursor.fetchone()
    return result

@api.route('/', methods=['GET'])
def home():
    return {"message": "Welcome to the API"}, 200 

#JWT TOKEN VALIDATION
@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@api.route('/token', methods=["POST"])
def create_token():
    username = request.json["username"]
    password = request.json["password"]
    print(username)
    print(password)
    print(getUser(username))
    print(getUserPassword(username))
    if username not in getUser(username) or password != getUserPassword(username)[0]:
        return {"msg": "Wrong username or password"}, 401

    access_token = create_access_token(identity=username)
    response = {"access_token":access_token}
    return response, 200

@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@api.route('/profile')
@jwt_required() 
def my_profile():
    response_body = {
        "name": "Huy",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

if __name__ == '__main__':
    api.run(debug=True)