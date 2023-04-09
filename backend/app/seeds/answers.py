from ..models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_answers():
    answer1 = Answer(
        details='Because they are cute',created_at =datetime.now(),updated_at=datetime.now(),user_id=3,question_id=1)
    answer2 = Answer(
        details='Because they are cute',created_at =datetime.now(),updated_at=datetime.now(), user_id=3,question_id=1)
    answer3 = Answer(
        details='Because they are cute',created_at =datetime.now(),updated_at=datetime.now(), user_id=1,question_id=3)

    db.session.add(answer1)
    db.session.add(answer2)
    db.session.add(answer3)
    db.session.commit()


def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))

    db.session.commit()
