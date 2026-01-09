class Api::V1::FlightsController < Api::V1::BaseController
  def index
    @flights = Flight.available
    
    # Apply filters
    @flights = @flights.by_route(params[:from], params[:to]) if params[:from] && params[:to]
    @flights = @flights.by_date(Date.parse(params[:date])) if params[:date]
    
    @flights = @flights.order(:departure_time)
    
    render json: {
      flights: @flights.map do |flight|
        {
          id: flight.id,
          flight_number: flight.flight_number,
          airline: flight.airline,
          departure_city: flight.departure_city,
          arrival_city: flight.arrival_city,
          departure_time: flight.departure_time,
          arrival_time: flight.arrival_time,
          duration: flight.duration,
          price: flight.price,
          available_seats: flight.available_seats
        }
      end
    }
  end
  
  def show
    @flight = Flight.find(params[:id])
    render json: @flight
  end
end