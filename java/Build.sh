#!/bin/bash

NAME="JavaDbService"
VERSION="1"
cd Micoservices
docker run --rm -v "$PWD":/Micoservices -w /Micoservices --name gradle gradle:latest gradle build --stacktrace
# docker build --no-cache -f DockerPush -t alpap/$(NAME):$(VERSION) .
# docker push alpap/$(NAME):$(VERSION)