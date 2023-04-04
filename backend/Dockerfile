FROM python:3.9

WORKDIR /app

COPY requirements.txt /app/

RUN pip install -r requirements.txt

RUN pip install psycopg2-binary

COPY . /app/

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:create_app()"]
