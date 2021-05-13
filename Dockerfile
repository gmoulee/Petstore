FROM node:14

WORKDIR /user/docker/petstore

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]