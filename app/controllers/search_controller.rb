class SearchController < ApplicationController
  def index
    # Main search page
  end
  
  def flights
    @flights = Flight.available
    
    if params[:departure_city].present?
      @flights = @flights.by_route(params[:departure_city], params[:arrival_city])
    end
    
    if params[:departure_date].present?
      @flights = @flights.by_date(Date.parse(params[:departure_date]))
    end
    
    @flights = @flights.order(:departure_time)
    
    respond_to do |format|
      format.html { render partial: 'flights_results' }
      format.json { render json: @flights }
    end
  end
  
  def hotels
    @hotels = Hotel.available
    
    if params[:city].present?
      @hotels = @hotels.by_city(params[:city])
    end
    
    if params[:min_rating].present?
      @hotels = @hotels.by_rating(params[:min_rating].to_i)
    end
    
    @hotels = @hotels.order(:name)
    
    respond_to do |format|
      format.html { render partial: 'hotels_results' }
      format.json { render json: @hotels }
    end
  end
end