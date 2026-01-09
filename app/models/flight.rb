class Flight < ApplicationRecord
  has_many :bookings, as: :bookable, dependent: :destroy
  
  validates :flight_number, presence: true, uniqueness: true
  validates :airline, :departure_city, :arrival_city, presence: true
  validates :departure_time, :arrival_time, presence: true
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :available_seats, presence: true, numericality: { greater_than_or_equal_to: 0 }
  
  scope :available, -> { where('available_seats > 0') }
  scope :by_route, ->(from, to) { where(departure_city: from, arrival_city: to) }
  scope :by_date, ->(date) { where('DATE(departure_time) = ?', date) }
  
  def duration
    return nil unless departure_time && arrival_time
    ((arrival_time - departure_time) / 1.hour).round(2)
  end
  
  def available?
    available_seats > 0
  end
  
  def book_seat!
    return false unless available?
    decrement!(:available_seats)
    true
  end
end