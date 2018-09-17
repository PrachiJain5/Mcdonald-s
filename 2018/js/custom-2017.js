var videos_selected = [];
var video_names = [];
video_names[1] = "What's Changing";
video_names[2] = "How Account-Based Plans Work";
video_names[3] = "How To Choose Your Medical Plan";

var bc_id = [];
bc_id[1] = "4653344172001";
bc_id[2] = "4653334682001";
bc_id[3] = "4653388478001";

$(document).ready(function() {
  
  $('#video-1').click(function() {
    $('#lightbox').fadeIn(400, function() {
      videos_selected = [1,2,3];
      $('#lightbox-panel').css('top', 0);
      playlist();
      BCLS.loadFirstVideo();
    });
  });

  $('#video-2').click(function() {
    $('#lightbox').fadeIn(400, function() {
      videos_selected = [2,3,1];
      $('#lightbox-panel').css('top', 0);
      playlist();
      BCLS.loadFirstVideo();
    });
  });

  $('#video-3').click(function() {
    $('#lightbox').fadeIn(400, function() {
      videos_selected = [3,1,2];
      $('#lightbox-panel').css('top', 0);
      playlist();
      BCLS.loadFirstVideo();
    });
  });

  $('#close-panel').click(function() {
    $('#lightbox-panel').css('top', -9999);
    $('#lightbox').fadeOut(400);
    window.location.reload();
  });

});