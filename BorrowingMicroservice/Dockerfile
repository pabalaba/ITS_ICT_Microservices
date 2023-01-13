FROM node:16.19.0-alpine3.17 as builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN [ "npm" , "ci" ]
RUN [ "npm" , "run" , "build" ]


FROM node:16.19.0-alpine3.17
WORKDIR /app

ENV PORT=27112
ENV MONGO_USER=root
ENV MONGO_PASS=root
ENV MONGO_CLUSTER=
ENV MONGO_DB=microservices
ENV AMQP_SERVER=localhost:5672
ENV AMQP_USER=guest
ENV AMQP_PASSWORD=guest

COPY package*.json ./
RUN [ "npm" , "ci" ]
COPY --from=builder /app/build ./build
EXPOSE ${PORT}:27112
CMD [ "npm" , "start" ]