

# Dùng image chính chủ từ Microsoft
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Tạo thư mục app
WORKDIR /app

# Copy toàn bộ file project vào container
COPY . .

# Cài đặt các gói npm
RUN npm install

# Cài dependencies cho browser
RUN npx playwright install-deps

# Cài browser (Chromium/Firefox/WebKit)
RUN npx playwright install

# Expose port 3000 (hoặc port khác nếu app dùng)
EXPOSE 3000

# Command chạy server
CMD ["node", "index.js"]

