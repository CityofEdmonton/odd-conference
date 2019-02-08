FROM node:8.4-alpine

RUN ["npm", "install", "-g", "parse-dashboard"]

ENV HOST: "localhost"
ENV PORT: "4040"
ENV MOUNT_PATH: "/"
ENV PARSE_DASHBOARD_USER_ID "admin"
ENV PARSE_DASHBOARD_USER_PASSWORD "password"
ENV PARSE_DASHBOARD_SERVER_URL "http://localhost:1337/parse"
ENV PARSE_DASHBOARD_APP_ID "oss-f8-app-2017"
ENV PARSE_DASHBOARD_MASTER_KEY "oss-f8-app-2017-mk"
ENV PARSE_DASHBOARD_APP_NAME "F8"

ENTRYPOINT [ \
  "parse-dashboard", \
  "--allowInsecureHTTP" \
]
