from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import AnswerVote
from ..models.utils import (
    BaseException,
    ValidationException,
    NotFoundException,
    ForbiddenException,
    handle_error,
)

answer_votes_routes = Blueprint("answer_votes", __name__)


@answer_votes_routes.route("/<int:vote_id>", methods=["PUT"])
@login_required
def change_answer_vote(vote_id):
    """
    Update a current user's vote of a answer by id
    """
    try:
        is_liked = request.json.get("isLiked", None)
        if is_liked is None:
            raise ValidationException("Is_liked is required.")
        if not isinstance(is_liked, bool):
            raise ValidationException("Is_liked must be a boolean value.")

        vote = AnswerVote.query.filter(AnswerVote.id == vote_id).first()
        if vote is None:
            raise NotFoundException("Vote couldn't be found.")
        # check if vote belongs to current user
        user_id = current_user.id
        if not user_id == vote.user_id:
            raise ForbiddenException("Forbidden")
    except BaseException as err:
        return handle_error(err)

    updated_vote = vote.update_answer_vote(is_liked=is_liked)
    return updated_vote.to_dict()


@answer_votes_routes.route("/<int:vote_id>", methods=["DELETE"])
@login_required
def remove_answer_vote(vote_id):
    """
    Delete a current user's vote of a answer by id
    """
    try:
        vote = AnswerVote.query.filter(AnswerVote.id == vote_id).first()
        if vote is None:
            raise NotFoundException("Vote couldn't be found.")
        # check if vote belongs to current user
        user_id = current_user.id
        if not user_id == vote.user_id:
            raise ForbiddenException("Forbidden")
    except BaseException as err:
        return handle_error(err)
    vote.delete_answer_vote()
    return {"message": "Answer_vote successfully deleted"}, 200


@answer_votes_routes.route("/current")
@login_required
def get_user_answer_votes():
    """
    Query for all answer_votes for current user
    """
    user_answer_votes = AnswerVote.query.filter(
        AnswerVote.user_id == current_user.id
    ).all()
    # return jsonify([user_answer_vote.to_dict() for user_answer_vote in user_answer_votes])
    # list in json format
    answer_votes_list = [
        user_answer_vote.to_dict() for user_answer_vote in user_answer_votes
    ]
    return {"answerVotes": answer_votes_list}
