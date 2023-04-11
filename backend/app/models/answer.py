#answers.py
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Answer(db.Model):
    __tablename__='answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    details = db.Column(db.String(),nullable=False)
    created_at =db.Column(db.DateTime,nullable=False)
    updated_at =db.Column(db.DateTime,nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    question_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")),nullable=False)

    #relationship
    #1 user-many answers
    user=db.relationship("User",back_populates="user_answers")
    #1 question -many answers
    question=db.relationship("Question",back_populates="question_answers")
    #1 answer-many votes
    answer_votes=db.relationship("AnswerVote",back_populates="answer")

    def to_dict(self):
        return {
            'id': self.id,
            'details': self.details,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'userId':self.user_id,
            'questionId':self.question_id,
            "votes_score": self.answer_vote_score,
        }

    @property
    def answer_vote_score(self) -> int:
        """
        Returns vote score for this answer
        """
        votes = self.answer_votes

        if not votes:
            return 0

        return sum([1 if vote.is_liked else -1 for vote in votes])
