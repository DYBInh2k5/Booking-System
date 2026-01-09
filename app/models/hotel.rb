class Hotel < ApplicationRecord
  has_many :bookings, as: :bookable, dependent: :destroy
  
  validates :name, :city, :address, presence: true
  validates :price_per_night, presence: true, numericality: { greater_than: 0 }
  validates :available_rooms, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :rating, numericality: { in: 1..5 }, allow_nil: true
  
  scope :available, -> { where('available_rooms > 0') }
  scope :by_city, ->(city) { where(city: city) }
  scope :by_rating, ->(min_rating) { where('rating >= ?', min_rating) }
  
  def available?
    available_rooms > 0
  end
  
  def book_room!
    return false unless available?
    decrement!(:available_rooms)
    true
  end
  
  def total_price(nights)
    price_per_night * nights
  end
end