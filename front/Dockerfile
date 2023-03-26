FROM node:alpine

ARG front-end

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install react-scripts
RUN npm i @material-ui/core --legacy-peer-deps

COPY . ./


RUN npm run build


EXPOSE 3000

CMD ["npm", "start"]