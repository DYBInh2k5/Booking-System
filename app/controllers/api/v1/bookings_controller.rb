class Api::V1::BookingsController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_booking, only: [:show]
  
  def index
    @bookings = current_user.bookings.includes(:bookable).order(created_at: :desc)
    
    render json: {
      bookings: @bookings.map do |booking|
        {
          id: booking.id,
          booking_reference: booking.booking_reference,
          status: booking.status,
          total_amount: booking.total_amount,
          check_in_date: booking.check_in_date,
          check_out_date: booking.check_out_date,
          bookable_type: booking.bookable_type,
          bookable: booking.bookable,
          created_at: booking.created_at
        }
      end
    }
  end
  
  def show
    render json: @booking
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
    
    if @booking.save && @booking.confirm!
      render json: { booking: @booking, message: 'Booking created successfully' }, status: :created
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
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