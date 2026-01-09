class CreateBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :bookings do |t|
      t.references :user, null: false, foreign_key: true
      t.references :bookable, polymorphic: true, null: false
      t.string :booking_reference, null: false
      t.string :status, null: false, default: 'pending'
      t.decimal :total_amount, precision: 10, scale: 2, null: false
      t.date :check_in_date, null: false
      t.date :check_out_date, null: false
      t.integer :passengers_count, default: 1
      t.text :special_requests

      t.timestamps
    end

    add_index :bookings, :booking_reference, unique: true
    add_index :bookings, :status
    add_index :bookings, [:bookable_type, :bookable_id]
  end
end