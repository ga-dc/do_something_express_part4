var List = function(params){
  this.title = params.title;
  this.id = params.id;
};

List.fetch = function(){
  var request = $.getJSON("/lists")
  .then(function(response){
    var lists = [];
    for (i in response){
      lists.push(new List(response[i]))
    }
    return lists;
  })
  .fail(function(response){
    console.log("Failed to fetch lists")
  })
  return request;
};

List.prototype.fetchTasks = function(){
  var request = $.getJSON("/lists/" + this.id + "/tasks")
  .then(function(response){
    var tasks = [];
    for(var i = 0; i < response.length; i++){
      tasks.push(new Task(response[i]))
    };
    return tasks
    })
  .fail(function(response){
    console.log("Failed to fetch tasks");
    })
  return request;
}
