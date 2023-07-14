FROM gcc:latest as c-builder
WORKDIR /sandbox
COPY code.c .
RUN gcc -o program code.c

FROM python:latest as python-builder
WORKDIR /sandbox
COPY code.py .

FROM openjdk:latest as java-builder
WORKDIR /sandbox
COPY code.java .
RUN javac code.java

FROM node:latest as javascript-builder
WORKDIR /sandbox
COPY code.js .

FROM debian:buster-slim as final
WORKDIR /sandbox
COPY --from=c-builder /sandbox/program /sandbox/
COPY --from=python-builder /sandbox/code.py /sandbox/
COPY --from=java-builder /sandbox/code.class /sandbox/
COPY --from=javascript-builder /sandbox/code.js /sandbox/

CMD ["echo", "Unsupported language."]