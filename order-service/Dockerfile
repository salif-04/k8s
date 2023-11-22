FROM node:latest

ENV PORT 3000

ENV MONGOCONNECTIONURI uri

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN ls

EXPOSE $PORT

CMD ["node", "index.js"]