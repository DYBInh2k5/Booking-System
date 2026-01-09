class CreateFlights < ActiveRecord::Migration[7.0]
  def change
    create_table :flights do |t|
      t.string :flight_number, null: false
      t.string :airline, null: false
      t.string :departure_city, null: false
      t.string :arrival_city, null: false
      t.datetime :departure_time, null: false
      t.datetime :arrival_time, null: false
      t.decimal :price, precision: 10, scale: 2, null: false
      t.integer :available_seats, null: false, default: 0
      t.text :description

      t.timestamps
    end

    add_index :flights, :flight_number, unique: true
    add_index :flights, [:departure_city, :arrival_city]
    add_index :flights, :departure_time
  end
end