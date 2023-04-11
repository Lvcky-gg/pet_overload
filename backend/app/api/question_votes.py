from flask import Blueprint,request,jsonify
from flask_login import current_user,login_required
from ..models import QuestionVote
from ..models.utils import BaseException,ValidationException,NotFoundException,ForbiddenException,handle_error


question_votes_routes = Blueprint('question_votes', __name__)


@question_votes_routes.route("/<int:vote_id>",methods=['PUT'])
@login_required
def change_question_vote(vote_id):
    '''
    Update a current user's vote of a question by id
    '''
    try:
        is_liked=request.json.get("isLiked",None)
        if is_liked is None:
            raise ValidationException("Is_liked is required.")
        if not isinstance(is_liked, bool):
            raise ValidationException("Is_liked must be a boolean value.", 400)

        vote=QuestionVote.query.filter(QuestionVote.id==vote_id).first()
        if vote is None:
            raise NotFoundException("Vote couldn't be found.")
        #check if vote belongs to current user
        user_id=current_user.id
        if not user_id==vote.user_id:
            raise ForbiddenException("Forbidden")
    except BaseException as err:
        return handle_error(err)

    updated_vote = vote.update_question_vote(is_liked=is_liked)
    return updated_vote.to_dict(),200

@question_votes_routes.route("/<int:vote_id>",methods=['DELETE'])
@login_required
def remove_question_vote(vote_id):
    '''
    Delete a current user's vote of a question by id
    '''
    try:
        vote=QuestionVote.query.filter(QuestionVote.id==vote_id).first()
        if vote is None:
            raise NotFoundException("Vote couldn't be found.")
        #check if vote belongs to current user
        user_id=current_user.id
        if not user_id==vote.user_id:
            raise ForbiddenException("Forbidden")
    except BaseException as err:
        return handle_error(err)
    vote.delete_question_vote()
    return {"message":"Question_vote successfully deleted"},200

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
    
    return {"questionVotes":question_votes_list}

@question_votes_routes.route("/current/<int:question_id>")
@login_required
def get_specific_question_vote(question_id):
    '''
    Query for a specific vote for a specific question by id
    '''
    
    question_vote = QuestionVote.get_question_vote_by_user_and_question(int(current_user.id), int(question_id))
    if question_vote is None:
        raise NotFoundException("Vote couldn't be found.")
    return question_vote.to_dict()
