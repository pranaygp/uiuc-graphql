FROM mhart/alpine-node:10.5.0
RUN apk add --update --no-cache rust cargo python make gcc g++
COPY . .
RUN yarn install
RUN yarn start