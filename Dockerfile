FROM node:20.16.0 as build

WORKDIR /app
COPY . .

RUN npm i -g pnpm@9\
    && pnpm i --registry=https://registry.npmmirror.com\
    && pnpm build:hooks\
    && pnpm build:editor

FROM nginx as nginx

COPY --from=build app/packages/editor/dist /var/www/dist
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
