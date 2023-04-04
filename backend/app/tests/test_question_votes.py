from ..models.question_vote import QuestionVote
from ..models.question import Question

def test_create_question_vote(sqlalchemy_session, app):
    with app.app_context():
        question_vote = QuestionVote(is_liked=True, user_id=1, question_id=1)
        
        sqlalchemy_session.add(question_vote)
        sqlalchemy_session.commit()

        # Retrieve the question_vote object using the get_question_vote_by_id model method
        # Passing the test session as an argument to use the correct session for querying
        # We have to do this because the test and development databases are different (test will start with an empty database)
        retrieved_question_vote = QuestionVote.get_question_vote_by_id(question_vote.id, session=sqlalchemy_session)
        
        retrieved_question_vote_match = QuestionVote.get_question_vote_by_user_and_question(user_id=question_vote.user_id, question_id=question_vote.question_id, session=sqlalchemy_session)
        

        assert retrieved_question_vote is not None
        assert retrieved_question_vote_match is not None
        assert retrieved_question_vote.to_dict() == retrieved_question_vote_match.to_dict()
        assert retrieved_question_vote.is_liked == True
        assert retrieved_question_vote.user_id == 1
        assert retrieved_question_vote.question_id == 1
    

def test_update_question_vote(sqlalchemy_session, app):
    with app.app_context():
        question_vote = QuestionVote(is_liked=True, user_id=1, question_id=1)
        sqlalchemy_session.add(question_vote)
        sqlalchemy_session.commit()

        question_vote.is_liked = False
        sqlalchemy_session.add(question_vote)
        sqlalchemy_session.commit()

        updated_question_vote = (
            sqlalchemy_session.query(QuestionVote).filter_by(id=1).first()
        )

        assert updated_question_vote.is_liked == False


def test_delete_question_vote(sqlalchemy_session, app):
    with app.app_context():
        question_vote = QuestionVote(is_liked=True, user_id=1, question_id=1)
        sqlalchemy_session.add(question_vote)
        sqlalchemy_session.commit()

        sqlalchemy_session.delete(question_vote)
        sqlalchemy_session.commit()

        retrieved_question_vote = (
            sqlalchemy_session.query(QuestionVote).filter_by(id=1).first()
        )

        assert retrieved_question_vote == None
