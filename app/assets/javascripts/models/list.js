// build List constructor "class"
var List = function(info){
  this.title = info.title
  this.id = info.id
}

// create "class" method to return all lists
List.fetch = function(){
  var request = $.getJSON("http://localhost:3000/lists")
  .then(function(response) {
    var lists = [];
    for(var i = 0; i < response.length; i++){
      lists.push(new List(response[i]));
    }
    return lists;
    })
  .fail(function(response){
      console.log("js failed to load");
    });
  return request;
};

// create instance methods to List prototype
List.prototype = {
  fetchTasks: function(){
    var url = "http://localhost:3000/lists/" + this.id + "/tasks";
    var request = $.getJSON(url)
    .then(function(response){
      var tasks = [];
      for(var i = 0; i < response.length; i++){
        tasks.push(new Task(response[i]));
      }
      return tasks;
     })
    .fail(function(repsonse){
      console.log("js failed to load");
    });
    return request;
  },
  update: function(listData) {
    var self = this;

    var url = "/lists/" + self.id;
    var request = $.ajax({
      url: url,
      method: "patch",
      data: JSON.stringify(listData),
      contentType : 'application/json'
    }).then(
      function(updatedListInfo) {self.reload(updatedListInfo);}
    );
    return request;
  },
  destroy: function(){
    console.log("delete clicked");
  },
  reload: function(newData){
    for(var attrname in newData) {
      this[attrname] = newData[attrname];
    }
  }
};
