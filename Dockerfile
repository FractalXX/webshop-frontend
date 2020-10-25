FROM nginx:1.18.0-alpine

RUN apk update && apk add --update npm

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install --production

COPY ./src ./src
COPY tsconfig.json .
COPY angular.json .

RUN npm run build -- --output-path=/usr/share/nginx/html

COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf