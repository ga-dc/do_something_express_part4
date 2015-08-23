var List = function(info) {
  this.title = info.title;
  this.id = info.id;
};

List.fetch = function() {
  var request = $.getJSON("/lists")
  .then(function(response) {
    var lists = [];
    for(var i in response ) {
      lists.push(new List(response[i]));
    }
    return lists;
  })
  .fail(function(response) {
    console.log("Fail to fetch lists");
  });
  return request;
};

List.prototype = {
  fetchTasks: function() {
    var url = "/lists/" + this.id + "/tasks";
    var request = $.getJSON(url)
    .then(function(response) {
      var tasks = [];
      for(var i = 0; i < response.length; i++ ) {
        tasks.push(new Task(response[i]));
      }
      return tasks;
    })
    .fail(function(response) {
      console.log("Failed to fetch tasks");
    });
    return request;
  },
  update: function(listData) {
    var self = this;

    var url = "/lists/" + this.id;
    var request = $.ajax({
      url: url,
      method: "patch",
      data: JSON.stringify(listData),
      contentType: 'application/json'
    })
    .then(function(updatedListInfo) {self.reload(updatedListInfo);}
    );
    return request;
  },
  destroy: function() {
    var url = "/lists/" + this.id;
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
};
