#answer_vote.py
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class AnswerVote(db.Model):
    __tablename__="answer_votes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    is_liked=db.Column(db.Boolean,nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow())
    user_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    answer_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("answers.id"),ondelete="CASCADE"),nullable=False)

    #relationship
    user=db.relationship("User",back_populates="answer_votes")
    answer=db.relationship("Answer",back_populates="answer_votes")

    def to_dict(self):
        return {
            'id': self.id,
            'isLiked': self.is_liked,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'userId':self.user_id,
            'answerId':self.answer_id,
            'answer': self.answer.to_dict(),
        }

    #factory method to create Answer instance
    @classmethod
    def add_answer_vote(cls, is_liked: bool, user_id: int, answer_id: int) -> 'AnswerVote':
        '''
        Adds a new answer vote
        '''
        answer_vote = cls(is_liked=is_liked, user_id=user_id, answer_id=answer_id)

        db.session.add(answer_vote)
        db.session.commit()

        return answer_vote

    def update_answer_vote(self, is_liked: bool) -> 'AnswerVote':
        '''
        Updates an existing answer vote
        '''
        self.is_liked = is_liked
        self.updated_at = datetime.utcnow()

        db.session.commit()

        return self

    def delete_answer_vote(self) -> None:
        '''
        Deletes an existing question vote
        '''
        db.session.delete(self)
        db.session.commit()
