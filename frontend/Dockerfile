FROM node:latest
WORKDIR /src/app
COPY ./frontend ./
RUN npm install -g @angular/cli
RUN npm install
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
