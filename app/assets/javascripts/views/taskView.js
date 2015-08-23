var TaskView = function(task) {
  this.task = task;

}

TaskView.prototype = {
  render: function() {
    var self = this;
    var $el = this.taskTemplate(this.task);

    var completeIcon = $el.find(".fa.fa-check-square");
    var editIcon = $el.find(".fa.fa-pencil-square");
    var deleteIcon = $el.find(".fa.fa-trash-o");

    completeIcon.on('click', function() {
      console.log('complete icon click')
    });
    editIcon.on('click', function() {
      console.log('edit icon click')
      self.renderEditForm();
    });
    deleteIcon.on('click', function() {
      self.task.destroy().then(function() { $el.fadeOut()});
    })

    return $el;
  },
  renderEditForm: function() {
    console.log('render edit form')
    var self = this;
    var $el = this.taskEditTemplate(this.task);
    console.log(this.task)

    var saveIcon = $el.find(".fa.fa-floppy-o");
    var deleteIcon = $el.find(".fa.fa-trash-o");

    saveIcon.on('click', function() {
      console.log('save icon click')
    })
    deleteIcon.on('click', function() {
      console.log('delete icon click')
      self.task.destroy().then(function() { self.$el.fadeOut()});
    })

    console.log($el)
    return $el;
  },
  taskTemplate: function(task) {
    var html = $("<div class='task'>");
    html.append("<div class='col-xs-8'>" + this.task.body + "</div>");
    html.append("<div class='col-xs-1'><i class='fa fa-check-square'></i></div>");
    html.append("<div class='col-xs-1'><i class='fa fa-pencil-square'></i></div>");
    html.append("<div class='col-xs-1'><i class='fa fa-trash-o'></i></div>");
    return(html);
  },
  taskEditTemplate: function(task) {
    console.log(task)
    var html = $("<div>");
    html.append("<div class='col-xs-8'><input name='body' value='" + this.task.body + "'></div>");
    html.append("<div class='col-xs-1'><i class='fa fa-floppy-o'></i></div>");
    html.append("<div class='col-xs-1'><i class='fa fa-trash-o'></i></div>");
    console.log(html)
    return(html);

  }
}
