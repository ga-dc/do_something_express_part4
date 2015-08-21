$(document).ready(function(){
// code doesn't work but an OO approach would be to combine things into objects and move the var in the prototype to call on later I have spent way to much time getting nowhere so this is my original thought process even though it doesn't work
  function Task(params){
    if(params) this.data = params;
    this.render();
  }
  Task.prototype = {
    render: function(){
      var id = $(this).siblings("[name=id]").val();
      var listId = $(this).siblings("[name=listId]").val();
      var params = {
        content: $(this).siblings("[name=content]").val()
      };
      this.view = "<li class='task'><input type='hidden' name='id' value='" + (this.data.id || "") + "' /><input type='hidden' name='listId' value='" + this.data.listId + "' /><textarea name='content'>" + (this.data.content || "") + "</textarea>";
      if(!this.data.id){
        this.view += "<button type='button' class='create'>Create</button>";
      }else{
        this.view += "<button type='button' class='save'>Save</button><button type='button' class='delete'>Delete</button>";
      }
      this.view += "</li>";
    },
    taskCreate: function(){
    $(".task>.create").on("click", function(){
      $.ajax({
        method: "post",
        contentType: "application/json",
        url: "/lists/" + listId + "/tasks",
        data: JSON.stringify(params)
      }).always(function(){
        location.reload();
      });
    });
  },
  taskSave: function(){
    $(".task>.save").on("click", function(){
      $.ajax({
        method: "put",
        contentType: "application/json",
        url: "/tasks/" + id,
        data: JSON.stringify(params)
      }).always(function(){
        location.reload();
      });
    });
  },
  taskDelete: function(){
    $(".task>.delete").on("click", function(){
      $.ajax({
        method: "delete",
        contentType: "application/json",
        url: "/tasks/" + id
      }).always(function(){
        location.reload();
      });
    });
  }
  }

  function List(params, tasksHtml){
    if(params){
      this.data = params;
      this.tasksHtml = tasksHtml;
      this.render();
    }
  }
  List.prototype = {
    render: function(){
      var params = {title: $(this).siblings("[name=title]").val()};
      var id = $(this).siblings("[name=id]").val();
      this.view = "<div class='list'><input type='hidden' name='id' value='" + (this.data.id || "") + "' /><input type='text' name='title' value='" + (this.data.title || "") + "' />";
      if(!this.data.id){
        this.view += "<button type='button' class='create'>Create</button>";
      }else{
        this.view += "<button type='button' class='save'>Save</button><button type='button' class='delete'>Delete</button>";
        this.view += "<ul>" + this.tasksHtml + "</ul>";
      }
      this.view += "</div>";
    },
    listCreate: function(){
    $(".list>.create").on("click", function(){
      $.ajax({
        method: "post",
        contentType: "application/json",
        url: "/lists",
        data: JSON.stringify(params)
      }).always(function(){
        location.reload();
      });
    });
  },
  listSave: function(){
    $(".list>.save").on("click", function(){
      $.ajax({
        method: "put",
        contentType: "application/json",
        url: "/lists/" + id,
        data: JSON.stringify(params)
      }).always(function(){
        location.reload();
      });
    });
  },
  listDelete:function(){
    $(".list>.delete").on("click", function(){
      $.ajax({
        method: "delete",
        contentType: "application/json",
        url: "/lists/" + id
      }).always(function(response){
        console.dir(response)
        location.reload();
      });
    });
  }
  }

  var lists;
  var tasks;
  $.ajax({
    url: "/lists",
    method: "get"
  }).then(function(response){
    lists = response;
    lists.push({title: ""});
    return $.ajax({
      url: "/tasks",
      method: "get"
    })
  }).then(function(response){
    var tasksHtml, task, list;
    var listsHtml = "";
    tasks = response;
    for(var l = 0; l < lists.length; l++){
      list = lists[l];
      tasksHtml = "";
      tasks.push({listId: list.id, content: ""});
      for(var t = 0; t < tasks.length; t++){
        if(list.id == 0) break;
        task = tasks[t];
        if(task.listId != list.id) continue;
        tasksHtml += new Task(task).view;
      }
      listsHtml += new List(list, tasksHtml).view;
    }
    $("main").html(listsHtml);

  });

});
