FROM maven:3.8.1-openjdk-17-slim as builder
ARG MVN_ARGS
ADD ./src /app/src/
ADD ./pom.xml /app/pom.xml
WORKDIR /app
RUN echo "127.0.0.1 books-mysql" >> /etc/hosts && mvn --batch-mode package ${MVN_ARGS}

FROM openjdk:17-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 9999:9999
ENTRYPOINT [ "java" , "-jar" , "app.jar" ]
