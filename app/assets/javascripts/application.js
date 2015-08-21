$(document).ready(function(){
  $.ajax({
  url: "/lists",
  method: "get",
  dataType: "json"
}).then(function(response){
  console.log(response);
  for (i = 0; i < response.length; i++) {
    $("main").append("<div class='list'><p>" + response[i].title + "</p></div");
  }
});
});
