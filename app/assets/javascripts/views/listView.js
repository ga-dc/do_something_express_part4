var ListView = function(list) {
  this.list = list;

  this.$el = $('<div class="list"></div>');
  this.render();
  $(".lists").append(this.$el);
};

ListView.prototype = {
  render: function() {
    var self = this;
    this.$el.html(this.listTemplate(this.list));

    var showButton = this.$el.find('.showTasks');
    var editButton = this.$el.find('.editList');
    var tasksDiv = this.$el.find('div.tasks');

    tasksDiv.hide();

    showButton.on('click', function() {
      self.toggleTasks(tasksDiv);
    });
    editButton.on('click', function() {
      self.renderEditForm();
    });
  },
  renderEditForm: function() {
    var self = this;

    this.$el.html(this.listEditTemplate(this.list));

    this.$el.find('.updateList').on('click', function() {
      self.updateList();
    });

    this.$el.find('.deleteList').on('click', function() {
      self.list.destroy().then(function() {self.$el.fadeOut()});
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
    self.list.update(data).then(function() { self.render(); });
  },
  listTemplate: function(list) {
    var html = $("<div>");
    html.append("<h3>" + list.title + "</h3>");
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
