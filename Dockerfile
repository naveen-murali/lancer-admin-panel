FROM node:16.14.2-alpine as lancer-admin-build
WORKDIR /lancer-admin-panal
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=lancer-admin-build /lancer-admin-panal/build /usr/share/nginx/html