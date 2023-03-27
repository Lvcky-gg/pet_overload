import datetime
from typing import Any, Union
from flask_login import current_user
from werkzeug import Response
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .utils import bad_request, forbidden, not_found, success


class Question(db.Model):
    '''
        Question Model
    '''
    __tablename__='questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255),nullable=False)
    details = db.Column(db.String(),nullable=False)
    created_at =db.Column(db.DateTime,nullable=False)
    updated_at =db.Column(db.DateTime,nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)

    user=db.relationship("User",back_populates="user_questions")
    question_answers=db.relationship("Answer",back_populates="question")
    question_votes=db.relationship("QuestionVote",back_populates="question")

    def to_dict(self) -> dict[str, Any]:
        return {
            'id': self.id,
            'title': self.title,
            'details': self.details,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'userId':self.user_id
        }
        
    @classmethod
    def get_all_questions(cls) -> list[Any]:
        '''
            Returns a list of all questions on the app
        '''
        question_records = cls.query.all()
        all_questions = []
        
        for question in question_records:
            answers = question.question_answers
            vote_score = question.vote_score
            
            all_questions.append({
                'id': question.id,
                'title': question.title,
                'author': question.user.username,
                'createdAt': question.created_at,
                'answerCount': len(answers),
                'voteScore': vote_score
            })
            
        return all_questions
    
    @classmethod
    def get_question_by_id(cls, id: int) -> Union[dict[str, Any], None]:
        '''
            Returns a question by id and all answers on that question
        '''
        question = cls.query.filter_by(id=id).first()
        
        if not question:
            return None
        
        answers = question.question_answers
        vote_score = question.vote_score
        
        return {
            'id': question.id,
            'title': question.title,
            'details': question.details,
            'createdAt': question.created_at,
            'updatedAt': question.updated_at,
            'author': question.user.username,
            'answers': [answer.to_dict() for answer in answers],
            'voteScore': vote_score,
        }

    @classmethod 
    def create_question(cls, title: str, details: str, user_id: int) -> Union[Response, dict[str, Any]]:
        '''
            Creates a new question
        '''
        if not title:
            return bad_request('Title cannot be empty.')
        if not details:
            return bad_request('Details cannot be empty.')
        
        question = cls(title=title, details=details, user_id=user_id)
        db.session.add(question)
        db.session.commit()
        
        return question.to_dict()
    
    @classmethod
    def update_question(cls, id: int, title: str, details: str) -> Union[Response, dict]:
        '''
            Updates a question by id, if the user is the author of the question
        '''
        question = cls.query.filter_by(id=id).first()
        
        if not question:
            return not_found('Question not found')
        if not title:
            return bad_request('Title cannot be empty.')
        if not details:
            return bad_request('Details cannot be empty.')
        
        if current_user.get_id() != question.user_id:
            return forbidden('You are not the author of this question.')
        
        question.title = title
        question.details = details
        question.updated_at = datetime.datetime.utcnow()
        
        db.session.commit()
        
        return question.to_dict()        
    
    @classmethod
    def delete_question(cls, id: int) -> Response:
        '''
            Deletes a question by id if the current user is the author of the question
        '''
        question = cls.query.filter_by(id=id).first()
        
        if not question:
            return not_found('Question not found.')
        
        db.session.delete(question)
        db.session.commit()
        
        return success('Question deleted successfully.')
    
    @property
    def question_vote_score(self) -> Union[Response, int]:
        '''
            Returns vote score for this question
        '''
        votes = self.question_answers
        
        if not votes:
            return 0
        
        vote_score = sum([1 if vote.is_liked else -1 for vote in votes])
        return vote_score
