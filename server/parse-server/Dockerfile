FROM node:8.11-alpine

RUN ["npm", "install", "-g", "parse-server"]

ADD . .
RUN [ "npm", "install" ]
RUN [ "npm", "run", "build" ]

ENV PORT 1337
ENV PARSE_SERVER_APPLICATION_ID "oss-f8-app-2017"
ENV PARSE_SERVER_MASTER_KEY "oss-f8-app-2017-mk"
ENV PARSE_SERVER_DATABASE_URI "mongodb://mongo/dev"
ENV PARSE_SERVER_URL "http://localhost:1337/parse"
ENV PARSE_SERVER_CLOUD "cloud-lib/index.js"

ENTRYPOINT [ "parse-server" ]
