FROM node:20.18-alpine AS base
WORKDIR /app
RUN apk update && apk upgrade --no-cache
COPY package*.json ./
RUN npm install

FROM base AS development
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]

FROM base AS builder
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:20.18-alpine AS production
WORKDIR /app
RUN apk update && apk upgrade --no-cache
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
USER node
EXPOSE 3001
CMD ["node", "dist/server.js"]