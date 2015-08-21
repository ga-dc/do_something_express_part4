$(document).ready(function(){
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
});

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
