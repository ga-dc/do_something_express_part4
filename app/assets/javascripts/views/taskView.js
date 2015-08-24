var TaskView = function(task) {
  this.task = task;
  this.$el = $('<div class="task"></div>');
}

TaskView.prototype = {
  render: function() {
    var self = this;
    this.$el.html(this.taskTemplate(this.task));

    var completeIcon = this.$el.find(".fa.fa-check-square");
    var editIcon = this.$el.find(".fa.fa-pencil-square");
    var deleteIcon = this.$el.find(".fa.fa-trash-o");

    completeIcon.on('click', function() {
      console.log('complete icon click')
    });
    editIcon.on('click', function() {
      self.renderEditForm();
    });

    return this.$el;
  },
  renderEditForm: function() {
    var self = this;
    this.$el.html(this.taskEditTemplate(this.task));

    var saveIcon = this.$el.find(".fa.fa-floppy-o");
    var deleteIcon = this.$el.find(".fa.fa-trash-o");

    saveIcon.on('click', function() {
      self.updateTask();
    })
    deleteIcon.on('click', function() {
      self.task.destroy().then(function() { self.$el.fadeOut()});
    })
  },
  updateTask: function() {
    var self = this;
    var data = { body: self.$el.find('input[name=body]').val() };
    this.task.update(data).then( function() {self.render() });
  },
  taskTemplate: function(task) {
    var html = $("<div>");
    html.append("<div class='col-xs-8'>" + this.task.body + "</div>");
    html.append("<div class='col-xs-1'><i class='fa fa-check-square'></i></div>");
    html.append("<div class='col-xs-1'><i class='fa fa-pencil-square'></i></div>");
    return(html);
  },
  taskEditTemplate: function(task) {
    var html = $("<div>");
    html.append("<div class='col-xs-8'><input name='body' value='" + this.task.body + "'></div>");
    html.append("<div class='col-xs-1'><i class='fa fa-floppy-o'></i></div>");
    html.append("<div class='col-xs-1'><i class='fa fa-trash-o'></i></div>");
    return(html);

  }
}
