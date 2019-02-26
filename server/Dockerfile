FROM python:3.7.2

WORKDIR /app/backend

COPY ./requirements.txt /app/backend/requirements.txt

ENV PYTHONUNBUFFERED=1

RUN pip3 install -r requirements.txt

CMD bash -c 'python manage.py makemigrations && \ 
    python manage.py migrate && \ 
    python manage.py runserver 0.0.0.0:8000'