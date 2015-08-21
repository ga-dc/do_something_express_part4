$(document).ready(function(){
  List.fetch().then(function(lists){
    lists.forEach(function(list){
      var view = new ListView(list);
      view.render();
    })
  })
});
