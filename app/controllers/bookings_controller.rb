class BookingsController < ApplicationController
  before_action :set_booking, only: [:show]
  
  def index
    @bookings = current_user.bookings.includes(:bookable).order(created_at: :desc)
  end
  
  def show
  end
  
  def new
    @bookable = find_bookable
    @booking = current_user.bookings.build
  end
  
  def create
    @bookable = find_bookable
    @booking = current_user.bookings.build(booking_params)
    @booking.bookable = @bookable
    
    # Calculate total amount
    if @bookable.is_a?(Flight)
      @booking.total_amount = @bookable.price
    elsif @bookable.is_a?(Hotel)
      nights = (@booking.check_out_date - @booking.check_in_date).to_i
      @booking.total_amount = @bookable.total_price(nights)
    end
    
    if @booking.save
      # In a real application, you would integrate with a payment gateway here
      if @booking.confirm!
        redirect_to @booking, notice: 'Đặt chỗ thành công!'
      else
        @booking.destroy
        redirect_to @bookable, alert: 'Không thể đặt chỗ. Vui lòng thử lại.'
      end
    else
      render :new
    end
  end
  
  private
  
  def set_booking
    @booking = current_user.bookings.find(params[:id])
  end
  
  def find_bookable
    if params[:flight_id]
      Flight.find(params[:flight_id])
    elsif params[:hotel_id]
      Hotel.find(params[:hotel_id])
    end
  end
  
  def booking_params
    params.require(:booking).permit(:check_in_date, :check_out_date, :passengers_count, :special_requests)
  end
end