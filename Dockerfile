FROM alpine:edge
WORKDIR /usr/src/app

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      npm
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package*.json ./
RUN npm install && npm i -g typescript@4.2.2
COPY . .
RUN tsc
CMD [ "node", "dist/index.js" ]
