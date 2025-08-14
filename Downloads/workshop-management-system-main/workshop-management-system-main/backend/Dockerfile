# Use an official Python image
FROM python:3.12.3

# Install dependencies
RUN apt-get update && apt-get install -y netcat-openbsd

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose the Django port
EXPOSE 8000

# Command to start Django
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Run migrations and then start Django
# CMD ["sh", "-c", "until nc -z db 3306; do echo 'Waiting for MySQL...'; sleep 1; done; python manage.py makemigrations && python manage.py migrate && daphne -b 0.0.0.0 -p 8000 backend.asgi:application"]

# Entrypoint to run migrations and start server
ENTRYPOINT ["/entrypoint.sh"]