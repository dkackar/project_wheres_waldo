class Tag < ActiveRecord::Base
  has_one :character


  def self.check_valid_tag(xcoord,ycoord,xTag,yTag)
    if (xcoord >= xTag - 5 && xcoord <= xTag+5) 
      if (ycoord >= yTag - 5 && ycoord <= yTag+5)
          puts "Tag is Valid"  
          return true
       end
    end
    puts "Tag is not valid"
    return false       
  end  
end
