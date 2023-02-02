FROM node:16.11.0 as build

WORKDIR /app
COPY . .

RUN npm i -g pnpm\
    && cd packages/editor\
    && pnpm i\
    && pnpm build\
    && pnpm build --mode development

FROM nginx as nginx

WORKDIR /app/packages/editor

COPY ./dist /var/www/dist
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
