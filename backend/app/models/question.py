#question.py
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Question(db.Model):
    __tablename__='questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255),nullable=False)
    details = db.Column(db.String(),nullable=False)
    created_at =db.Column(db.DateTime,nullable=False)
    updated_at =db.Column(db.DateTime,nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)

    #relationship
    #1 user-many questions
    user=db.relationship("User",back_populates="user_questions")
    #1 question-many answers
    question_answers=db.relationship("Answer",back_populates="question")
    #1 question-many votes
    question_votes=db.relationship("QuestionVote",back_populates="question")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'details': self.details,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'userId':self.user_id
        }
