# Hướng dẫn Deployment

## 🚀 Deployment lên Heroku

### 1. Chuẩn bị
```bash
# Cài đặt Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Đăng nhập Heroku
heroku login
```

### 2. Tạo ứng dụng Heroku
```bash
# Tạo app mới
heroku create booking-system-app

# Hoặc với tên tùy chỉnh
heroku create your-app-name
```

### 3. Cấu hình environment variables
```bash
# Set NODE_ENV
heroku config:set NODE_ENV=production

# Set session secret
heroku config:set SESSION_SECRET=your-super-secret-key-here
```

### 4. Deploy
```bash
# Push code lên Heroku
git push heroku main

# Mở ứng dụng
heroku open
```

## 🐳 Deployment với Docker

### 1. Tạo Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### 2. Tạo docker-compose.yml
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - SESSION_SECRET=your-secret-key
```

### 3. Build và chạy
```bash
# Build image
docker build -t booking-system .

# Chạy container
docker run -p 3000:3000 booking-system

# Hoặc với docker-compose
docker-compose up
```

## ☁️ Deployment lên Vercel

### 1. Cài đặt Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy
```bash
# Deploy
vercel

# Deploy production
vercel --prod
```

### 3. Cấu hình vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

## 🌐 Deployment lên Railway

### 1. Kết nối GitHub
- Truy cập https://railway.app
- Đăng nhập với GitHub
- Chọn repository

### 2. Cấu hình
- Railway tự động detect Node.js
- Set environment variables nếu cần

### 3. Deploy
- Railway tự động deploy khi push code

## 📊 Monitoring và Logging

### 1. Thêm logging
```javascript
// Thêm vào server.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### 2. Health check endpoint
```javascript
// Thêm vào server.js
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## 🔒 Production Security

### 1. Environment Variables
```bash
# Tạo file .env.production
NODE_ENV=production
SESSION_SECRET=your-super-secret-session-key
PORT=3000
```

### 2. Security Headers
```javascript
// Thêm helmet middleware
const helmet = require('helmet');
app.use(helmet());
```

### 3. Rate Limiting
```javascript
// Thêm rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

## 📈 Performance Optimization

### 1. Compression
```javascript
const compression = require('compression');
app.use(compression());
```

### 2. Static file caching
```javascript
app.use(express.static('public', {
  maxAge: '1d'
}));
```

### 3. Database optimization
- Implement Redis for session storage
- Add database connection pooling
- Use database indexes

## 🔄 CI/CD Pipeline

### GitHub Actions (.github/workflows/deploy.yml)
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "your-app-name"
        heroku_email: "your-email@example.com"
```

## 🗄️ Database Migration

### Từ In-Memory sang MongoDB
```javascript
// Cài đặt MongoDB
npm install mongodb mongoose

// Tạo models với Mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String
});

const User = mongoose.model('User', userSchema);
```

### Từ In-Memory sang PostgreSQL
```javascript
// Cài đặt PostgreSQL
npm install pg sequelize

// Cấu hình Sequelize
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);
```

## 📝 Checklist Deployment

- [ ] Environment variables được set
- [ ] Database connection string
- [ ] Session secret key
- [ ] HTTPS enabled
- [ ] Error logging
- [ ] Health check endpoint
- [ ] Rate limiting
- [ ] Security headers
- [ ] Static file compression
- [ ] Monitoring setup
- [ ] Backup strategy
- [ ] Domain name configured
- [ ] SSL certificate

## 🆘 Troubleshooting

### Common Issues

1. **Port binding error**
   ```javascript
   const PORT = process.env.PORT || 3000;
   ```

2. **Session issues in production**
   ```javascript
   app.use(session({
     secret: process.env.SESSION_SECRET,
     resave: false,
     saveUninitialized: false,
     cookie: { 
       secure: process.env.NODE_ENV === 'production',
       httpOnly: true
     }
   }));
   ```

3. **Static files not loading**
   ```javascript
   app.use(express.static(path.join(__dirname, 'public')));
   ```

## 📞 Support

Nếu gặp vấn đề trong quá trình deployment:
- Kiểm tra logs: `heroku logs --tail`
- Xem status: `heroku ps`
- Restart app: `heroku restart`