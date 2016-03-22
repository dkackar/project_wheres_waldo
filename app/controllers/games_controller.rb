class GamesController < ApplicationController

  def new
    @game = Game.new
  end 

  def create

    @game = Game.new( game_params )


    if @game.save
      flash[:success] = "Game successfully created!"

      respond_to do |format|

        format.html { redirect_to games_path }

        format.json { render  json: @game, status: :created }
      end

    else
      flash.now[:error] = "Game could not be created"

      respond_to do |format|

        format.html { render :new }

        format.json { render nothing: true, status: 400 } 
        format.js { render :new }

      end

    end


  end 

  def index

  end  

  private

  def game_params
    params.require(:game).permit(:name, :xcoord, :ycoord)
  end

end

