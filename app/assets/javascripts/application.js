$(document).ready(function(){

  var List = function(info){
  this.title = info.title;
  this.id = info.id;
  };

  var Task = function(info){
  this.content = info.content;
  this.id = info.id;
  };

  $.ajax({
    url: "/lists",
    method: "get"
  }).then(function(response) {
    var lists = [];
    for(var i = 0; i < response.length; i++){
      lists.push(new List(response[i]));
    }
    return lists.forEach(function(list){
      var html = $("main");
      html.append("<h5>Lists: " + list.title + "</h5>");
      return(html);
     });
    })
    .fail(function(response){
      console.log("js failed to load");
    });

    $.ajax({
      url: "/tasks",
      method: "get"
    }).then(function(response) {
      var tasks = [];
      for(var i = 0; i < response.length; i++){
        tasks.push(new Task(response[i]));
      }
      return tasks.forEach(function(task){
        var html = $("main");
        html.append("<p>" + task.content + "</p>");
        return(html);
       });
      })
      .fail(function(response){
        console.log("js failed to load");
      });

});
