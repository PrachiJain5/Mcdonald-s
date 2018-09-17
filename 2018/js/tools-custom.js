var myPlayer
function changeVideo(videoId,check,image) {
  myPlayer.catalog.getVideo(videoId, function(error,video){
    myPlayer.catalog.load(video)
    var name = myPlayer.mediainfo.name
    $('#playerLightbox').removeClass('playerHide').addClass('playerShow')
    $('#lightboxBg').show()
    $('body').addClass('lightbox-open')
    $('#video-title').html(name)
    myPlayer.play()
  })
  if (check === 'y') {
    myPlayer.on('ended', function () {
      $('.end-link img').attr('src','img/' + image + '.jpg')
      $('.end-link').show()
      return
    })
  } else {
    myPlayer.on('ended', function() {
      playerClose()
    })
  }
}
function playerClose() {
  myPlayer.pause()
  $('#playerLightbox').removeClass('playerShow').addClass('playerHide')
  $('#lightboxBg, .end-link').hide()
  $('.end-link img').attr('src', '')
  $('body').removeClass('lightbox-open')
}
videojs("myPlayerID").ready(function() {
  myPlayer = this
})
$('#lightboxBg').on('click', function() {
  playerClose()
})