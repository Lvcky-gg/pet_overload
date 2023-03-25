import pytest
from backend.app.models.question import Question
from backend.app.models.db import db as _db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .conftest import app


def test_create_question(sqlalchemy_session):
    # Create a new question and add it to the session
    question = Question(
        title='Test Question',
        details='This is a test question.',
        user_id=1
    )
    sqlalchemy_session.add(question)
    sqlalchemy_session.commit()

    # Retrieve the question from the database
    retrieved_question = sqlalchemy_session.query(Question).filter_by(title='Test Question').first()

    # Check that the retrieved question has the expected values
    assert retrieved_question.title == 'Test Question'
    assert retrieved_question.details == 'This is a test question.'
    assert retrieved_question.user_id == 1
