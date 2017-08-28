#!/usr/bin/env bash
set -ex
source ./settings/settings.sh
#alpine specific
apk update
apk add git

go get -u github.com/gorilla/mux
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 
# go test run ''
go build main.go

echo "Exit code: $?"

if [ -d "./out" ]; then 
  rm -Rf ./out/*
else 
  mkdir ./out
fi

mv main ./out/${NAME}

let $VERSION+1
echo $VERSION > ./settings/version
