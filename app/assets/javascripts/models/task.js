var Task = function(info) {
  this.body = info.body;
  this.complete = info.complete;
  this.listId = info.listId;
  this.id = info.id;
};

Task.prototype = {
  destroy: function() {
    var url = "/tasks/" + this.id;
    var request = $.ajax( {
      url: url,
      method: "delete"
    });
    return request;
  },
}
