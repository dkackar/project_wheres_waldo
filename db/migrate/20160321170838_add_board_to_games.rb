class AddBoardToGames < ActiveRecord::Migration
  def change
    add_column :games, :board_id, :integer
  end
end
