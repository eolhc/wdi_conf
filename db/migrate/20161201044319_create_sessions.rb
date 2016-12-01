class CreateSessions < ActiveRecord::Migration[5.0]
  def change
    create_table :sessions do |t|
      t.string :speaker_name
      t.text :speaker_desc
      t.string :talk_title
      t.text :talk_desc
      t.string :talk_genre
      t.integer :talk_time
      t.string :speaker_img
      t.string :venue
      t.integer :seats
      t.text :social_media

      t.timestamps
    end
  end
end
