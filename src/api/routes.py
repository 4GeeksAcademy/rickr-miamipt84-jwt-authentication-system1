"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Invoice
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/token', methods=['POST'])
def generate_token():
    #login credentials
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # query the DB to check if the user email exists
    email = email.lower()
    user = User.query.filter_by(email=email).first()

    # create a condition to check if the user does NOT exist OR if the password is incorrect
    if user is None:
        return jsonify({'message': 'Sorry! Email or password do not match.'}), 401
    elif user is not None and user.password != password:
        return jsonify({'message': 'Sorry! Email or password do not match.'}), 401
    

    # the user DOES exist and the email/password matches
    access_token = create_access_token(identity=str(user.id))

    response = {
        'access_token': access_token,
        'user_id': user.id,
        'message': f'Welcome {user.email}!'
    }

    return jsonify(response), 200

@api.route('/signup', methods=['POST'])
def new_signup():
    #login credentials
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # query the DB to check if the email already exists
    email = email.lower()
    user = User.query.filter_by(email=email).first()

    if user is not None and user.email == email:
        response = {
            "message": f'{user.email} already exists. Please log in.'
        }
        return jsonify(response), 403
    
    new_user = User()
    new_user.email = email
    new_user.password = password
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()

    response = {
        "message": f'{new_user.email} was successfully added! Please log in.'
    }

    return jsonify(response), 201

# protected route(s)
@api.route('/invoices', methods=['GET'])
@jwt_required()
def get_invoices():
    # access the user_id of the curtrent user with a valid token
    # you do this with with the function get_jwt_identity
    user_id = get_jwt_identity()
    

    user = User.query.filter_by(id = user_id).first()

    # once we have the user_id queried, we can then query their invoices
    user_invoices = Invoice.query.filter_by(user_id=user_id).all()

    # we need to seralize the invoice objects (dicts) and put them in an array (list)
    # use a list comprehension (for loop) that will:
    # 1. get each invoice object and serialize it, and
    # 2. put them in a variable as an array, or list
    processed_invoices = [each_invoice.serialize() for each_invoice in user_invoices]

    if user_invoices is None or len(processed_invoices) == 0:
        response = {
            "message": f'{user.email}, you have no invoices.',
            "invoices": processed_invoices,
        }
        return jsonify(response), 200
    
    response = {
        "message": f'Here are your invoices, {user.email}!',
        "invoices": processed_invoices,
    }

    return jsonify(response), 200





# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200