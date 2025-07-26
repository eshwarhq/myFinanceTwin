# Use Node.js official image as base
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy tsconfig.json and vite.config.ts for proper TypeScript/ESM handling
COPY tsconfig.json vite.config.ts postcss.config.js tailwind.config.js ./

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage - use nginx to serve static files
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]