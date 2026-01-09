Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  
  # API routes for AJAX requests
  namespace :api do
    namespace :v1 do
      resources :flights, only: [:index, :show]
      resources :hotels, only: [:index, :show]
      resources :bookings, only: [:create, :show, :index]
    end
  end
  
  # Web routes
  resources :flights, only: [:index, :show]
  resources :hotels, only: [:index, :show]
  resources :bookings, only: [:new, :create, :show, :index]
  
  # Search routes
  get 'search', to: 'search#index'
  post 'search/flights', to: 'search#flights'
  post 'search/hotels', to: 'search#hotels'
end