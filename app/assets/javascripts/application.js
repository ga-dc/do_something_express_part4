$(document).ready(function(){

  function Task(params){
    if(params) this.data = params;
    this.render();
  }

  Task.prototype = {
    render: function(){
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
    }
  }





});
