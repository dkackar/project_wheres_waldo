var GameModule = ( function(){

  var characters     = ".characters";
  var photoContainer = "#photo-container";
  var board          = ".board"
  var tagContainer   = "#tag-container";
  var photoImage     = "img";
  var showList       = true;
  var xPos;
  var yPos;
  var ajaxResponse = [];

  function _getCharactersJSON() {
    
    $.ajax({
      url: "http://localhost:3000/characters",
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function(characterList) {
        _buildTagList(characterList) ;
      },
      error: function() {
        alert("Big Time Error! No Games for you dum-dum");
      },
      complete: function() {
        console.log("complete");
      }
    });
  }

  function _buildTagList(characterList) {

    for (var i = 0; i < characterList.length; i++) {
      var name = characterList[i].name
      var element = '<li id="' + name + '" ' + 'class="character">' + '<a href="#">' + name + '</a></li>' 
      $("ul").append(element);
    }
  }

  function _postTaggedInfo(el) {
    var text = $el.text();
    tagdata = {xcoord: xPos, ycoord: yPos, name:text}
    tagdata = JSON.stringify(tagdata);
    $.ajax({
      url: "/tagged_check",
      type: "POST",
      data: tagdata,
      contentType: "application/json",
      dataType: "json",
      success: function() { 
        _displayMessage(true);
        $el.remove();
        _checkGameStatus();
      },
      error: function() {
        _displayMessage(false);
      }
    });
  }

  function _displayMessage(found) {

    var getWidth = $(tagContainer).width();
    var styles = {
      "position": "absolute",
      "left": xPos,
      "top": yPos,
      "font-size": "100px",
      "color": "red"
    };
    if (found) { 
      var tag = '<div id="msg"> <strong>Correct!</strong></div>';
      msg = "Correct!"
    } else {
      var tag = '<div id="msg"> <strong>Try Again!</strong></div>';
      msg = "Try Again!"
    } 
    var $htmlTag = $(tag).css(styles);
    alert(msg);
    $htmlTag.appendTo(photoContainer).fadeOut(2500,$htmlTag.remove());
  }

  function _hideList() {
    $(characters).hide();
  }

  function _showList() {
    $(characters).show();
  }

  function _unbindMouseMove() {
    $(board).bind('mousemove');
  }

  function _tagPhoto() {
    $(board).on("click",function(e){
      if (showList) {
        $el = $(e.target);
        xPos = e.pageX;
        yPos = e.pageY;
        _showCharacterList();
        $(board).unbind('mousemove');
        showList = false;
      } else {
        showList = true;
        _tagMove();
        _hideList();
      }    
    })
  }

  function _characterClick() {
    $(".characters").click(function(e) {
      $el = $(e.target);
      _postTaggedInfo($el);
    });
  }

  function _captionPhoto(x,y,val) {
    var getWidth = $(tagContainer).width();
    var styles = {
      "position": "absolute",
      "left": x - (getWidth / 4),
      "top": y + 5,
      "font-size": "30px"
    };

    var tag = '<div' + ' id="' + val + '">' + "<strong>" + val + "</strong></div>";
    var $htmlTag = $(tag).css(styles);
    $htmlTag.appendTo(photoContainer);
  }

  function _showCharacterList() {
    var getWidth = $(tagContainer).width();
    var styles = {
     "left": xPos - getWidth / 2,
     "top": yPos + getWidth / 2
    };

    $(characters).css(styles);
    _showList();
  }

  function _tagMove() {
  
    var getWidth = $(tagContainer).width();
    $(board).mousemove(function(event){

      var x = event.pageX;
      var y = event.pageY;

      var styles = {
        "left": x - getWidth / 2,
        "top": y - getWidth / 2
      };

      $(tagContainer).css(styles);

    } );
  }

  function _tagMoveStop() {
  
    $(board).mousemove(function(event){

      var x = event.pageX;
      var y = event.pageY;

      var styles = {
        "left": x - getWidth / 2,
        "top": y - getWidth / 2
      };

      $(tagContainer).css(styles);

    } );
  }

  function _tagHover() {

    var getWidth = $(tagContainer).width();

    $(board).hover(

      function() {
        $(tagContainer).show();

      },
      function() {
        $(tagContainer).hide();
      } 
    );
  }  

  function _init() {
    _getCharactersJSON(); // Get a list of characters from the DB
    _hideList();
    _tagPhoto();
    _tagHover();
    _tagMove();
    _characterClick();
  }

  return {
    init: _init
  };

})();

$(document).ready(function( ){
  if ( $("div").data("controller") === 'games' ) {
      GameModule.init();
  }    
});
