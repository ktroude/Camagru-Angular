# FROM node:latest
# WORKDIR /app
# COPY ["package.json", "package-lock.json*", "./"]
# RUN npm install
# COPY ./ /app
# EXPOSE 8080
# RUN npx prisma generate && npx prisma migrate dev
# CMD ["npm", "run", "start:dev"]


FROM node:latest
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY ./ /app
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
COPY start.sh /start.sh
RUN chmod +x /start.sh
EXPOSE 8080
CMD ["/start.sh"]

