FROM mhart/alpine-node:10.5.0
COPY . .
RUN yarn install
RUN yarn start