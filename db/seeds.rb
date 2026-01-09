# Create sample flights
flights_data = [
  {
    flight_number: "VN101",
    airline: "Vietnam Airlines",
    departure_city: "Hà Nội",
    arrival_city: "Hồ Chí Minh",
    departure_time: 2.days.from_now.change(hour: 8, min: 0),
    arrival_time: 2.days.from_now.change(hour: 10, min: 30),
    price: 2500000,
    available_seats: 150
  },
  {
    flight_number: "VJ201",
    airline: "VietJet Air",
    departure_city: "Hồ Chí Minh",
    arrival_city: "Đà Nẵng",
    departure_time: 1.day.from_now.change(hour: 14, min: 0),
    arrival_time: 1.day.from_now.change(hour: 15, min: 30),
    price: 1800000,
    available_seats: 180
  },
  {
    flight_number: "BB301",
    airline: "Bamboo Airways",
    departure_city: "Đà Nẵng",
    arrival_city: "Hà Nội",
    departure_time: 3.days.from_now.change(hour: 16, min: 0),
    arrival_time: 3.days.from_now.change(hour: 17, min: 45),
    price: 2200000,
    available_seats: 120
  }
]

flights_data.each do |flight_attrs|
  Flight.find_or_create_by(flight_number: flight_attrs[:flight_number]) do |flight|
    flight.assign_attributes(flight_attrs)
  end
end

# Create sample hotels
hotels_data = [
  {
    name: "Khách sạn Metropole Hà Nội",
    city: "Hà Nội",
    address: "15 Ngô Quyền, Hoàn Kiếm, Hà Nội",
    price_per_night: 3500000,
    available_rooms: 25,
    rating: 5,
    description: "Khách sạn sang trọng 5 sao tại trung tâm Hà Nội"
  },
  {
    name: "Rex Hotel Sài Gòn",
    city: "Hồ Chí Minh",
    address: "141 Nguyễn Huệ, Quận 1, TP.HCM",
    price_per_night: 2800000,
    available_rooms: 30,
    rating: 4,
    description: "Khách sạn lịch sử tại trung tâm Sài Gòn"
  },
  {
    name: "Fusion Maia Resort",
    city: "Đà Nẵng",
    address: "Trường Sa, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng",
    price_per_night: 4200000,
    available_rooms: 15,
    rating: 5,
    description: "Resort spa cao cấp bên bờ biển Đà Nẵng"
  }
]

hotels_data.each do |hotel_attrs|
  Hotel.find_or_create_by(name: hotel_attrs[:name]) do |hotel|
    hotel.assign_attributes(hotel_attrs)
  end
end

puts "Đã tạo #{Flight.count} chuyến bay và #{Hotel.count} khách sạn mẫu"