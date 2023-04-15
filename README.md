# Pet Overload



![image][def]

## Live Link 
### [Pet Overload](https://pet-overload.onrender.com/)

## API
### [Pet Overload API](https://pet-overload.onrender.com/api)

## Repo
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AdamScoggins/pet-overload)


## Intro
Welcome to Pet Overload, a question/answer app for pets based off of stack ofverflow.

## Documentation

You can find the documentation on [our Wiki](https://github.com/AdamScoggins/pet-overload/wiki).

## Dev Team

[Adam Scoggins](https://github.com/AdamScoggins)
[Iris Wang](https://github.com/Iris06-cs)
[John O'Donnell](https://github.com/Lvcky-gg)

## CRUD FEATURE ONE: QUESTIONS

### /all-questions allows you to view questions
### /all-questions/ask-a-question allows you to add a question
### /all-questions/:id allows you to edit and delete your question
### /user/profile allows you to delete a question

## CRUD FEATURE TWO: ANSWERS

### /all-questions/:id allows you to see all answers to a question
### /all-questions/:id allows you to edit an answer
### /all-questions/:id allows you to delete an answer
### /all-questions/:id allows you to delete an answer
### /user/profile allows you to delete an answer

## PARTIAL CRUD FEATURE THREE: SEARCH

### All pages allows you to conduct a search based on three parameters:

#### author
#### score
#### keyword

## CRUD FEATURE FOUR: VOTES

### /user/profile create, read, delete and update all votes
### /all-questions create, read, delete and update question votes
### /all-questions/:id create, read, delete and update all votes


## Technology Used


### Frontend
React
Redux
Redux Toolkit
Dompurify
Draft.js
Fontawesome
CSS
HTML
JS
JSON

### Backend
Python 3.9.6
python-dotenv
Flask
Flask-Cors
Flask-SQLalchemy
Flask-WTF
Jinja
Werkzeug
Flask-Migrate
Flask-Login
Alembic
Pytest

## Making your own deployment on Render

### Necessary ENV files
#### DATABASE_URL=
* MUST begin with postgresql:// or build will fail, SQLalchemy will not accept any other format
#### Flask_app=app
#### FLASK_ENV=production
#### PYTHON_VERSION=3.9.6
#### REACT_APP_BASE_URL=
#### SCHEMA=
#### SECRET_KEY=

### Build Script

npm install --prefix frontend && npm run build --prefix frontend && cd backend && ls && pip install -r requirements.txt && pip install psycopg2 && flask db upgrade && flask seed all

### Troubleshooting
* restart your postgres /caching errors
* rename schema




### Locally run backend 

cd backend
pipinstall -r requirements.txt
pip install psycopg2
flask db upgrade
flask seed all

<!-- ### Locally run dockerized
cd backend
docker-compose
** docker-compose down //will take it down -->

### new terminal from root for frontend
cd frontend
npm install
npm start






[def]: ./homePage.png