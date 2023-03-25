#question_vote.py
from .db import db, environment, SCHEMA, add_prefix_for_prod


class QuestionVote(db.Model):
    __tablename__="question_votes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    is_liked=db.Column(db.Boolean,nullable=False)
    created_at =db.Column(db.DateTime,nullable=False)
    updated_at =db.Column(db.DateTime,nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    question_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("questions.id")),nullable=False)

    #relationship
    user=db.relationship("User",back_populates="question_votes")
    question=db.relationship("Question",back_populates="question_votes")

    def to_dict(self):
        return {
            'id': self.id,
            'isLiked': self.is_liked,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'userId':self.user_id,
            'questionId':self.question_id
        }
