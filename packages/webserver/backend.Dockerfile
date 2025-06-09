FROM node:20-alpine

WORKDIR /app

COPY packages/webserver/package*.json ./
RUN npm ci

COPY packages/webserver/ ./

EXPOSE 8080        
CMD ["npm", "start"] 