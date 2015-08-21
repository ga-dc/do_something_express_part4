$(document).ready(function() {
  List.fetch().then(function(lists) {
    lists.forEach(function(list) {
      var view = new ListView(list)
      view.render();
    })
  })
});

/* --------------------------------------- */
/*
$(document).ready(function(){
  Artist.fetch().then(function(artists){
    artists.forEach(function(artist){
      var view = new ArtistView(artist)
      view.render();
    })
  })

});

Artist.fetch = function(){
  var request = $.getJSON("http://localhost:3000/artists")
  .then(function(response) {
    var artists = []
    for(var i = 0; i < response.length; i++){
      artists.push(new Artist(response[i]))
    }
    return artists
    })
  .fail(function(response){
      console.log("js failed to load")
    })
  return request
}


*/
