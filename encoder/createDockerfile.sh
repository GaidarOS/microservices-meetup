rm ./Dockerfile
source ./src/settings/settings.sh

cat <<EOT>> Dockerfile
FROM ${PUSHIMAGE}
COPY ./src/out /
RUN cd out
EXPOSE ${PORT}
ENTRYPOINT /${NAME}
EOT