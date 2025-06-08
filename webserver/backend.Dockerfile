FROM node:20-alpine

WORKDIR /app

COPY webserver/package*.json ./
RUN npm install

COPY webserver/ ./

EXPOSE 8080        
CMD ["npm", "start"] 