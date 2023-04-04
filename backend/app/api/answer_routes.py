from flask import Blueprint, jsonify, session, request
from ..models import Answer, db

answer_routes = Blueprint("answer", __name__)

@answer_routes.route('/<int:answer_id>')
def specific_answer():
    print(request)
    # answer = Answer.query.filter_by(id=)
    return Answer.to_dict()
@answer_routes.route('/')
def root():
    print('hello')
    return 'hello'