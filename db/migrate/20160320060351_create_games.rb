class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :player_id
      t.integer :score
      t.integer :playtime
      t.timestamps null: false
    end
  end
end
