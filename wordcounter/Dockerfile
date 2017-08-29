FROM microsoft/dotnet:1.0.5-sdk
COPY WebApplication /code
WORKDIR /code/WebApplication
RUN ls
RUN dotnet restore
EXPOSE 5000
ENV ASPNETCORE_URLS http://*:5000
ENTRYPOINT dotnet run
