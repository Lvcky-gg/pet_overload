from flask import Blueprint, jsonify, session, request
from ..models import Answer, db, User, AnswerVote
from flask_login import login_required,current_user
from datetime import datetime
from ..models.utils import BaseException,ValidationException,NotFoundException,ForbiddenException,handle_error


answer_routes = Blueprint("answers", __name__)


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
        existing_vote=AnswerVote.query.filter_by(user_id=user_id,answer_id=id).first()
        if existing_vote:
            raise ForbiddenException("User already voted this answer")
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

@answer_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def remove_answer(id):
    answer = Answer.query.get(id)
    if answer:
        user_id = int(answer.user_id)
        check_user_id = int(session["_user_id"])
        if user_id == check_user_id:
            Answer.query.filter_by(id=id).delete()
            db.session.commit()
            return {"message": "Answer deleted"}
        else:
            return jsonify({"message": "Unauthorized User", "status":"403"}),403
    else:
        return jsonify({"message": "Answer couldn't be found","statusCode": 404}),404

@answer_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_answer(id):
    answer = Answer.query.get(id)
    if answer:
        user_id = int(answer.user_id)
        check_user_id = int(session["_user_id"])
        if user_id == check_user_id:
            answer.details = request.json
            db.session.commit()
            answercheck = Answer.query.get(id)
            return jsonify(answer.to_dict())
        else:
            return jsonify({"message": "Unauthorized User", "status":"403"}),403
    else:
        return jsonify({"message": "Answer couldn't be found","statusCode": 404}),404

@answer_routes.route('/')
def root():
    answers = Answer.query.all()
    #route here

    return {'Answers':[answer.to_dict() for answer in answers]}
