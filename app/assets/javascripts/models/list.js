var List = function(info) {
	this.title = info.title;
	this.id = info.id
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
      console.log("lists fetch fail :(")
    })
  return request
}

List.prototype.fetchTasks = function() {
	var url = "http://localhost:3000/lists/" + this.id + "/tasks"
	var request = $.getJSON(url)
	.then(function(response) {
		var tasks = []
		for(var i = 0; i < response.length; i++) {
			tasks.push(new Task(response[i]))
		}
		return tasks
	}).fail(function(response) {
		console.log("tasks failed to load")
	})
	return request
}