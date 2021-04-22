FROM node:12
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install && npm i -g typescript@4.2.2
COPY . .
RUN tsc
CMD [ "node", "dist/index.js" ]
