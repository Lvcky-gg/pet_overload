from flask.cli import AppGroup
from .users import seed_users, undo_users
from .questions import seed_questions, undo_questions
from .answers import seed_answers, undo_answers
from .question_votes import seed_question_votes,undo_question_votes
from .answer_votes import seed_answer_votes,undo_answer_votes

from backend.app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_questions()
        undo_answers()
        undo_question_votes()
        undo_answer_votes()
    seed_users()
    # Add other seed functions here
    seed_questions()
    seed_answers()
    seed_question_votes()
    seed_answer_votes()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_questions()
    undo_answers()
    undo_question_votes()
    undo_answer_votes()
