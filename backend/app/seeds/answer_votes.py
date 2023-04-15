from ..models import db, AnswerVote, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_answer_votes():
    vote1 = AnswerVote(
        is_liked=True,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=3,
        answer_id=1,
    )
    vote2 = AnswerVote(
        is_liked=True,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=3,
        answer_id=1,
    )
    vote3 = AnswerVote(
        is_liked=False,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=1,
        answer_id=3,
    )

    db.session.add(vote1)
    db.session.add(vote2)
    db.session.add(vote3)
    db.session.commit()


def undo_answer_votes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.answer_votes RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM answer_votes"))

    db.session.commit()
