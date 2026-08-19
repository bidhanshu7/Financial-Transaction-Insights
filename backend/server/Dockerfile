FROM node:20-alpine
WORKDIR /app/server
COPY server/package*.json ./
RUN apk add --no-cache python3 make g++
RUN npm i
COPY server/ ./
COPY proto/ /app/proto
EXPOSE 50051 50052 50053
CMD ["node", "index.js" ]


