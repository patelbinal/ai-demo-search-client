# ---------- Build stage ----------
FROM oven/bun:latest AS build
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .
ENV NODE_ENV=production

# IMPORTANT: show build output for debugging
RUN bun run build && ls -l dist

# ---------- Runtime stage ----------
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
