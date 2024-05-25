FROM node:18.18 AS builder

RUN mkdir -p /usr/src/angular
WORKDIR /usr/src/angular
COPY . /usr/src/angular

RUN npm install
RUN node_modules/.bin/ng build --configuration=production --aot --optimization

FROM nginx
WORKDIR /usr/share/nginx/html/
COPY --from=builder /usr/src/angular/dist/app-cart/browser/ /usr/share/nginx/html
EXPOSE 80 443

CMD nginx -g 'daemon off;'