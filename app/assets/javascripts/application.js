$(document).ready(function() {
	$.getJSON("/lists")
	.then(function(response) {
			for(var i = 0; i < response.length; i++) {
				$("main").append("<h2>" + response[i].title + "<h2>")
			}
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
*/
