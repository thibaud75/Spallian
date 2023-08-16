FROM node:18-alpine AS dev

ENV NODE_ENV dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]