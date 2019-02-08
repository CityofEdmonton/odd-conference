FROM node:8.4-alpine

ADD . .
RUN ["npm", "install"]
RUN ["npm", "run", "build"]

ENV GRAPHQL_PARSE_URL "http://localhost:1337/parse"
ENV GRAPHQL_APPID "oss-f8-app-2017"
ENV GRAPHQL_MASTER_KEY "oss-f8-app-2017-mk"

ENTRYPOINT [ "node", "lib/index.js" ]
