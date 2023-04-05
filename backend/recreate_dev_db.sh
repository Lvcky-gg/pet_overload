rm -rf ../instance

rm -rf migrations

flask db init

flask db migrate -m "Initial migration"

flask db upgrade

flask seed all