# Pastebin-Cleanup
FROM node:16-alpine

# Setting Environment Variables
ARG MONGO_URI
ARG CLEANUP_SERVICE_RUN_INTERVAL
ENV MONGO_URI=$MONGO_URI
ENV CLEANUP_SERVICE_RUN_INTERVAL=$CLEANUP_SERVICE_RUN_INTERVAL

WORKDIR /app
COPY . .

RUN npm install -f


CMD ["npm", "run", "prod"]

# EOF