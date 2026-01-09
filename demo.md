# Demo Hệ thống Đặt chỗ

## 🚀 Hệ thống đã chạy thành công!

**URL:** http://localhost:3000

## ✅ Tính năng đã hoàn thành:

### 🔐 Xác thực người dùng
- [x] Đăng ký tài khoản mới
- [x] Đăng nhập/Đăng xuất
- [x] Session management
- [x] Mã hóa mật khẩu với bcrypt

### ✈️ Quản lý chuyến bay
- [x] Hiển thị danh sách chuyến bay
- [x] Tìm kiếm theo tuyến bay
- [x] Tìm kiếm theo ngày
- [x] Hiển thị thông tin chi tiết (giá, thời gian, ghế trống)
- [x] AJAX search không reload trang

### 🏨 Quản lý khách sạn
- [x] Hiển thị danh sách khách sạn
- [x] Tìm kiếm theo thành phố
- [x] Lọc theo đánh giá sao
- [x] Hiển thị thông tin chi tiết
- [x] AJAX search không reload trang

### 📱 Giao diện responsive
- [x] Bootstrap 5 design
- [x] Mobile-friendly
- [x] Smooth animations
- [x] Loading indicators

### 💳 Hệ thống đặt chỗ
- [x] Tạo booking reference tự động
- [x] Tính toán giá tự động
- [x] Quản lý trạng thái đặt chỗ
- [x] Lịch sử đặt chỗ
- [x] Form validation

## 🎯 Cách sử dụng:

### 1. Truy cập trang chủ
- Mở http://localhost:3000
- Xem chuyến bay và khách sạn nổi bật
- Sử dụng form tìm kiếm nhanh

### 2. Đăng ký tài khoản
- Click "Đăng ký" trên navigation
- Điền thông tin: Họ, Tên, Email, SĐT, Mật khẩu
- Hệ thống tự động đăng nhập sau khi đăng ký

### 3. Tìm kiếm chuyến bay
- Chọn thành phố khởi hành và đến
- Chọn ngày khởi hành
- Click "Tìm chuyến bay"
- Kết quả hiển thị ngay không reload trang

### 4. Tìm kiếm khách sạn
- Chọn thành phố
- Chọn ngày nhận/trả phòng
- Lọc theo đánh giá sao (tùy chọn)
- Click "Tìm khách sạn"

### 5. Đặt chỗ
- Click "Đặt ngay" trên chuyến bay/khách sạn
- Điền thông tin đặt chỗ
- Xác nhận và nhận mã booking
- Xem chi tiết đặt chỗ

### 6. Quản lý đặt chỗ
- Vào "Đặt chỗ của tôi" để xem lịch sử
- Xem chi tiết từng booking
- Theo dõi trạng thái

## 📊 Dữ liệu mẫu có sẵn:

### Chuyến bay:
1. **VN101** - Vietnam Airlines: Hà Nội → Hồ Chí Minh (2,500,000₫)
2. **VJ201** - VietJet Air: Hồ Chí Minh → Đà Nẵng (1,800,000₫)  
3. **BB301** - Bamboo Airways: Đà Nẵng → Hà Nội (2,200,000₫)

### Khách sạn:
1. **Metropole Hà Nội** - 5 sao (3,500,000₫/đêm)
2. **Rex Hotel Sài Gòn** - 4 sao (2,800,000₫/đêm)
3. **Fusion Maia Resort Đà Nẵng** - 5 sao (4,200,000₫/đêm)

## 🔧 Công nghệ sử dụng:

- **Backend:** Node.js + Express.js
- **Template Engine:** EJS
- **Database:** In-memory (demo)
- **Frontend:** Bootstrap 5 + Vanilla JavaScript
- **Authentication:** bcryptjs + express-session
- **AJAX:** Fetch API
- **Responsive:** Bootstrap Grid System

## 🚀 Tính năng nâng cao có thể mở rộng:

- [ ] Tích hợp cơ sở dữ liệu thực (MongoDB/PostgreSQL)
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Real-time availability updates
- [ ] Advanced filtering (price range, amenities)
- [ ] User reviews and ratings
- [ ] Multi-language support
- [ ] Admin dashboard
- [ ] API documentation
- [ ] Unit testing với Jest

## 📝 Ghi chú:

- Hệ thống sử dụng in-memory database nên dữ liệu sẽ reset khi restart server
- Tất cả tính năng core đã hoạt động ổn định
- Giao diện responsive hoạt động tốt trên mobile và desktop
- AJAX search mượt mà không cần reload trang