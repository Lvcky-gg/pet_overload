from ..models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo User",
        email="demo@aa.io",
        password="password",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    marnie = User(
        username="Marnie",
        email="marnie@aa.io",
        password="marnieisawesome",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    bobbie = User(
        username="Bobbie",
        email="bobbie@aa.io",
        password="ilovepets1234",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
