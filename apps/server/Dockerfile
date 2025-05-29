ARG NODE_VERSION=20.7.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

#COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
