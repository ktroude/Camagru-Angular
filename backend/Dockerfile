FROM node:latest
WORKDIR /app
COPY ./backend ./
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "start:dev"]