class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :bookable, polymorphic: true
  
  validates :booking_reference, presence: true, uniqueness: true
  validates :status, presence: true, inclusion: { in: %w[pending confirmed cancelled] }
  validates :total_amount, presence: true, numericality: { greater_than: 0 }
  validates :check_in_date, presence: true
  validates :check_out_date, presence: true
  
  validate :check_out_after_check_in
  
  before_validation :generate_booking_reference, on: :create
  
  scope :confirmed, -> { where(status: 'confirmed') }
  scope :pending, -> { where(status: 'pending') }
  scope :cancelled, -> { where(status: 'cancelled') }
  
  def confirm!
    return false unless pending?
    
    ActiveRecord::Base.transaction do
      if bookable.respond_to?(:book_seat!)
        success = bookable.book_seat!
      elsif bookable.respond_to?(:book_room!)
        success = bookable.book_room!
      else
        success = false
      end
      
      if success
        update!(status: 'confirmed')
        true
      else
        false
      end
    end
  end
  
  def cancel!
    return false unless confirmed?
    update!(status: 'cancelled')
    # Logic to return seat/room to available inventory
    true
  end
  
  def nights
    return 0 unless check_in_date && check_out_date
    (check_out_date - check_in_date).to_i
  end
  
  private
  
  def generate_booking_reference
    self.booking_reference = "BK#{Time.current.strftime('%Y%m%d')}#{SecureRandom.hex(4).upcase}"
  end
  
  def check_out_after_check_in
    return unless check_in_date && check_out_date
    errors.add(:check_out_date, 'must be after check-in date') if check_out_date <= check_in_date
  end
end