FROM mhart/alpine-node:10 as base
WORKDIR /usr/src
RUN apk add --update --no-cache python make g++
COPY package.json yarn.lock /usr/src/
RUN yarn --production && \
    apk del python make g++
ENV NODE_ENV="production"
COPY . .
CMD ["yarn", "start"]
