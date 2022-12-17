FROM node:16.19.0-alpine3.17 as builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN [ "npm" , "ci" ]
RUN [ "npm" , "run" , "build" ]

FROM node:16.19.0-alpine3.17
WORKDIR /app

ENV PORT=9997
ENV API_BORROW=http://localhost:27112/api/borrows
ENV API_CUSTOMER=http://localhost:5001/api/customers
ENV API_BOOK=http://localhost:9999/api/books

COPY package*.json ./
RUN [ "npm" , "ci" ]
COPY --from=builder /app/build ./build
EXPOSE ${PORT}:${PORT}
CMD [ "npm" , "start" ]