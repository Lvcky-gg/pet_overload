from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from ..models import User, db, AnswerVote


answer_votes_routes = Blueprint('answer_votes', __name__)


@answer_votes_routes.route("/current")
@login_required
def get_user_answer_votes():
    '''
    Query for all answer_votes for current user
    '''
    user_answer_votes=AnswerVote.query.filter(AnswerVote.user_id==current_user.id).all()
    # return jsonify([user_answer_vote.to_dict() for user_answer_vote in user_answer_votes])
    # list in json format
    answer_votes_list=[user_answer_vote.to_dict() for user_answer_vote in user_answer_votes]
    return {"answer_votes":answer_votes_list}
