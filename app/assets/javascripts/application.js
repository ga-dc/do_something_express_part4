$(document).ready(function(){

  function List(info){
  this.title = info.title;
  this.id = info.id;
  };

  var Task = function(info){
  this.content = info.content;
  this.id = info.id;
  };

  var html = $("main");

  $.ajax({
    url: "/lists",
    method: "get"
  }).then(function(response) {
    var lists = [];
    for(var i = 0; i < response.length; i++){
      lists.push(new List(response[i]));
    }
    return lists.forEach(function(list){
      html.append("<h5>Lists: " + list.title + "</h5>");
      html.append("<button class='deleteList'>Delete List</button>")

      var deleteButton = $(".deleteList")
      console.log("the delete button is" + deleteButton)
      deleteButton.on("click", function(){
        console.log("click fired")
        console.log("list id is " + list.id)
        //var listId = list.id;
        $.ajax({
          method: "delete",
          contentType: "application/json",
          url: "/lists/" + listId,
        }).always(function(){
          //location.reload();
        });
      });

      });

  }).fail(function(response){
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
      html.append("<p>" + task.content + "</p>");
    });
  }).fail(function(response){
    console.log("js failed to load");
  });

});
