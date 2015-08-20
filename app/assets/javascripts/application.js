$(document).ready(function(){

  // ======= Task =======
  function Task(params){
    if(params) this.data = params;
    this.render();
  }

  Task.prototype = {
    render: function(){
      this.view = "<li class='task'><input type='hidden' name='id' value='" + (this.data.id || "") + "' /><input type='hidden' name='listId' value='" + this.data.listId + "' /><textarea name='content'>" + (this.data.content || "") + "</textarea>";
      if(!this.data.id){
        this.view += "<button type='button' class='create'>Create</button>";
      } else {
        this.view += "<button type='button' class='save'>Save</button><button type='button' class='delete'>Delete</button>";
      }
      this.view += "</li>";
    }
  }

  // ======= List =======
  function List(params, tasksHtml){
    if(params){
      this.data = params;
      this.tasksHtml = tasksHtml;
      this.render();
    }
  }

  List.prototype = {
    render: function(){
      this.view = "<div class='list'><input type='hidden' name='id' value='" + (this.data.id || "") + "' /><input type='text' name='title' value='" + (this.data.title || "") + "' />";
      if(!this.data.id){
        this.view += "<button type='button' class='create'>Create</button>";
      }else{
        this.view += "<button type='button' class='save'>Save</button><button type='button' class='delete'>Delete</button>";
        this.view += "<ul>" + this.tasksHtml + "</ul>";
      }
      this.view += "</div>";
    }
  }

  // ======= views =======
  var lists;
  var tasks;
  $.ajax({
    url: "/lists",
    method: "get"
  }).then(function(response){
    lists = response;             // list data
    lists.push({title: ""});
    return $.ajax({
      url: "/tasks",
      method: "get"
    })
  }).then(function(response){
    var tasksHtml, task, list;
    var listsHtml = "";
    tasks = response;             // task data

    for(var l = 0; l < lists.length; l++){    // loop through lists
      list = lists[l];
      tasksHtml = "";
      tasks.push({listId: list.id, content: ""});

      for(var t = 0; t < tasks.length; t++){    // loop through tasks
        if(list.id == 0) break;
        task = tasks[t];
        if(task.listId != list.id) continue;
        tasksHtml += new Task(task).view;       // get task view html
      }
      listsHtml += new List(list, tasksHtml).view;   // merge list/task view html
    }
    $("main").html(listsHtml);        // set main html to listsHtml


    // ======= sendAjax =======
    function sendAjax(whichButton, whichMethod, whichUrl, whichParams) {
      console.log("sendAjax");
      var params;
      if (whichParams == 0) {
        params = {title: $(whichButton).siblings("[name=title]").val()}
      } else {
        params = whichParams;
      }
      if (!params) {params = {}};
      var id = 0;
      $.ajax({
        method: whichMethod,
        contentType: "application/json",
        url: whichUrl,
        data: JSON.stringify(params)
      }).always(function(){
        location.reload();
      });
    };


    // ======= buttons =======
    $(".list>.create").on("click", function(){                      // what is this syntax ???  ".list>.create"
      console.log("list.create");
      sendAjax($(".list>.create"), "post", "/lists", 0)
    });

    $(".list>.save").on("click", function(){
      console.log("list.save");
      var id = $(this).siblings("[name=id]").val();
      sendAjax($(".list>.save"), "put", ("/lists/" + id), 0);
    });

    $(".list>.delete").on("click", function(){
      console.log("list.delete");
      var id = $(this).siblings("[name=id]").val();
      sendAjax($(".list>.delete"), "delete", ("/lists/" + id), 0);
    });

    $(".task>.create").on("click", function(){
      console.log("task.create");
      var id = $(this).siblings("[name=id]").val();
      var listId = $(this).siblings("[name=listId]").val();
      var params = {
        content: $(this).siblings("[name=content]").val()
      };
      sendAjax($(".task>.create"), "post", ("/lists/" + listId + "/tasks"), params);
    });

    $(".task>.save").on("click", function(){
      console.log("task.save");
      var id = $(this).siblings("[name=id]").val();
      var params = {
        content: $(this).siblings("[name=content]").val()
      };
      sendAjax($(".task>.save"), "put", ("/tasks/" + id), params);
    });

    $(".task>.delete").on("click", function(){
      console.log("task.delete");
      var id = $(this).siblings("[name=id]").val();
      sendAjax($(".task>.delete"), "delete", ("/tasks/" + id), 0);
    });
  });
});
