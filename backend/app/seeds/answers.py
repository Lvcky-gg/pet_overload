from ..models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_answers():
    answer1 = Answer(
        details="Cats are natural hunters and enjoy engaging their instincts. Knocking things off the table is a form of play and mental stimulation for them. Try providing more interactive toys and playtime to keep your cat entertained.",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=3,
        question_id=1,
    )
    answer2 = Answer(
        details="Your cat might just be trying to get your attention. If you notice a pattern where your cat only does this when you're not paying attention, try spending more quality time with your cat to curb this behavior. It's either that, or you did something to make her upset.",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=2,
        question_id=1,
    )
    answer3 = Answer(
        details="Consistency is key when teaching a dog new behaviors. Whenever you catch your dog chewing on your shoes, redirect them to an appropriate chew toy and reward them for making the switch. This will help reinforce that chewing on shoes is not acceptable.",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=3,
        question_id=2,
    )
    answer4 = Answer(
        details="Consistency is key when teaching a dog new behaviors. Whenever you catch your dog chewing on your shoes, redirect them to an appropriate chew toy and reward them for making the switch. This will help reinforce that chewing on shoes is not acceptable.",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=1,
        question_id=2,
    )
    answer5 = Answer(
        details="Parrots learn from repetition, so it's important to avoid saying the words you don't want them to mimic. Instead, praise your parrot and reward them with treats when they say appropriate words or phrases.",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=2,
        question_id=3,
    )
    answer6 = Answer(
        details="Try teaching your parrot alternative phrases or words to replace the undesirable ones. Be patient, and remember that parrots are intelligent and may take time to unlearn a behavior.",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=1,
        question_id=3,
    )


    db.session.add_all([answer1, answer2, answer3, answer4, answer5, answer6])
    db.session.commit()


def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))

    db.session.commit()
