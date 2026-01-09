require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module BookingSystem
  class Application < Rails::Application
    config.load_defaults 7.0
    config.time_zone = 'Asia/Ho_Chi_Minh'
    
    # Configuration for the application
    config.generators do |g|
      g.test_framework :rspec
      g.factory_bot dir: 'spec/factories'
    end
  end
end