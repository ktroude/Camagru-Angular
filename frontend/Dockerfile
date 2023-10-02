FROM node:latest
WORKDIR /src/app
COPY ./frontend ./
RUN npm install -g @angular/cli
RUN npm install
EXPOSE 4200
CMD ng serve