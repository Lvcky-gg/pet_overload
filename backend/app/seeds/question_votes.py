from backend.app.models import db, QuestionVote, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_question_votes():
    vote1 = QuestionVote(
        is_liked=True,created_at =datetime.now(),updated_at=datetime.now(),user_id=3,question_id=1)
    vote2 = QuestionVote(
        is_liked=True,created_at =datetime.now(),updated_at=datetime.now(), user_id=3,question_id=1)
    vote3 = QuestionVote(
        is_liked=False,created_at =datetime.now(),updated_at=datetime.now(), user_id=1,question_id=3)

    db.session.add(vote1)
    db.session.add(vote2)
    db.session.add(vote3)
    db.session.commit()


def undo_question_votes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.question_votes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM question_votes"))

    db.session.commit()
