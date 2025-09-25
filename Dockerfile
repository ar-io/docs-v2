# ---------------------------------------
# Dockerfile (Next.js Static Export with Nginx)
# ---------------------------------------

# 1) deps: install node_modules with good caching
FROM node:20-bullseye-slim AS deps
WORKDIR /app

# Copy only the dependency manifests first for caching
COPY package.json yarn.lock* .npmrc* .yarnrc* ./
# Copy source.config.ts as it's needed by fumadocs-mdx during install
COPY source.config.ts ./
RUN yarn install --frozen-lockfile

# 2) build: compile Next.js (static export)
FROM node:20-bullseye-slim AS build
ENV NODE_ENV=production
# Set the site URL - can be overridden at build time
ARG NEXT_PUBLIC_SITE_URL=""
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build the static export
RUN yarn build

# 3) run: serve static files with nginx
FROM nginx:alpine AS run

# Copy static files from build stage
COPY --from=build /app/out /usr/share/nginx/html

# Copy custom nginx config for better SPA support
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Drop privileges
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
