FROM nginx:1.17
MAINTAINER chilunyc "ceshi@chilunyc.com"

ADD nginx.conf /etc/nginx/conf.d/default.conf

ADD ./dist /var/www/app
WORKDIR /var/www/app

CMD ["nginx", "-g", "daemon off;"]
