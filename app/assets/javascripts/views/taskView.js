var TaskView = function(task) {
  this.task = task;
}

TaskView.prototype = {
  render: function() {
    var el = $("<p><span>" + this.task.body + "</span><span>" + this.task.complete + "</span></div>");
    return el;
  }
}
