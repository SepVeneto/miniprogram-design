FROM node:16.11.0 as build

WORKDIR /app
COPY . .

RUN npm i -g pnpm\
    && pnpm i\
    && pnpm build:editor\
    && pnpm build:hooks

FROM nginx as nginx

COPY --from=build app/packages/editor/dist /var/www/dist
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
