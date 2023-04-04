from flask import Blueprint, jsonify, session, request
from ..models import Answer, db

answer_routes = Blueprint("answer", __name__)

@answer_routes.route('/<int:id>')
def specific_answer(id):
    answer = Answer.query.get(id)
    print(answer)
    return 'hi'
@answer_routes.route('/')
def root():
    print('hello')
    return 'hello'