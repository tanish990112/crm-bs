FROM node:16.13.1-alpine3.14

WORKDIR /usr/src/app

COPY . .

COPY package*.json /usr/src/app/

RUN npm install

CMD npx prisma migrate deploy && npm run start:dev