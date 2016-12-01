class CreateBookings < ActiveRecord::Migration[5.0]
  def change
    create_table :bookings do |t|
      t.references :session, foreign_key: true
      t.references :attendee, foreign_key: true

      t.timestamps
    end
  end
end
