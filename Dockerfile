# ---------- Build stage ----------
FROM oven/bun:latest AS build
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

# IMPORTANT: production build
ENV NODE_ENV=production
RUN bun run build

# ---------- Runtime stage ----------
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
