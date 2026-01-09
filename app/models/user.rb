class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :bookings, dependent: :destroy
  
  validates :first_name, :last_name, presence: true
  validates :phone, presence: true, format: { with: /\A[\+]?[1-9][\d]{0,15}\z/ }
  
  before_create :generate_authentication_token
  
  def full_name
    "#{first_name} #{last_name}"
  end
  
  private
  
  def generate_authentication_token
    self.authentication_token = SecureRandom.hex(20)
  end
end