FROM node:latest

ENV AUTHDBCONNECTIONURI=mongodb+srv://azlan:An3wPassword@cluster0.ueacbsx.mongodb.net/authDb?retryWrites=true&w=majority

ENV ORDERDBCONNECTIONURI=mongodb+srv://azlan:An3wPassword@cluster0.ueacbsx.mongodb.net/orderDb?retryWrites=true&w=majority

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm", "start"]