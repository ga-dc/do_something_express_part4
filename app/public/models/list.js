var List = function(info){
  var self = this;
  this.title = info.title;
}

List.fetch = function(){
  var request = $.getJSON("http://localhost:3000/lists")
  .then(function(response) {
    var lists = []
    for(var i = 0; i < response.length; i++){
      lists.push(new List(response[i]))
    }
    return lists
    })
  .fail(function(response){
      console.log("js failed to load")
    })
  return request
}

List.prototype.fetchTasks = function(){
  var url = "http://localhost:3000/lists/" + this.id + "/tasks"
  var request = $.getJSON(url)
  .then(function(response){
    var tasks = []
    for(var i = 0; i < response.length; i++){
      tasks.push(new Task(response[i]))
    }
    return tasks
    })
  .fail(function(repsonse){
    console.log("js failed to load")
    })
  return request
}
