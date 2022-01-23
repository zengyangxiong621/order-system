FROM node:14.9.0 as builder
WORKDIR /usr/src/app
COPY . .
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn install && yarn build
FROM nginx

EXPOSE 8080
WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/src/app/dist .
COPY default.conf /etc/nginx/conf.d/default.conf
RUN chmod 644 /etc/nginx/conf.d/default.conf
