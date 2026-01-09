const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'booking-system-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Express-ejs-layouts alternative - simple layout function
app.use((req, res, next) => {
  const originalRender = res.render;
  res.render = function(view, options = {}) {
    if (view.startsWith('partials/')) {
      return originalRender.call(this, view, options);
    }
    
    const fs = require('fs');
    const layoutPath = path.join(__dirname, 'views', 'layout.ejs');
    
    originalRender.call(this, view, options, (err, html) => {
      if (err) return next(err);
      
      fs.readFile(layoutPath, 'utf8', (err, layout) => {
        if (err) return next(err);
        
        const finalHtml = layout.replace('<%- body %>', html);
        res.send(finalHtml);
      });
    });
  };
  next();
});

// In-memory database (for demo purposes)
let users = [];
let flights = [
  {
    id: 1,
    flight_number: "VN101",
    airline: "Vietnam Airlines",
    departure_city: "Hà Nội",
    arrival_city: "Hồ Chí Minh",
    departure_time: moment().add(2, 'days').hour(8).minute(0).toDate(),
    arrival_time: moment().add(2, 'days').hour(10).minute(30).toDate(),
    price: 2500000,
    available_seats: 150
  },
  {
    id: 2,
    flight_number: "VJ201",
    airline: "VietJet Air",
    departure_city: "Hồ Chí Minh",
    arrival_city: "Đà Nẵng",
    departure_time: moment().add(1, 'day').hour(14).minute(0).toDate(),
    arrival_time: moment().add(1, 'day').hour(15).minute(30).toDate(),
    price: 1800000,
    available_seats: 180
  },
  {
    id: 3,
    flight_number: "BB301",
    airline: "Bamboo Airways",
    departure_city: "Đà Nẵng",
    arrival_city: "Hà Nội",
    departure_time: moment().add(3, 'days').hour(16).minute(0).toDate(),
    arrival_time: moment().add(3, 'days').hour(17).minute(45).toDate(),
    price: 2200000,
    available_seats: 120
  }
];

let hotels = [
  {
    id: 1,
    name: "Khách sạn Metropole Hà Nội",
    city: "Hà Nội",
    address: "15 Ngô Quyền, Hoàn Kiếm, Hà Nội",
    price_per_night: 3500000,
    available_rooms: 25,
    rating: 5,
    description: "Khách sạn sang trọng 5 sao tại trung tâm Hà Nội"
  },
  {
    id: 2,
    name: "Rex Hotel Sài Gòn",
    city: "Hồ Chí Minh",
    address: "141 Nguyễn Huệ, Quận 1, TP.HCM",
    price_per_night: 2800000,
    available_rooms: 30,
    rating: 4,
    description: "Khách sạn lịch sử tại trung tâm Sài Gòn"
  },
  {
    id: 3,
    name: "Fusion Maia Resort",
    city: "Đà Nẵng",
    address: "Trường Sa, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng",
    price_per_night: 4200000,
    available_rooms: 15,
    rating: 5,
    description: "Resort spa cao cấp bên bờ biển Đà Nẵng"
  }
];

let bookings = [];

// Helper functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

function formatDateTime(date) {
  return moment(date).format('DD/MM/YYYY HH:mm');
}

