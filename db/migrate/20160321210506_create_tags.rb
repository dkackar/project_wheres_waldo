class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :character_id
      t.integer :xcoord
      t.integer :ycoord
      t.integer :board_id
      t.timestamps null: false
    end
  end
end
