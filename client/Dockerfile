# Prod Dockerfile

FROM node:alpine as builder

WORKDIR '/app'

COPY ./package.json ./

RUN yarn install 

COPY . . 

RUN yarn build 

# ! Special work for nginx

FROM nginx 

# expose port --
EXPOSE 3000 

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

#? There is no cmd command in this file