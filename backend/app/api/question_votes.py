from flask import Blueprint,request
from flask_login import current_user,login_required
from ..models import QuestionVote
from ..models.utils import success,not_found,bad_request,forbidden


question_votes_routes = Blueprint('question_votes', __name__)


@question_votes_routes.route("/<int:vote_id>",methods=['PUT'])
@login_required
def change_question_vote(vote_id):
    '''
    Update a current user's vote of a question by id
    '''
    is_liked=request.json.get("isLiked",None)
    if is_liked is None:
        return bad_request("Is_liked is required.")
    if not isinstance(is_liked, bool):
        return bad_request("Is_liked must be a boolean value.")

    vote=QuestionVote.query.filter(QuestionVote.id==vote_id).first()
    if vote is None:
        return not_found("Vote couldn't be found.")
    #check if vote belongs to current user
    user_id=current_user.id
    if not user_id==vote.user_id:
        return forbidden("Forbidden")
    updated_vote = vote.update_question_vote(is_liked=is_liked)
    return updated_vote.to_dict()

@question_votes_routes.route("/<int:vote_id>",methods=['DELETE'])
@login_required
def remove_question_vote(vote_id):
    '''
    Delete a current user's vote of a question by id
    '''
    vote=QuestionVote.query.filter(QuestionVote.id==vote_id).first()
    if vote is None:
        return not_found("Vote couldn't be found.")
    #check if vote belongs to current user
    user_id=current_user.id
    if not user_id==vote.user_id:
        return forbidden("Forbidden")
    vote.delete_question_vote()
    return success("Question_vote successfully deleted")

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
