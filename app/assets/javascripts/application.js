$(document).ready(function(){

  var List = function(info){
    this.title = info.title;
  }

  List.fetch = function(){
    // saving the ajax request to a local variable
    var request = $.getJSON("/artists")
    // the promise function on a successful ajax call.
    .then(function(response) {
      // local variable in the promise callback instantiated as an empty array
      var lists = []
      // loop over each element in the response
      for(var i = 0; i < response.length; i++){
        // create a new JS List object for each element in the response
        lists.push(new List(response[i]))
      }
      // returns lists in the promise so that it can be passed in as an argument to future promises
      return lists
      })
    .fail(function(response){
        console.log("lists fetch fail")
      })
    // explicit return of the fetch function that returns the json request with artists available an argument for future promises
    return request
  }

  List.prototype.fetchTasks = function(){//!!
    var url = "/artists/" + this.id + "/tasks"
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
});
