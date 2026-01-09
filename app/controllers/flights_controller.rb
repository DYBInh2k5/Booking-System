class FlightsController < ApplicationController
  before_action :set_flight, only: [:show]
  
  def index
    @flights = Flight.available.order(:departure_time)
    
    # Apply filters if present
    if params[:departure_city].present? && params[:arrival_city].present?
      @flights = @flights.by_route(params[:departure_city], params[:arrival_city])
    end
    
    if params[:departure_date].present?
      @flights = @flights.by_date(Date.parse(params[:departure_date]))
    end
  end
  
  def show
  end
  
  private
  
  def set_flight
    @flight = Flight.find(params[:id])
  end
end