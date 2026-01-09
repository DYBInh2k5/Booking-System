class HomeController < ApplicationController
  def index
    @featured_flights = Flight.available.limit(6)
    @featured_hotels = Hotel.available.limit(6)
  end
end