class TagsController < ApplicationController
  
  def new
    @tag = Tag.new
  end 

  def create

    @tag = Tag.new( tag_params )
    @tag.character_id = Character.find_by_name(params["name"]).id;

    if @tag.save
      flash[:success] = "tag_params successfully created!"

      respond_to do |format|

        format.html { redirect_to tags_path }

        format.json { render  json: @tag, status: :created }
      end

    else
      flash.now[:error] = "Tag could not be created"

      respond_to do |format|

        format.html { render :new }

        format.json { render nothing: true, status: 400 } 
        format.js { render :new }

      end

    end

  end 

  def index
    @tags = Tags.all

    respond_to do |format|

      format.html

      format.json {render json: @tags}

    end
  end  


  def tagged_check
    
    character_id = Character.find_by_name(params["name"]).id
    xcoord = params["xcoord"]
    ycoord = params["ycoord"]

    tag_x = Tag.find_by_character_id(character_id).xcoord
    tag_y = Tag.find_by_character_id(character_id).ycoord

    if Tag.check_valid_tag(xcoord,ycoord,tag_x,tag_y)

      respond_to do |format|

        format.html { redirect_to game_path }
  
        format.json { render  json: true, status: :created }
      end

    else
      flash.now[:error] = "Not Valid"

      respond_to do |format|

        format.html { render :new }

        format.json { render nothing: true, status: 400 } 
      end
    end
  end

  private

  def tag_params
    puts "The GOT params are #{params}" 
    params.require(:tag).permit(:xcoord, :ycoord, :name)
  end

end