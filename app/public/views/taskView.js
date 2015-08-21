var TaskView = function(task){
  this.task = task;
}

TaskView.prototype = {
  render: function(){
    var el = $("<p>" + this.task.content + "</p>");
    return(el)
  }
}
