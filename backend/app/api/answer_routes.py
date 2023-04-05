from flask import Blueprint, jsonify, session, request
from ..models import Answer, db, User, AnswerVote
from flask_login import login_required,current_user
from datetime import datetime
from ..models.utils import BaseException,ValidationException,NotFoundException,ForbiddenException,handle_error


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

@answer_routes.route('/<int:id>/votes',methods=["POST"])
@login_required
def add_vote(id):
    '''
    Create a vote to an answer by id
    '''
    # answer = Answer.query.get(id)
    # if answer:
    #     user_id = int(session["_user_id"])
    #     answer_id = id
    #     vote =AnswerVote(is_liked=bool(request.form["is_liked"]),created_at =datetime.now(),updated_at=datetime.now(),user_id=user_id,answer_id=answer_id)
    #     db.session.add(vote)
    #     db.session.commit()
    #     return vote.to_dict()
    # else:
    #     return jsonify({"message": "Answer couldn't be found","statusCode": 404})
    try:
        is_liked=request.json.get("isLiked",None)
        if is_liked is None:
            raise ValidationException("Is_liked is required.")
        if not isinstance(is_liked, bool):
            raise ValidationException("Is_liked must be a boolean value.")
        user_id=current_user.id
        answer = Answer.query.filter(Answer.id==id).first()
        if answer is None:
            raise NotFoundException("Answer couldn't be found.")
    except BaseException as err:
        return handle_error(err)

    new_vote = AnswerVote.add_answer_vote(is_liked=is_liked, user_id=user_id, answer_id=id)
    return new_vote.to_dict()


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
