from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from ..models import User, db, QuestionVote


question_votes_routes = Blueprint('question_votes', __name__)


@question_votes_routes.route("/current")
@login_required
def get_user_question_votes():
    '''
    Query for all question_votes for current user
    '''
    user_question_votes=QuestionVote.query.filter(QuestionVote.user_id==current_user.id).all()
    # return jsonify([user_question_vote.to_dict() for user_question_vote in user_question_votes])
    # list in json format
    question_votes_list=[user_question_vote.to_dict() for user_question_vote in user_question_votes]
    return {"question_votes":question_votes_list}
