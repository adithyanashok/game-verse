# -------- Builder Stage --------
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY apps ./apps
COPY libs ./libs

RUN npm install
RUN npm run build --project game

# -------- Runtime Stage --------
FROM node:20
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist/apps/game ./dist

EXPOSE 4000
CMD ["node", "dist/main.js"]
