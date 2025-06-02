FROM mcr.microsoft.com/playwright/node:v1.44.0-jammy

WORKDIR /app
COPY . .
RUN npm install
RUN npx playwright install-deps
RUN npx playwright install

CMD ["node", "index.js"]
