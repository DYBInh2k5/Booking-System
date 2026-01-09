# 🚀 Features & Implementation Guide

Tài liệu này mô tả chi tiết các tính năng hiện tại và hướng dẫn implement các tính năng mới cho Booking System.

## 📋 Current Features

### ✅ Implemented Features

#### 🔐 Authentication System
**Status:** ✅ Complete
**Description:** User registration, login, session management

**Technical Details:**
- bcryptjs for password hashing
- express-session for session management
- Form validation with client-side và server-side checks

**Files:**
- `server.js` - Authentication routes
- `views/auth/` - Login/Register templates
- `public/js/app.js` - Client-side validation

#### ✈️ Flight Search & Booking
**Status:** ✅ Complete
**Description:** Search flights by route and date, book with automatic pricing

**Technical Details:**
- In-memory flight data with sample flights
- AJAX search without page reload
- Automatic seat availability management
- Booking reference generation

**Files:**
- `server.js` - Flight routes và logic
- `views/partials/flights_results.ejs` - Search results template
- `views/bookings/` - Booking templates

#### 🏨 Hotel Search & Booking
**Status:** ✅ Complete
**Description:** Search hotels by city and rating, book with night calculation

**Technical Details:**
- Hotel filtering by city và rating
- Automatic night calculation
- Room availability management
- Price calculation per night

**Files:**
- `server.js` - Hotel routes và logic
- `views/partials/hotels_results.ejs` - Search results template

#### 📱 Responsive UI
**Status:** ✅ Complete
**Description:** Bootstrap 5 responsive design

**Technical Details:**
- Mobile-first design approach
- Bootstrap 5 components
- Custom CSS for enhancements
- Font Awesome icons

**Files:**
- `views/layout.ejs` - Main layout template
- `public/js/app.js` - Interactive JavaScript

#### 💳 Basic Booking Management
**Status:** ✅ Complete
**Description:** Create, view, and manage bookings

**Technical Details:**
- Polymorphic booking system (flights + hotels)
- Booking reference generation
- Status management
- Booking history

**Files:**
- `server.js` - Booking logic
- `views/bookings/` - Booking templates

## 🔄 Features In Development

### 🚧 Planned Features (Next Sprint)

#### 🗄️ Database Integration
**Status:** 📋 Planned
**Priority:** High
**Estimated Time:** 1-2 weeks

**Description:** Replace in-memory storage with persistent database

**Implementation Plan:**
```javascript
// MongoDB with Mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: String,
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

**Tasks:**
- [ ] Choose database (MongoDB vs PostgreSQL)
- [ ] Setup database connection
- [ ] Create data models
- [ ] Migrate existing data structure
- [ ] Update all CRUD operations
- [ ] Add database error handling
- [ ] Performance optimization

**Files to Create:**
- `models/User.js`
- `models/Flight.js`
- `models/Hotel.js`
- `models/Booking.js`
- `config/database.js`
- `migrations/`

#### 🔒 Enhanced Security
**Status:** 📋 Planned
**Priority:** High
**Estimated Time:** 1 week

**Description:** Implement comprehensive security measures

**Implementation Plan:**
```javascript
// JWT Authentication
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Rate Limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

**Tasks:**
- [ ] Implement JWT authentication
- [ ] Add rate limiting
- [ ] Input sanitization
- [ ] CSRF protection
- [ ] Security headers with Helmet
- [ ] Password strength validation
- [ ] Account lockout mechanism

#### 📧 Email Notifications
**Status:** 📋 Planned
**Priority:** Medium
**Estimated Time:** 1 week

**Description:** Send email confirmations and notifications

**Implementation Plan:**
```javascript
// Nodemailer setup
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendBookingConfirmation = async (booking, user) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Booking Confirmation - ${booking.booking_reference}`,
    html: await renderEmailTemplate('booking-confirmation', { booking, user })
  };
  
  return transporter.sendMail(mailOptions);
};
```

**Tasks:**
- [ ] Setup email service (Nodemailer/SendGrid)
- [ ] Create email templates
- [ ] Booking confirmation emails
- [ ] Payment receipt emails
- [ ] Password reset emails
- [ ] Email queue system

## 🎯 Feature Implementation Guide

### How to Add a New Feature

#### 1. Planning Phase
```markdown
## Feature: [Feature Name]
**Description:** Brief description
**User Story:** As a [user], I want [goal] so that [benefit]
**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Technical Requirements:**
- Database changes needed
- API endpoints required
- UI components needed
- Third-party integrations
```

#### 2. Database Design
```javascript
// Example: User Reviews Feature
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookable: { type: mongoose.Schema.Types.ObjectId, required: true },
  bookableType: { type: String, enum: ['Flight', 'Hotel'], required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, maxlength: 500 },
  createdAt: { type: Date, default: Date.now }
});
```

#### 3. API Design
```javascript
// RESTful API endpoints
app.get('/api/reviews/:bookableType/:bookableId', getReviews);
app.post('/api/reviews', requireAuth, createReview);
app.put('/api/reviews/:id', requireAuth, updateReview);
app.delete('/api/reviews/:id', requireAuth, deleteReview);
```

#### 4. Frontend Implementation
```javascript
// Client-side JavaScript
const submitReview = async (reviewData) => {
  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(reviewData)
    });
    
    if (response.ok) {
      showSuccess('Review submitted successfully!');
      loadReviews();
    }
  } catch (error) {
    showError('Failed to submit review');
  }
};
```

#### 5. Testing
```javascript
// Unit test example
describe('Review API', () => {
  it('should create a new review', async () => {
    const reviewData = {
      bookableId: '507f1f77bcf86cd799439011',
      bookableType: 'Hotel',
      rating: 5,
      comment: 'Great hotel!'
    };
    
    const response = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send(reviewData)
      .expect(201);
      
    expect(response.body.review.rating).toBe(5);
  });
});
```

## 🎨 UI/UX Features

### Current UI Components

#### Navigation Bar
```html
<!-- Responsive navigation with user menu -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container">
    <a class="navbar-brand" href="/">
      <i class="fas fa-plane"></i> Booking System
    </a>
    <!-- User menu, search, etc. -->
  </div>
