FROM alpap/dot-node:stable
COPY . /code
WORKDIR /code
RUN ls
RUN dotnet restore project.json
EXPOSE 5000
ENV ASPNETCORE_URLS http://*:5000
ENTRYPOINT dotnet run
