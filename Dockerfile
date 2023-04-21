FROM node:latest AS builder

WORKDIR /app

COPY . .
RUN npm install -g pnpm
RUN pnpm install && pnpm build

FROM nginx:alpine AS runner

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
RUN chown -R nginx:nginx /usr/share/nginx/*

COPY ./nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
