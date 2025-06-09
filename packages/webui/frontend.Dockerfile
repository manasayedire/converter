FROM node:20-alpine AS build

WORKDIR /app

COPY packages/webui/package*.json ./
RUN npm install

COPY packages/webui/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"] 