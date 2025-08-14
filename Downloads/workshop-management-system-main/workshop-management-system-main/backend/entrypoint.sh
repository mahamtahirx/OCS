#!/bin/bash

# Fail on any command error
set -e

# Wait until MySQL is available
echo "Waiting for MySQL..."
while ! nc -z db 3306; do 
  echo 'Waiting for MySQL...'
  sleep 1
done
echo "MySQL is up."

# Run migrations (show output, fail on error)
echo "Running migrations..."
python manage.py makemigrations || { echo "makemigrations failed"; exit 1; }
python manage.py migrate || { echo "migrate failed"; exit 1; }

# Collect static files (optional, remove if not using collectstatic)
# python manage.py collectstatic --noinput

# Start Daphne ASGI server
exec python -m daphne -b 0.0.0.0 -p 8000 backend.asgi:application