</nav>
```

#### Search Forms
```html
<!-- AJAX-powered search forms -->
<form id="flight-search-form">
  <div class="row">
    <div class="col-md-6">
      <select name="departure_city" class="form-select" required>
        <!-- Options -->
      </select>
    </div>
    <!-- More fields -->
  </div>
</form>
```

#### Result Cards
```html
<!-- Responsive result cards -->
<div class="card">
  <div class="card-body">
    <h6 class="card-title">Flight/Hotel Name</h6>
    <p class="card-text">Details</p>
    <div class="d-flex justify-content-between">
      <span class="h5 text-primary">Price</span>
      <button class="btn btn-primary">Book Now</button>
    </div>
  </div>
</div>
```

### Planned UI Improvements

#### Dark Mode Theme
```css
/* CSS variables for theme switching */
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --primary-color: #007bff;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
  --primary-color: #4dabf7;
}
```

#### Advanced Filters
```html
<!-- Collapsible filter panel -->
<div class="collapse" id="advancedFilters">
  <div class="card card-body">
    <div class="row">
      <div class="col-md-3">
        <label>Price Range</label>
        <input type="range" class="form-range" id="priceRange">
      </div>
      <!-- More filters -->
    </div>
  </div>
</div>
```

## 🔌 API Features

### Current API Endpoints

#### Authentication
```javascript
POST /register          // User registration
POST /login             // User login
GET  /logout            // User logout
```

#### Search
```javascript
POST /search/flights    // Search flights
POST /search/hotels     // Search hotels
```

#### Bookings
```javascript
GET  /bookings          // Get user bookings
POST /bookings          // Create new booking
GET  /bookings/:id      // Get booking details
```

### Planned API Endpoints

#### Reviews
```javascript
GET    /api/reviews/:type/:id     // Get reviews for item
POST   /api/reviews               // Create review
PUT    /api/reviews/:id           // Update review
DELETE /api/reviews/:id           // Delete review
```

#### Admin
```javascript
GET    /api/admin/users           // Get all users
GET    /api/admin/bookings        // Get all bookings
GET    /api/admin/analytics       // Get analytics data
POST   /api/admin/flights         // Add new flight
PUT    /api/admin/flights/:id     // Update flight
DELETE /api/admin/flights/:id     // Delete flight
```

## 📊 Analytics Features

### Planned Analytics

#### User Analytics
```javascript
const userAnalytics = {
  totalUsers: 1250,
  activeUsers: 890,
  newUsersThisMonth: 156,
  userRetentionRate: 0.75
};
```

#### Booking Analytics
```javascript
const bookingAnalytics = {
  totalBookings: 3450,
  bookingsThisMonth: 234,
  averageBookingValue: 2500000,
  popularDestinations: ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng']
};
```

#### Revenue Analytics
```javascript
const revenueAnalytics = {
  totalRevenue: 8750000000,
  monthlyRevenue: 567000000,
  revenueByCategory: {
    flights: 0.6,
    hotels: 0.4
  }
};
```

## 🔧 Technical Features

### Performance Optimization

#### Caching Strategy
```javascript
// Redis caching
const redis = require('redis');
const client = redis.createClient();

const cacheMiddleware = (duration) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    const cached = await client.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      client.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    
    next();
  };
};
```

#### Database Optimization
```javascript
// Database indexing
db.flights.createIndex({ "departure_city": 1, "arrival_city": 1 });
db.flights.createIndex({ "departure_time": 1 });
db.hotels.createIndex({ "city": 1, "rating": -1 });
db.bookings.createIndex({ "user_id": 1, "created_at": -1 });
```

### Security Features

#### Input Validation
```javascript
const { body, validationResult } = require('express-validator');

const validateBooking = [
  body('check_in_date').isISO8601().toDate(),
  body('check_out_date').isISO8601().toDate(),
  body('passengers_count').isInt({ min: 1, max: 9 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
```

#### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 search requests per minute
  message: 'Too many search requests, please try again later.'
});

app.use('/search', searchLimiter);
```

## 📱 Mobile Features

### Responsive Design
- Bootstrap 5 grid system
- Mobile-first approach
- Touch-friendly interfaces
- Optimized for small screens

### Planned Mobile App
- React Native implementation
- Push notifications
- Offline booking capability
- Biometric authentication

## 🌐 Internationalization

### Planned i18n Support
```javascript
// i18n setup
const i18n = require('i18n');

i18n.configure({
  locales: ['en', 'vi', 'ja', 'ko'],
  directory: __dirname + '/locales',
  defaultLocale: 'vi',
  cookie: 'lang'
});

// Usage in templates
<%= __('Welcome to Booking System') %>
```

---

📝 **Note:** This document is updated regularly as new features are implemented. Check the [ROADMAP.md](ROADMAP.md) for timeline and priorities.