var ListView = function(list){
  this.list = list;

  this.$el = $("<div class='list'></div>");
  this.render();

  $(".lists").append(this.$el);
};

ListView.prototype = {
  render: function(){
    var self = this;

    self.$el.html(self.listTemplate(self.list));

    var tasksDiv = self.$el.find("div.tasks");

    // tasksDiv.hide();

  },
  appendTasks: function(tasks, tasksDiv){
    tasks.forEach(function(task){
      var taskView = new TaskView(task);
      taskDiv.append(taskView.render());
    });
  },
  listTemplate: function(list){
    var html = $("<div>");
    html.append("<h3>" + list.title + "</h3>");
    html.append("<div class='tasks'></div>");
    return(html);
  }
};