function generateBookingReference() {
  return `BK${moment().format('YYYYMMDD')}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
}

// Middleware to check authentication
function requireAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Routes
app.get('/', (req, res) => {
  res.render('home', {
    user: req.session.user,
    featured_flights: flights.slice(0, 3),
    featured_hotels: hotels.slice(0, 3),
    formatCurrency,
    formatDateTime
  });
});

app.get('/search', (req, res) => {
  res.render('search', {
    user: req.session.user
  });
});

app.post('/search/flights', (req, res) => {
  let results = flights.filter(flight => flight.available_seats > 0);
  
  if (req.body.departure_city && req.body.arrival_city) {
    results = results.filter(flight => 
      flight.departure_city === req.body.departure_city && 
      flight.arrival_city === req.body.arrival_city
    );
  }
  
  if (req.body.departure_date) {
    const searchDate = moment(req.body.departure_date).format('YYYY-MM-DD');
    results = results.filter(flight => 
      moment(flight.departure_time).format('YYYY-MM-DD') === searchDate
    );
  }
  
  res.render('partials/flights_results', {
    flights: results,
    formatCurrency,
    formatDateTime
  });
});

app.post('/search/hotels', (req, res) => {
  let results = hotels.filter(hotel => hotel.available_rooms > 0);
  
  if (req.body.city) {
    results = results.filter(hotel => hotel.city === req.body.city);
  }
  
  if (req.body.min_rating) {
    results = results.filter(hotel => hotel.rating >= parseInt(req.body.min_rating));
  }
  
  res.render('partials/hotels_results', {
    hotels: results,
    formatCurrency
  });
});

app.get('/register', (req, res) => {
  res.render('auth/register', { error: null });
});

app.post('/register', async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;
  
  // Check if user exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.render('auth/register', { error: 'Email đã được sử dụng' });
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create user
  const user = {
    id: users.length + 1,
    first_name,
    last_name,
    email,
    phone,
    password: hashedPassword
  };
  
  users.push(user);
  req.session.user = { id: user.id, first_name, last_name, email };
  res.redirect('/');
});

app.get('/login', (req, res) => {
  res.render('auth/login', { error: null });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email);
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.render('auth/login', { error: 'Email hoặc mật khẩu không đúng' });
  }
  
  req.session.user = { 
    id: user.id, 
    first_name: user.first_name, 
    last_name: user.last_name, 
    email: user.email 
  };
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/bookings/new', requireAuth, (req, res) => {
  const { flight_id, hotel_id } = req.query;
  let bookable = null;
  
  if (flight_id) {
    bookable = flights.find(f => f.id == flight_id);
  } else if (hotel_id) {
    bookable = hotels.find(h => h.id == hotel_id);
  }
  
  if (!bookable) {
    return res.redirect('/search');
  }
  
  res.render('bookings/new', {
    user: req.session.user,
    bookable,
    type: flight_id ? 'flight' : 'hotel',
    formatCurrency,
    formatDateTime
  });
});

app.post('/bookings', requireAuth, (req, res) => {
  const { flight_id, hotel_id, check_in_date, check_out_date, passengers_count, special_requests } = req.body;
  
  let bookable = null;
  let type = '';
  
  if (flight_id) {
    bookable = flights.find(f => f.id == flight_id);
    type = 'flight';
  } else if (hotel_id) {
    bookable = hotels.find(h => h.id == hotel_id);
    type = 'hotel';
  }
  
  if (!bookable) {
    return res.redirect('/search');
  }
  
  // Calculate total amount
  let total_amount = 0;
  let nights = 0;
  
  if (type === 'flight') {
    total_amount = bookable.price * (passengers_count || 1);
  } else {
    const checkin = moment(check_in_date);
    const checkout = moment(check_out_date);
    nights = checkout.diff(checkin, 'days');
    total_amount = bookable.price_per_night * nights;
  }
  
  // Create booking
  const booking = {
    id: bookings.length + 1,
    user_id: req.session.user.id,
    bookable_id: bookable.id,
    bookable_type: type,
    booking_reference: generateBookingReference(),
    status: 'confirmed',
    total_amount,
    check_in_date,
    check_out_date,
    passengers_count: passengers_count || 1,
    special_requests,
    nights,
    created_at: new Date()
  };
  
  bookings.push(booking);
  
  // Update availability
  if (type === 'flight') {
    bookable.available_seats -= (passengers_count || 1);
  } else {
    bookable.available_rooms -= 1;
  }
  
  res.redirect(`/bookings/${booking.id}`);
});

app.get('/bookings/:id', requireAuth, (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id && b.user_id == req.session.user.id);
  
  if (!booking) {
    return res.redirect('/bookings');
  }
  
  let bookable = null;
  if (booking.bookable_type === 'flight') {
    bookable = flights.find(f => f.id == booking.bookable_id);
  } else {
    bookable = hotels.find(h => h.id == booking.bookable_id);
  }
  
  res.render('bookings/show', {
    user: req.session.user,
    booking,
    bookable,
    formatCurrency,
    formatDateTime
  });
});

app.get('/bookings', requireAuth, (req, res) => {
  const userBookings = bookings.filter(b => b.user_id == req.session.user.id);
  
  // Attach bookable objects
  const bookingsWithDetails = userBookings.map(booking => {
    let bookable = null;
    if (booking.bookable_type === 'flight') {
      bookable = flights.find(f => f.id == booking.bookable_id);
    } else {
      bookable = hotels.find(h => h.id == booking.bookable_id);
    }
    return { ...booking, bookable };
  });
  
  res.render('bookings/index', {
    user: req.session.user,
    bookings: bookingsWithDetails,
    formatCurrency,
    formatDateTime
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Hệ thống đặt chỗ đang chạy tại http://localhost:${PORT}`);
  console.log(`📱 Truy cập ứng dụng để bắt đầu sử dụng!`);
});