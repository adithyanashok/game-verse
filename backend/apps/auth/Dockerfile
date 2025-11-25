FROM public.ecr.aws/docker/library/node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY apps ./apps
COPY libs ./libs

RUN npm install
RUN npm run build --project auth

FROM public.ecr.aws/docker/library/node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist/apps/auth ./dist

EXPOSE 6000
CMD ["node", "dist/main.js"]
