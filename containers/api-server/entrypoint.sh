#!/bin/bash

echo "Waiting for PostgreSQL..."

while ! nc -z databases 5432; do
  sleep 0.5
done

echo "PostgreSQL is up - applying migrations"
python manage.py migrate

echo "Starting server"
exec python manage.py runserver 0.0.0.0:8000