from flask import Blueprint, jsonify, session, request
from ..models import Answer, db, User
from flask_login import login_required

answer_routes = Blueprint("answer", __name__)


@answer_routes.route('/current')
@login_required
def current_answer():
    print(session["_user_id"])
    id = int(session["_user_id"])
    answers = Answer.query.filter_by(user_id = id).all()
    if answers:
        return {'answers': [answer.to_dict() for answer in answers]}
    else:
        return jsonify({'message':'Answers could not be found', 'statusCode':404}), 404

@answer_routes.route('/<int:id>')
def specific_answer(id):
    answer = Answer.query.get(id)
    if answer:
        owner = User.query.get(answer.user_id)
        owner_dict = {'id':owner.id, 'username':owner.username}
        dictionary = {'id':answer.id, 'details':answer.details, 'created_at':answer.created_at, 'updated_at':answer.updated_at,'user_id':answer.user_id,'vote_score':len(answer.answer_votes), 'owner':owner_dict}
        return jsonify(dictionary)
    else:
        return jsonify({'message':'Answer could not be found', 'statusCode':404}), 404
@answer_routes.route('/')
def root():
    print('hello')
    return 'hello'