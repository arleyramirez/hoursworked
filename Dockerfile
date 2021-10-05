#Primera Etapa
FROM node:14-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.17.1-alpine
#Nombre de la app
COPY --from=build-step /app/dist/hoursworked /usr/share/nginx/html