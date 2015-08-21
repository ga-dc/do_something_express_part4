var Task = function(info){
  this.content = info.content;
  this.id = info.id;
};

Task.fetch = function(){
  var request = $.getJSON("http://localhost:3000/tasks")
  .then(function(response) {
      var tasks = [];
      for(var i =0; i < response.length ; i++){
        tasks.push(new Task(response[i]));
      }
      return tasks;
  }) // end of .then
  .fail(function(response){
    console.log("YOUR JAVASCRIPT IS UNWORTHY!!!");
  }); //end of .fail
  return request
}; //end of Task.fetch
