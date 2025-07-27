# Build stage
FROM node:22-alpine as build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000

RUN npm ci

# Copy source code
COPY . .

RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy built files and package.json for production dependencies
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/certificate.json ./

# Install all dependencies (including cross-env)
RUN npm ci && npm cache clean --force

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001 -G nodejs

RUN chown -R appuser:nodejs /app
USER appuser

EXPOSE 3000

CMD ["sh", "-c", "NODE_ENV=production node dist/index.js"]