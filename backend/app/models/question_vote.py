# question_vote.py
from typing import Union
from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class QuestionVote(db.Model):
    __tablename__ = "question_votes"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    is_liked = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow())
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    question_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")), nullable=False
    )

    # relationship
    user = db.relationship("User", back_populates="question_votes")
    question = db.relationship("Question", back_populates="question_votes")

    @classmethod
    def get_question_vote_by_id(cls, id: int, session=None) -> Union['QuestionVote', None]:
        '''
        Returns a question vote by id
        '''

        # If a session is provided (i.e. a test session from the sqlalchemy_session fixture), then use it to perform the query instead of the default session tied to the app context
        if session is None:
            return cls.query.filter_by(id=id).first()
        else:
            return session.query(cls).filter_by(id=id).first()


    @classmethod
    def get_question_vote_by_user_and_question(cls, user_id: int, question_id: int, session=None) -> Union['QuestionVote', None]:
        '''
        Returns a question vote by user_id and question_id
        '''
        if session is None:
            return cls.query.filter_by(user_id=user_id, question_id=question_id).first()
        else:
            return session.query(cls).filter_by(user_id=user_id, question_id=question_id).first()

    @classmethod
    def add_question_vote(cls, is_liked: bool, user_id: int, question_id: int) -> 'QuestionVote':
        '''
        Adds a new question vote
        '''
        question_vote = cls(is_liked=is_liked, user_id=user_id, question_id=question_id)

        db.session.add(question_vote)
        db.session.commit()

        return question_vote

    def update_question_vote(self, is_liked: bool) -> 'QuestionVote':
        '''
        Updates an existing question vote
        '''
        self.is_liked = is_liked
        self.updated_at = datetime.utcnow()

        db.session.commit()

        return self

    def delete_question_vote(self) -> None:
        '''
        Deletes an existing question vote
        '''
        db.session.delete(self)
        db.session.commit()


    def to_dict(self):
        return {
            "id": self.id,
            "isLiked": self.is_liked,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
            "userId": self.user_id,
            "questionId": self.question_id,
            "question":self.question.to_dict()
        }
