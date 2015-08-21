$(document).ready(function(){
  $.ajax({
    url: "/lists",
    method: "get"
  })

  .then(function(lists){
    for(var i = 0; i <lists.length; i++){
      var list = lists[i]
      var $el = $("<div class='list'>" + list.title + "</div>")
      
      $("main").append($el)
    }
  });
});