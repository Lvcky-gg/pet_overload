import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    
    # if development, we need flask_debug variable
    if os.environ.get('FLASK_DEBUG') == 1:
        FLASK_DEBUG = 1
