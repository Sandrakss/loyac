#!/bin/bash

source venv/bin/activate
rm -rf db.sqlite3

find . -path "*migrations*" -name "*.py" -not -path "*__init__*" -not -path "./venv?*" -delete

# mysql -u admin -p -e 'drop database db_name'
# mysql -u admin -p -e 'create database db_name'


python3 manage.py makemigrations
python3 manage.py migrate --run-syncdb --database default
python3 manage.py makesuper
python3 manage.py runserver
