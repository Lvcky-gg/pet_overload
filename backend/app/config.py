import os

database_url = os.environ.get('DATABASE_URL')
schema = os.environ.get('SCHEMA')

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI = f"{database_url}?options=-csearch_path={schema}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    
    # if development, we need flask_debug variable
    if os.environ.get('FLASK_DEBUG') == 1:
        FLASK_DEBUG = 1
