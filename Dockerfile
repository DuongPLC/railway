# Dùng image Playwright chính chủ
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Làm việc trong thư mục /app
WORKDIR /app

# Copy toàn bộ code vào container
COPY . .

# Cài dependencies
RUN npm install

# Cài dependencies cho browser
RUN npx playwright install-deps

# Cài browsers (Chromium/Firefox/WebKit)
RUN npx playwright install

# Port Railway sẽ gọi
EXPOSE 3000

# Start app với Node.js
CMD ["node", "index.js"]
