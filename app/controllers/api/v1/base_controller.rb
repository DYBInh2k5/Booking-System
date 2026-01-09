class Api::V1::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user_from_token!
  
  respond_to :json
  
  private
  
  def authenticate_user_from_token!
    # Simple token authentication for API
    # In production, use proper JWT or OAuth
    return unless request.headers['Authorization'].present?
    
    token = request.headers['Authorization'].split(' ').last
    user = User.find_by(authentication_token: token) if token
    
    if user
      sign_in user, store: false
    else
      render json: { error: 'Invalid token' }, status: :unauthorized
    end
  end
end