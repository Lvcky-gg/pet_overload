import pytest
from backend.app.models.db import db as _db
from backend.app import create_app
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

@pytest.fixture(scope="function")
def sqlalchemy_session(request, app):
    engine = create_engine('sqlite://')
    Session = sessionmaker(bind=engine)
    session = Session()

    with app.app_context():
        _db.metadata.create_all(bind=engine)

    def teardown():
        with app.app_context():
            _db.session.rollback()
            _db.metadata.drop_all(bind=engine)

    request.addfinalizer(teardown)

    return session

@pytest.fixture(scope='session')
def app():
    app = create_app()
    app.config['TESTING'] = True

    with app.app_context():
        _db.create_all()

    yield app

    with app.app_context():
        _db.drop_all()
