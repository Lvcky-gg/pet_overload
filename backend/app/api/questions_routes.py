from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from ..models import Question, QuestionVote, Answer, db
from ..models.utils import BaseException,ValidationException,NotFoundException, handle_error
from datetime import datetime

questions_routes_blueprint = Blueprint("questions", __name__)


@questions_routes_blueprint.route("", methods=["GET"])
def get_filtered_questions():
    try:
        username = request.args.get("username")
        score = request.args.get("score")
        keyword = request.args.get("keyword")
        filtered_questions = Question.filter_questions(username,score,keyword)

    except BaseException as e:
        return handle_error(e)

    return jsonify({"questions": filtered_questions}), 200
@questions_routes_blueprint.route("/", methods=["GET"])
def get_all_questions():
    try:
        all_questions = Question.get_all_questions()
    except BaseException as e:
        return handle_error(e)

    return jsonify({"questions": all_questions}), 200


@questions_routes_blueprint.route("/<int:id>", methods=["GET"])
def get_question_by_id(id: int):
    try:
        question = Question.get_question_by_id(id)
        return jsonify(question), 200
    except BaseException as e:
        return handle_error(e)


@questions_routes_blueprint.route("/", methods=["POST"])
@login_required
def post_new_question():
    try:
        request_body = request.json
        title = request_body.get("title")
        details = request_body.get("details")
        new_question = Question.create_question(
            title=title, details=details, user_id=current_user.get_id()
        )
    except BaseException as e:
        return handle_error(e)

    return jsonify(new_question), 201


@questions_routes_blueprint.route("/<int:id>", methods=["PUT"])
@login_required
def update_question(id: int):
    try:
        request_body = request.json
        title = request_body.get("title")
        details = request_body.get("details")
        updated_question = Question.update_question(
            id=id, title=title, details=details, user_id=current_user.get_id()
        )
    except BaseException as e:
        return handle_error(e)

    return jsonify(updated_question), 200


@questions_routes_blueprint.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_question(id: int):
    try:
        Question.delete_question(id, user_id=current_user.get_id())

        return jsonify("Question successfully deleted"), 200

    except BaseException as e:
        return handle_error(e)

@questions_routes_blueprint.route("/<int:question_id>/votes",methods=['POST'])
@login_required
def create_question_vote(question_id):
    '''
    Create a vote to a question by id
    '''
    try:
        is_liked=request.json.get("isLiked",None)
        if is_liked is None:
            raise ValidationException("Is_liked is required.")
        if not isinstance(is_liked, bool):
            raise ValidationException("Is_liked must be a boolean value.")
        user_id=current_user.id
        question = Question.query.filter(Question.id==question_id).first()
        if question is None:
            raise NotFoundException("Question couldn't be found.")
    except BaseException as err:
        return handle_error(err)

    new_vote = QuestionVote.add_question_vote(is_liked=is_liked, user_id=user_id, question_id=question_id)
    return new_vote.to_dict()
