class CreateHotels < ActiveRecord::Migration[7.0]
  def change
    create_table :hotels do |t|
      t.string :name, null: false
      t.string :city, null: false
      t.string :address, null: false
      t.decimal :price_per_night, precision: 10, scale: 2, null: false
      t.integer :available_rooms, null: false, default: 0
      t.integer :rating
      t.text :description
      t.text :amenities

      t.timestamps
    end

    add_index :hotels, :city
    add_index :hotels, :rating
  end
end