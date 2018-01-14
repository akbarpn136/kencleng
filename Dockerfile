FROM python:3.5
LABEL author="PinyosMinyos"

RUN apt-get update && \
    apt-get -y install python3-dev libmysqlclient-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN pip3 install --upgrade pip && \
    pip3 install django && \
    pip3 install django-cors-headers && \
    pip3 install djangorestframework && \
    pip3 install gunicorn && \
    pip3 install mysqlclient

RUN mkdir /var/www && \
    mkdir /var/www/kencleng

WORKDIR /var/www/kencleng
EXPOSE 8000