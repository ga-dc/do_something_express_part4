var TaskView = function(song) {
  this.task = task;
}

TaskView.prototype = {
  render: function() {
    var el = $(this.task.content)
    return(el)
  }
}
