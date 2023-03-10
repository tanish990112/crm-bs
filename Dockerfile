FROM node:16.13.1-alpine3.14

WORKDIR /usr/src/app

COPY . .

COPY package*.json /usr/src/app/

RUN npm install

RUN npm i -g @nestjs/cli
RUN npm i -g prisma
CMD prisma migrate dev --name init && npm run start:dev