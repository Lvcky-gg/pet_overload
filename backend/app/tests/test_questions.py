from ..models.question import Question


def test_create_question(sqlalchemy_session):
    question = Question(
        title="Test Question", details="This is a test question.", user_id=1
    )
    sqlalchemy_session.add(question)
    sqlalchemy_session.commit()

    retrieved_question = (
        sqlalchemy_session.query(Question).filter_by(title="Test Question").first()
    )

    assert retrieved_question.title == "Test Question"
    assert retrieved_question.details == "This is a test question."
    assert retrieved_question.user_id == 1
