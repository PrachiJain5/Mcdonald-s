function playlist() {
  var $names = '';
  var $name = '';
  var total_selected = videos_selected.length;
  for (count = 0; count < total_selected; count++) {
    $name = '<li><a onClick = "loadOne(' + count + ')" href = "#">' + video_names[videos_selected[count]] + '</a></li>';
    $names = $names + $name;
  }
  document.getElementById('playlist').innerHTML = $names;
}
function morethanzero() {
  if (videos_selected.length < 1) {
    alert('No videos have been selected. Select video(s) and retry.');
    return false;
  } 
  else
  return true;
}
function togglevid(id, lang) {
  var added = 'Added';
  var new_array = new Array();
  var found = 0;
  var x = 0;
  var total_selected = videos_selected.length;
  if (lang == 2) {
    added = 'Añadido';
  }
  for (count = 0; count < total_selected; count++) {
    if (videos_selected[count] != id) {
      new_array[x] = videos_selected[count];
      x++;
    } else {
      found = 1;
    }
  }
  if (found == 0) {
    new_array[count] = id;
    document.getElementById('video' + id).innerHTML = added;
  } else {
    document.getElementById('video' + id).innerHTML = '';
  }
  videos_selected = new_array;
}
