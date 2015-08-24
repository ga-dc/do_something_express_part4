var Task = function(info) {
  this.body = info.body;
  this.complete = info.complete;
  this.listId = info.listId;
  this.id = info.id;
};

Task.prototype = {
  update: function(taskData) {
    var self = this;

    var url = "/tasks/" + this.id;
    var request = $.ajax( {
      url: url,
      method: "patch",
      data: JSON.stringify(taskData),
      contentType: 'application/json'
    })
    .then(function(updatedTaskInfo) {self.reload(updatedTaskInfo)}
    );
    return request;
  },
  destroy: function() {
    var url = "/tasks/" + this.id;
    var request = $.ajax( {
      url: url,
      method: "delete"
    });
    return request;
  },
  reload: function(newData) {
    for(var attr in newData) {
      this[attr] = newData[attr];
    }
  }
}
