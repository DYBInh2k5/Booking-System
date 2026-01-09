class HotelsController < ApplicationController
  before_action :set_hotel, only: [:show]
  
  def index
    @hotels = Hotel.available.order(:name)
    
    # Apply filters if present
    if params[:city].present?
      @hotels = @hotels.by_city(params[:city])
    end
    
    if params[:min_rating].present?
      @hotels = @hotels.by_rating(params[:min_rating].to_i)
    end
  end
  
  def show
  end
  
  private
  
  def set_hotel
    @hotel = Hotel.find(params[:id])
  end
end