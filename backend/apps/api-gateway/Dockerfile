FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY apps ./apps
COPY libs ./libs

RUN npm install
RUN npm run build --project api-gateway

FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist/apps/api-gateway ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
