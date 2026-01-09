class Api::V1::HotelsController < Api::V1::BaseController
  def index
    @hotels = Hotel.available
    
    # Apply filters
    @hotels = @hotels.by_city(params[:city]) if params[:city]
    @hotels = @hotels.by_rating(params[:min_rating].to_i) if params[:min_rating]
    
    @hotels = @hotels.order(:name)
    
    render json: {
      hotels: @hotels.map do |hotel|
        {
          id: hotel.id,
          name: hotel.name,
          city: hotel.city,
          address: hotel.address,
          price_per_night: hotel.price_per_night,
          available_rooms: hotel.available_rooms,
          rating: hotel.rating,
          description: hotel.description
        }
      end
    }
  end
  
  def show
    @hotel = Hotel.find(params[:id])
    render json: @hotel
  end
end