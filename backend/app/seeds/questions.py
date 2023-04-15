from ..models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_questions():
    question1 = Question(
        title="Why dogs are so cute",
        details="Why dogs are so cute",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=1,
    )
    question2 = Question(
        title="Why cats are so cute",
        details="Why cats are so cute",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=2,
    )
    question3 = Question(
        title="Why birds are so cute",
        details="Why birds are so cute",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=3,
    )

    db.session.add(question1)
    db.session.add(question2)
    db.session.add(question3)
    db.session.commit()


def undo_questions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
