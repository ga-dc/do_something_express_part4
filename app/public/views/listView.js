var ListView = function(list){
  this.list = list;
  this.$el = $("<div class='list'></div>");
};

ListView.prototype = {
  toggleButton: function(tasksDiv){
    if(tasksDiv.is(":visible")){
      tasksDiv.siblings("button").text("Hide Tasks");
    } else {
      tasksDiv.siblings("button").text("Show Tasks");
    }
  },
  toggleTasks: function(tasksDiv){
    var self = this;
    // if not in DOM, populate'
    if(tasksDiv.children().length === 0){
      this.list.fetchTasks().then(function(tasks){
        self.appendTasks(tasks, tasksDiv);
      });
    }
    // toggle (note: tasksDiv starts hidden)
    tasksDiv.toggle();
    this.toggleButton(tasksDiv);
  },
  appendTasks: function(tasks, tasksDiv){
    tasks.forEach(function(task){
      var taskView = new TaskView(task);
      tasksDiv.append(taskView.render());
    });
  },
  render: function(){
    var self = this;

    self.$el.html(self.listTemplate(self.list));
    $(".lists").append(self.$el);

    var showButton = self.$el.find(".showTasks");
    var tasksDiv   = self.$el.find("div.tasks");

    tasksDiv.hide(); // hide div until it's populated with tasks

    showButton.on("click", function(){
      self.toggleTasks(tasksDiv);
    });
  },
  listTemplate: function(list){
    var html = $("<div>");
    html.append("<h3>" + list.name + "</h3>");
    html.append("<img class='list-photo' src='" + list.photoUrl + "'>");
    html.append("<button class='showTasks'>Show Tasks</button>");
    html.append("<div class='tasks'></div>");
    return(html);
  }
};
