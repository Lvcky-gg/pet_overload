from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from ..models import Question, User, Answer, db
from ..models.utils import BaseException, handle_error
from datetime import datetime

questions_routes_blueprint = Blueprint("questions", __name__)

@questions_routes_blueprint.route("/<int:id>/answers", methods=["POST"])
@login_required
def create_answers(id):
    question = Question.query.get(id)
    if question:
        answer = Answer(details=request.form["details"],created_at =datetime.now(),updated_at=datetime.now(),user_id = int(session["_user_id"]),question_id = id)
        db.session.add(answer)
        db.session.commit()
        return answer.to_dict()
    else:
        return jsonify({"message": "Question couldn't be found","statusCode": 404}), 404

@questions_routes_blueprint.route("/<int:id>/answers", methods=["GET"])
def get_answers(id):
    question = Question.query.get(id)
    if question:
       answer_list = Answer.query.filter_by(question_id=int(id)).all()
       print([answer.to_dict() for answer in answer_list])
       return jsonify({"answers":[answer.to_dict() for answer in answer_list]})
    else:
        return jsonify({"message": "Question couldn't be found","statusCode": 404}),404 

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
