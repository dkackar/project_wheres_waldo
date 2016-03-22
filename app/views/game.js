
var GameModule = ( function(){

  var characters     = ".characters";
  var photoContainer = "#photo-container";
  var board          = ".board"
  var tagContainer   = "#tag-container";
  var photoImage     = "img";
  var showList       = true;

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
        var x = e.pageX;
        var y = e.pageY;
        _showCharacterList(x,y);
        console.log("Hello")
        _characterClick();
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
    $(".character").click(function(e) {
      $el = $(e.target);
      $el.remove();
    });
  }

  function _showCharacterList(x,y) {
      var getWidth = $(tagContainer).width();
      var styles = {
       "left": x - getWidth / 2,
       "top": y + getWidth / 2
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
    _hideList();
    _tagPhoto();
    _tagHover();
    _tagMove();
  }

  return {
    init: _init
  };

})();

$(document).ready(function( ){
  GameModule.init();
});
