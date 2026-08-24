FROM node:20-alpine
WORKDIR /app/gateway
COPY gateway/package*.json ./
RUN npm ci --omit=dev
COPY gateway/ ./
COPY ../proto/ /app/proto
EXPOSE 3000
CMD ["node","index.js"]

