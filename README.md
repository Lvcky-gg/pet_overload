# Pet Overload

![image][def]

## Introduction

Welcome to Pet Overload, a question and answer app for pets paying homage to Stack Overflow.

## Live Link 

### [Pet Overload](https://pet-overload.onrender.com/)

## API

### [Pet Overload API](https://pet-overload.onrender.com/api)

## Repo

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AdamScoggins/pet-overload)

## Documentation

You can find the documentation on [our Wiki](https://github.com/AdamScoggins/pet-overload/wiki).

## Dev Team

[Adam Scoggins](https://github.com/AdamScoggins)

[Iris Wang](https://github.com/Iris06-cs)

[John O'Donnell](https://github.com/Lvcky-gg)

### CRUD Feature 1: Questions

- `/all-questions`: View questions
- `/all-questions/ask-a-question`: Add a question
- `/all-questions/:id`: Edit and delete a question

## CRUD Feature 2: Answers

- `/all-questions/:id`: View, edit, delete, and create answers for a question

## CRUD Feature 3: Search (Partial)

Search functionality is available on all pages based on three parameters:

- Author
- Score
- Keyword

## CRUD Feature 4: Vote Answers

- `/all-questions/:id`: Create, read, delete, and update answer votes

## CRUD Feature 5: Vote Questions (Bonus)

- `/all-questions` & `/all-questions/:id`: Create, read, delete, and update question votes

## CRUD Feature 6: User Profile (Bonus)

- `/user/profile`: View your personal profile page including your reputation, all questions, all answers, and all votes. Allows sorting and deleting of questions, answers, and votes
- `/users/:id`: View other users' profile page, implementing the same functionality as `/user/profile`

## Technology Used

### Frontend

- React
- Redux
- Redux Toolkit
- Dompurify
- Draft.js
- Fontawesome
- CSS
- HTML
- JS
- JSON

### Backend

- Python 3.9.6
- python-dotenv
- Flask
- Flask-Cors
- Flask-SQLalchemy
- Flask-WTF
- Jinja
- Werkzeug
- Flask-Migrate
- Flask-Login
- Alembic
- Pytest

## Deployment Process

### Required Environment Variables

- DATABASE_URL: _Must begin with `postgresql://` or the build will fail_
- Flask_app: `app`
- FLASK_ENV: `production`
- PYTHON_VERSION: `3.9.6`
- REACT_APP_BASE_URL: _Add your base URL_
- SCHEMA: _Add your schema name_
- SECRET_KEY: _Add your secret key_

### Build Script

npm install --prefix frontend && npm run build --prefix frontend && cd backend && ls && pip install -r requirements.txt && pip install psycopg2 && flask db upgrade && flask seed all

### Troubleshooting

* Restart your PostgreSQL for caching errors
* Rename the schema if necessary
* Double check all environment variables and build error logs

### Running Backend Locally

```
cd backend
pipinstall -r requirements.txt
pip install psycopg2
flask db upgrade
flask seed all
```

### Running Frontend Locally

```
cd frontend
npm install
npm start
```

[def]: ./homePage.png
