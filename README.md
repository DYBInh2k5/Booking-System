# Hệ thống Đặt chỗ (Booking System)

Một hệ thống đặt chỗ hoàn chỉnh được xây dựng bằng Node.js và Express.js, hỗ trợ đặt vé máy bay và phòng khách sạn với giao diện responsive sử dụng Bootstrap 5.

## 🚀 Demo Live

**URL:** http://localhost:3000 (khi chạy local)

## ✨ Tính năng chính

### 🔐 Xác thực người dùng
- Đăng ký/Đăng nhập với mã hóa mật khẩu bcrypt
- Quản lý session an toàn
- Validation form đầy đủ

### ✈️ Quản lý chuyến bay
- Tìm kiếm chuyến bay theo tuyến và ngày
- Hiển thị thông tin chi tiết (giá, thời gian, ghế trống)
- Đặt vé với xác nhận tức thì
- AJAX search không reload trang

### 🏨 Quản lý khách sạn
- Tìm kiếm khách sạn theo thành phố
- Lọc theo đánh giá sao
- Đặt phòng với tính năng chọn ngày
- Tính toán số đêm tự động

### � Gikao diện responsive
- Thiết kế Bootstrap 5 hiện đại
- Tương thích mobile và desktop
- Loading indicators và animations mượt mà
- Form validation real-time

### 💳 Hệ thống đặt chỗ
- Tạo booking reference tự động
- Quản lý trạng thái đặt chỗ
- Tính toán giá tự động
- Lịch sử đặt chỗ chi tiết

## 🛠️ Công nghệ sử dụng

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **EJS** - Template engine
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **moment.js** - Date/time handling

### Frontend
- **Bootstrap 5** - CSS framework
- **Vanilla JavaScript** - Client-side logic
- **Fetch API** - AJAX requests
- **Font Awesome** - Icons

### Database
- **In-memory storage** (demo) - Có thể mở rộng với MongoDB/PostgreSQL

## 📦 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 14+ 
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository:**
```bash
git clone https://github.com/DYBInh2k5/Booking-System.git
cd Booking-System
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Chạy development server:**
```bash
npm start
```

4. **Truy cập ứng dụng:**
```
http://localhost:3000
```

### Scripts có sẵn
```bash
npm start       # Chạy production server
npm run dev     # Chạy development server với nodemon
```

## 📊 Dữ liệu mẫu

### Chuyến bay có sẵn:
1. **VN101** - Vietnam Airlines: Hà Nội → Hồ Chí Minh (2,500,000₫)
2. **VJ201** - VietJet Air: Hồ Chí Minh → Đà Nẵng (1,800,000₫)  
3. **BB301** - Bamboo Airways: Đà Nẵng → Hà Nội (2,200,000₫)

### Khách sạn có sẵn:
1. **Metropole Hà Nội** - 5 sao (3,500,000₫/đêm)
2. **Rex Hotel Sài Gòn** - 4 sao (2,800,000₫/đêm)
3. **Fusion Maia Resort Đà Nẵng** - 5 sao (4,200,000₫/đêm)

## 🎯 Hướng dẫn sử dụng

### 1. Đăng ký tài khoản
- Click "Đăng ký" trên navigation
- Điền đầy đủ thông tin: Họ, Tên, Email, SĐT, Mật khẩu
- Hệ thống tự động đăng nhập sau khi đăng ký thành công

### 2. Tìm kiếm chuyến bay
- Chọn thành phố khởi hành và đến
- Chọn ngày khởi hành
- Click "Tìm chuyến bay"
- Kết quả hiển thị ngay lập tức

### 3. Tìm kiếm khách sạn
- Chọn thành phố
- Chọn ngày nhận/trả phòng
- Lọc theo đánh giá sao (tùy chọn)
- Click "Tìm khách sạn"

### 4. Đặt chỗ
- Click "Đặt ngay" trên item mong muốn
- Điền thông tin đặt chỗ chi tiết
- Xác nhận và nhận mã booking
- Xem chi tiết đặt chỗ

### 5. Quản lý đặt chỗ
- Truy cập "Đặt chỗ của tôi"
- Xem lịch sử đặt chỗ
- Theo dõi trạng thái booking

## 🏗️ Cấu trúc dự án

```
Booking-System/
├── views/                  # EJS templates
│   ├── layout.ejs         # Layout chính
│   ├── home.ejs           # Trang chủ
│   ├── search.ejs         # Trang tìm kiếm
│   ├── auth/              # Authentication views
│   ├── bookings/          # Booking views
│   └── partials/          # Partial templates
├── public/                # Static files
│   └── js/
│       └── app.js         # Client-side JavaScript
├── app/                   # Rails files (legacy)
├── server.js              # Main server file
├── package.json           # Dependencies
└── README.md             # Documentation
```

## 🔒 Bảo mật

### Implemented security measures
- Password hashing với bcrypt
- Session-based authentication
- CSRF protection
- Input validation
- XSS protection

### Khuyến nghị cho production
- Sử dụng HTTPS
- Implement rate limiting
- Add payment gateway integration
- Setup monitoring và logging
- Sử dụng database thực (MongoDB/PostgreSQL)

## 🚀 Tính năng có thể mở rộng

- [ ] Tích hợp cơ sở dữ liệu thực (MongoDB/PostgreSQL)
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Real-time availability updates với WebSocket
- [ ] Advanced filtering (price range, amenities)
- [ ] User reviews và ratings
- [ ] Multi-language support
- [ ] Admin dashboard
- [ ] REST API documentation
- [ ] Unit testing với Jest
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 Changelog

### v1.0.0 (2024-01-09)
- ✅ Hoàn thành hệ thống đặt chỗ cơ bản
- ✅ Authentication system
- ✅ Flight và hotel booking
- ✅ Responsive UI với Bootstrap 5
- ✅ AJAX search functionality

## 📄 License

Dự án này được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

## 👨‍💻 Tác giả

**Đỗ Yến Bình**
- Email: binh.vd01500@sinhvien.hoasen.edu.vn
- GitHub: [@DYBInh2k5](https://github.com/DYBInh2k5)

## 📞 Liên hệ

Để được hỗ trợ hoặc báo lỗi, vui lòng:
- Tạo issue trên GitHub repository
- Gửi email đến: binh.vd01500@sinhvien.hoasen.edu.vn

---

⭐ Nếu dự án này hữu ích, hãy cho một star trên GitHub!