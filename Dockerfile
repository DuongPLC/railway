FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /app
COPY . .

RUN npm install
RUN npx playwright install-deps
RUN npx playwright install

EXPOSE 3000
CMD ["node", "index.js"]
