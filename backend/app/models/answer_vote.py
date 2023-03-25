#answer_vote.py
from .db import db, environment, SCHEMA, add_prefix_for_prod


class AnswerVote(db.Model):
    __tablename__="answer_votes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    is_liked=db.Column(db.Boolean,nullable=False)
    created_at =db.Column(db.DateTime,nullable=False)
    updated_at =db.Column(db.DateTime,nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    answer_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("answers.id")),nullable=False)

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
            'answerId':self.answer_id
        }
