from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow(), onupdate=datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow(), onupdate=datetime.utcnow
    )

    # relationship
    user_questions = db.relationship("Question", back_populates="user")

    user_answers = db.relationship("Answer", back_populates="user")

    question_votes = db.relationship("QuestionVote", back_populates="user")

    answer_votes = db.relationship("AnswerVote", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        """
        Return user information with reputation included
        """
        reputation = (
            len(self.user_questions)
            + len(self.user_answers)
            + len(self.question_votes)
            + len(self.answer_votes)
        )
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "reputation": reputation,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
