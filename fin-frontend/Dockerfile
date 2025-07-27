FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000

RUN npm ci

COPY tsconfig.json vite.config.ts postcss.config.js tailwind.config.js ./

# Copy source code
COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

# Install serve to host static files
RUN npm install -g serve

# Copy built files
COPY --from=build /app/dist /app/dist

EXPOSE 5000

CMD ["serve", "-s", "dist", "-l", "5000"]