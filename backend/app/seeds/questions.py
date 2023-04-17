from ..models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_questions():
    question1 = Question(
        title="Why does my cat keep knocking things off the table?",
        details="Lately, my cat has developed a habit of knocking things off tables, like my coffee mug, books, and even my phone. I'm worried that she might break something valuable. I've tried distracting her with toys, but she keeps doing it. Why is this happening, and how can I stop it?",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=1,
    )
    question2 = Question(
        title="What's the best way to teach my dog not to chew on my shoes?",
        details="My 6-month-old Labrador Retriever can't resist chewing on my shoes. I've tried scolding her and giving her chew toys, but she still goes back to my shoes. I'm running out of ideas, and my shoe collection is suffering. Any suggestions?",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=2,
    )
    question3 = Question(
        title="My parrot keeps repeating swear words. How can I get him to stop?",
        details="I recently adopted a parrot who used to belong to a sailor. He's a great companion, but he has a habit of repeating some colorful language that I'd rather not have in my house, especially when I have guests. How can I teach him to stop saying these words?",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=3,
    )

    db.session.add_all([question1, question2, question3])
    db.session.commit()


def undo_questions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
