FROM node:16-alpine

WORKDIR /app

COPY public public
COPY package.json package.json
RUN npm install gatsby-cli --force --location=global

EXPOSE 8080

ENTRYPOINT [ "gatsby", "serve" ]
# EOF