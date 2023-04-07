FROM python:3.9

WORKDIR /app

COPY requirements.txt /app/
COPY recreate_dev_db.sh /app/

RUN pip install -r requirements.txt
RUN pip install psycopg2-binary

COPY . /app/

CMD /bin/sh -c 'echo "Please wait . . ." && sleep 10 && ./recreate_dev_db.sh && gunicorn --bind 0.0.0.0:5000 "app:create_app()"'
