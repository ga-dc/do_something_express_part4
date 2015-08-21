$(document).ready(function(){

  function Task(params){
    if(params) this.data = params;
    this.render();
  }


  function List(params, tasksHtml){
    if(params){
      this.data = params;
      this.tasksHtml = tasksHtml;
      this.render();
    }
  }

  List.fetch = function(){
    var request = $.getJSON("http://localhost:3000/lists")
    .then(function(response){
      var lists = [];
      for(var i = 0; i < response.length; i++){
        lists.push(new List(response[i]))
      }
      return lists
    })
    .fail(function(response){
      console.log("lists fetch fail")
    })
    return request
  }

  List.prototype = {
    var lists;
    var tasks;
    var params = {title: $(this).siblings("[name=title]").val()}
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
  },

  Tasks.fetch = function(){
      var url = "http://localhost:3000/lists" + this.id + "/tasks";
      var request = $.getJSON(url)
      .then(function(response){
        var tasks = []
        for (var i = 0; i < response.length; i++){
          tasks.push(new Task(response[i]))
        }
      return tasks
      })
      .fail(function(response){
        console.log("js failed to load")
      })
      return requets
    }

  Tasks.prototype = function(){
    render: function(){
      this.view = "<li class='task'><input type='hidden' name='id' value='" + (this.data.id || "") + "' /><input type='hidden' name='listId' value='" + this.data.listId + "' /><textarea name='content'>" + (this.data.content || "") + "</textarea>";
      if(!this.data.id){
        this.view += "<button type='button' class='create'>Create</button>";
      }
      else{
        this.view += "<button type='button' class='save'>Save</button><button type='button' class='delete'>Delete</button>";
      }
        this.view += "</li>";
    }
  },
    create: function(){},
    save: function(){},
    delete: function(){},
  })

      // $(".list>.create").on("click", function(){
      //   var params = {title: $(this).siblings("[name=title]").val()}
      //   $.ajax({
      //     method: "post",
      //     contentType: "application/json",
      //     url: "/lists",
      //     data: JSON.stringify(params)
      //   }).always(function(){
      //     location.reload();
      //   });
      // });
      // $(".list>.save").on("click", function(){
      //   var params = {title: $(this).siblings("[name=title]").val()};
      //   var id = $(this).siblings("[name=id]").val();
      //   $.ajax({
      //     method: "put",
      //     contentType: "application/json",
      //     url: "/lists/" + id,
      //     data: JSON.stringify(params)
      //   }).always(function(){
      //     location.reload();
      //   });
      // });
      // $(".list>.delete").on("click", function(){
      //   var id = $(this).siblings("[name=id]").val();
      //   $.ajax({
      //     method: "delete",
      //     contentType: "application/json",
      //     url: "/lists/" + id
      //   }).always(function(response){
      //     console.dir(response)
      //     location.reload();
      //   });
      // });


      // $(".task>.create").on("click", function(){
      //   var id = $(this).siblings("[name=id]").val();
      //   var listId = $(this).siblings("[name=listId]").val();
      //   var params = {
      //     content: $(this).siblings("[name=content]").val()
      //   };
      //   $.ajax({
      //     method: "post",
      //     contentType: "application/json",
      //     url: "/lists/" + listId + "/tasks",
      //     data: JSON.stringify(params)
      //   }).always(function(){
      //     location.reload();
      //   });
      // });
      // $(".task>.save").on("click", function(){
      //   var id = $(this).siblings("[name=id]").val();
      //   var listId = $(this).siblings("[name=listId]").val();
      //   var params = {
      //     content: $(this).siblings("[name=content]").val()
      //   };
      //   $.ajax({
      //     method: "put",
      //     contentType: "application/json",
      //     url: "/tasks/" + id,
      //     data: JSON.stringify(params)
      //   }).always(function(){
      //     location.reload();
      //   });
      // });
      // $(".task>.delete").on("click", function(){
      //   var id = $(this).siblings("[name=id]").val();
      //   var listId = $(this).siblings("[name=listId]").val();
      //   $.ajax({
      //     method: "delete",
      //     contentType: "application/json",
      //     url: "/tasks/" + id
      //   }).always(function(){
      //     location.reload();
      //   });
      // });
