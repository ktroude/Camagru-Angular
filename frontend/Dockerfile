FROM node:latest
WORKDIR /app
COPY ./frontend ./
RUN npm install
EXPOSE 4200
CMD ["npm", "run", "start"]
