FROM node:lts-alpine3.19 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY . . 

RUN npm install

CMD [ "npm","run","dev" ]
