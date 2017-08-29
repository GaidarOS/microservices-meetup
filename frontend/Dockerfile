FROM node:8.4.0
ENV angularmode dev
RUN mkdir -p /usr/src/app
COPY praqmaMicro /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g yarn && yarn global add @angular/cli npm && npm install
RUN ng build
EXPOSE 4200 
ENTRYPOINT ng serve -H 0.0.0.0 --disable-host-check --environment=$angularmode
