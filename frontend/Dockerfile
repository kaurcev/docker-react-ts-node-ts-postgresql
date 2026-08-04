FROM node:20.18-alpine AS base
WORKDIR /app
RUN apk update && apk upgrade --no-cache
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
COPY package*.json ./
RUN npm install && npm install @rolldown/binding-linux-x64-musl && npm cache clean --force
COPY . .

FROM base AS development
EXPOSE 5173
CMD ["npm", "run", "dev"]

FROM base AS builder
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine AS production
USER root
RUN apk update && apk upgrade --no-cache
USER 101
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]