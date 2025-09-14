# Prompt AI - Next.js Version

Một ứng dụng web Next.js cung cấp thư viện prompt AI và các công cụ nâng cấp prompt, được xây dựng với Next.js 14, TypeScript, Tailwind CSS, và shadcn/ui.

## 🚀 Tính năng chính

- **Thư viện Prompt AI**: Hơn 8,000+ prompts được tạo bởi các chuyên gia AI
- **Nâng cấp Prompt**: Công cụ tùy chỉnh và cải thiện prompt
- **Hệ thống đăng ký**: Các gói Free, Premium, Pro, Business
- **Quản lý nội dung**: Admin panel để quản lý prompts, categories, users
- **Blog & Tin tức**: Cập nhật thông tin về AI và prompts
- **Tích hợp thanh toán**: VNPay và các phương thức thanh toán khác
- **Responsive Design**: Tối ưu cho mobile và desktop

## 🛠️ Công nghệ sử dụng

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Authentication**: JWT + Local Storage
- **Icons**: Lucide React

## 📦 Cài đặt

1. **Clone repository**

```bash
git clone <repository-url>
cd prompt-ai-nextjs
```

2. **Cài đặt dependencies**

```bash
npm install
```

3. **Cấu hình environment variables**

```bash
cp .env.example .env.local
```

Chỉnh sửa file `.env.local` với các giá trị phù hợp:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXTAUTH_SECRET=your-secret-key-here
# ... các biến môi trường khác
```

4. **Chạy ứng dụng**

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## 🏗️ Cấu trúc thư mục

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin pages
│   ├── login/             # Authentication pages
│   ├── register/
│   ├── thu-vien-prompt/   # Prompt library
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── admin/            # Admin components
│   └── ui/               # shadcn/ui components
├── contexts/             # React Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── api.ts           # API service
│   ├── constants.ts     # App constants
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## 🔧 Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 📱 Tính năng

### User Interface

- Trang chủ với hero section và testimonials
- Thư viện prompt với tìm kiếm và lọc
- Trang chi tiết prompt
- Hệ thống đăng nhập/đăng ký
- Trang thông tin cá nhân
- Blog và tin tức

### Admin Panel

- Dashboard với thống kê tổng quan
- Quản lý prompts, categories, topics
- Quản lý users và roles
- Quản lý blog và nội dung
- Quản lý thanh toán và subscriptions
- Hệ thống phân quyền chi tiết

### API Integration

- RESTful API với Axios
- JWT Authentication
- File upload support
- Error handling và retry logic
- Request/Response interceptors

## 🎨 UI/UX Features

- **Modern Design**: Gradient và animation đẹp mắt
- **Responsive**: Mobile-first approach
- **Dark/Light Mode**: Hỗ trợ chế độ sáng/tối
- **Smooth Animations**: Transitions mượt mà
- **Interactive Elements**: Hover effects và micro-interactions
- **Accessibility**: Tuân thủ WCAG guidelines

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Protected routes
- Admin permissions system
- Session management với localStorage

## 📊 State Management

- React Context API cho global state
- Custom hooks cho logic tái sử dụng
- Local state với useState/useReducer
- Server state với Axios

## 🚀 Deployment

### Vercel (Recommended)

1. Push code lên GitHub
2. Connect repository với Vercel
3. Cấu hình environment variables
4. Deploy tự động

### Docker

```bash
# Build image
docker build -t prompt-ai-nextjs .

# Run container
docker run -p 3000:3000 prompt-ai-nextjs
```

### Manual Deployment

```bash
# Build application
npm run build

# Start production server
npm run start
```

## 🔧 Configuration

### Tailwind CSS

Cấu hình trong `tailwind.config.js`:

- Custom colors và fonts
- Responsive breakpoints
- Animation keyframes
- Plugin configurations

### TypeScript

Cấu hình trong `tsconfig.json`:

- Strict mode enabled
- Path mapping cho imports
- Type checking rules

## 📈 Performance

- **Code Splitting**: Automatic với Next.js
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Dynamic imports
- **Caching**: API response caching
- **Bundle Analysis**: Webpack bundle analyzer

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🤝 Support

- Email: support@prompt-ai.com
- Documentation: [docs.prompt-ai.com](https://docs.prompt-ai.com)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide](https://lucide.dev/) - Icons
- [Axios](https://axios-http.com/) - HTTP client
