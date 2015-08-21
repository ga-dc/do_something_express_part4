$(document).ready(function(){
  List.fetch().then(function(lists){
    artists.forEach(function(artist){
      var view = new ListView(list);
      view.render();
    })
  })

});
