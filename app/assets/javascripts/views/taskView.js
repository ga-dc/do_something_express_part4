var TaskView = function(task){
  this.task = task;
  this.$el=$("<div class ='task'></div>");//this CREATES div placeholder
  this.render();
  $(".tasks").append(this.$el);
};

TaskView.prototype ={
  render: function(){
    var self = this;
    self.$el.html(self.taskTemplate(self.task));//replacing <div class = 'task'> with content here </div>
  },//end of render
  taskTemplate: function(task){
    var html = $("<div>");//targets<div>
    html.append("<h3>this is the task Template"+ task.id +"</h3>");
    return(html);
  }
};//end of Taskview.prototype
