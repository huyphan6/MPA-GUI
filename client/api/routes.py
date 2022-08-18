"""
This module starts the API server, loads the database, and adds the endpoints
"""

import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS
from api.models import db, User, UserSchema, Post, PostSchema
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager 

api = Blueprint('api', __name__)

api.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
jwt = JWTManager(api)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

if __name__ == "__main__":
    api.run(debug=True)