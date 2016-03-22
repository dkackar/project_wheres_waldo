class CharactersController < ApplicationController

  def index
    @characters = Character.all

    respond_to do |format|

      format.html

      format.json {render json: @characters}

    end
  end  

end
