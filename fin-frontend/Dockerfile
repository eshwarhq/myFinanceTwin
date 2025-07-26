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

FROM nginx:alpine

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Create custom nginx config
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 5000;' >> /etc/nginx/conf.d/default.conf && \
    echo '    listen [::]:5000;' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '        index index.html index.htm;' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]