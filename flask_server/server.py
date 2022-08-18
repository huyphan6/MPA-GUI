from flask import Flask, jsonify, request, g
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def connect_db():
    sql = sqlite3.connect('./database.db')
    # sql.row_factory = sqlite3.Row
    return sql

def get_db():
    if not hasattr(g, 'sqlite3'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

@app.route('/')
def index():
    return '<h1>Hello World</h1>'

@app.route('/register', methods=['GET', 'POST'])
def users():
    conn = get_db()
    cursor = conn.cursor()

    if request.method == 'GET':
        print(request.json)
        cursor = conn.execute('SELECT * FROM users')
        result = cursor.fetchall()
        return jsonify(result)


    if request.method == 'POST':
        print(request.json)
        first_name = request.json['firstName']
        last_name = request.json['lastName']
        email = request.json['email']
        username = request.json['username']
        pwd = request.json['password']

        sql_query = """INSERT INTO users (firstName, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)"""
        cursor = cursor.execute(sql_query, (first_name, last_name, email, username, pwd))
        conn.commit()

        return f"User {username} with the id: {cursor.lastrowid} has been registered successfully"

@app.route('/login', methods=['POST'])
def login():
    print(request.json)
    conn = get_db()
    cursor = conn.cursor()

    if request.method == 'POST':
        print(request.json)
        username = request.json['username']
        pwd = request.json['password']

        sql_query = """SELECT * FROM users WHERE username = ? AND password = ?"""
        cursor = cursor.execute(sql_query, (username, pwd))
        result = cursor.fetchall()
        
        if result == []:
            return False
        else:
            return True

if __name__ == "__main__":
    app.run(debug=True)