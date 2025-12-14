FROM ghcr.io/puppeteer/puppeteer:24.33.0

# Puppeteer image already includes Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
