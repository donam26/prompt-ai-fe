#!/bin/bash
# ===============================
# 🚀 Auto Deploy Script for Next.js
# Location: /root/prompt-ai-fe/deploy.sh
# ===============================

echo "🔁 Bắt đầu cập nhật code frontend..."

# 1️⃣ Di chuyển vào thư mục dự án
cd /root/prompt-ai-fe

# 2️⃣ Lấy code mới nhất từ GitHub
echo "📦 Đang pull code mới từ GitHub..."
git pull origin main

# 3️⃣ Cài đặt dependencies (nếu có thay đổi)
echo "📦 Đang cài dependencies..."
npm install

# 4️⃣ Build lại project Next.js
echo "🏗️  Đang build dự án..."
npm run build

# 5️⃣ Restart lại tiến trình PM2
echo "🚀 Khởi động lại PM2..."
pm2 restart all

echo "✅ Deploy thành công!"
