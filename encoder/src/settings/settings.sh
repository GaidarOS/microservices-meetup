#!/usr/bin/env bash
export VERSION=$(cat ./src/settings/version)
export NAME="encoder"
export BUILDIMAGE="golang:1.8.3-alpine3.6"
export PUSHIMAGE="alpine:latest"
export PORT="3456"
export DOCKERREPO="alpap/${NAME}:latest"
export TESTCOMMAND="curl localhost:${PORT}/encode/start/stop"