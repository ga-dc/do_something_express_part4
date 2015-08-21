var ListView = function(list) {
  this.list = list;

  this.$el = $('<div class="list"></div>');
  this.render();

  $('.lists').append(this.$el);
};

ListView.prototype = {
  render: function() {
    var self = this;
    self.$el.html(self.listTemplate(self.ListView));

    var showButton = self.$el.find('.showTasks');
    var editButton = self.$el.find('.editTask');
    var tasksDiv = self.$el.find('div.tasks');

    tasksDiv.hide();

    showButton.on('click', function() {
      self.toggleTasks(tasksDiv);
    });
    editButton.on('click', function() {
      self.renderEditForm;
    })
  },
  renderEditForm: function() {
    var self = this;

    this.$el.html(this.listEditTemplate(this.list));

    this.$el.find('.updateList').on('click', function() {
      self.updateList();
    });
  },
  toggleButton: function(tasksDiv) {
    if(tasksDiv.is(":visible")){
      tasksDiv.siblings("button.showTasks").text("Hide Tasks");
    } else {
      tasksDiv.siblings("button.showTasks").text("Show Tasks");
    }
  },
  toggleTasks: function(tasksDiv) {
    var self = this;

    if(tasksDiv.children().length === 0) {
      this.list.fetchTasks().then(function(tasks) {
        self.appendTasks(tasks, tasksDiv);
      });
    }
    tasksDiv.toggle();
    this.toggleButton(tasksDiv);
  },
  appendTasks: function(tasks, tasksDiv){
    tasks.forEach(function(task) {
      var taskView = new TaskView(task);
      tasksDiv.append(taskView.render());
    });
  },
  updateList: function() {
    var self = this;
    var data = { title: self.$el.find('input[name=title]').val() };
    selt.list.update(data).then(function() { self.render(); });
  },
  listTemplate: function(list) {
    console.log("listTemplate")
    console.log(list)
    var html = $('<div>');
    html.append("<h3>" + list.title + "</div>");
    html.append("<button class='showTasks'>Show Tasks</button>");
    html.append("<button class='editList'>Edit List</button>");
    html.append("<div class='tasks'></div>");
    return(html);
  },
  listEditTemplate: function(list) {
    var html = $('<div>');
    html.append("<input name='title' value='" + list.title + "'>");
    html.append("<button class='updateList'>Update List</button>");
    html.append("<button class='deleteList'>Delete List</button>");
    return(html);
  }
}
