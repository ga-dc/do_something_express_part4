$(document).ready(function(){
  List.fetch().then(function(lists){
    lists.forEach(function(list){
      var view = new ListView(list)
    })
  })
  Task.prototype = {
   render: function(){
     this.view = "<li class='task'><input type='hidden' name='id' value='" + (this.data.id || "") + "' /><input type='hidden' name='listId' value='" + this.data.listId + "' /><textarea name='content'>" + (this.data.content || "") + "</textarea>";
     if(!this.data.id){
       this.view += "<button type='button' class='create'>Create</button>";
     }else{
       this.view += "<button type='button' class='save'>Save</button><button type='button' class='delete'>Delete</button>";
     }
     this.view += "</li>";
   }
 }
});

listTemplate: function(list){
  var html = $("<div>");
  html.append("<h3> + list.title + </h3>")
}
