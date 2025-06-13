ARG NODE_VERSION=20.7.0

FROM node:${NODE_VERSION}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# For hot reload, expose a static port
#EXPOSE 3110
EXPOSE ${FRONTEND_PORT}

CMD ["npm", "run", "dev", "--", "--host"]