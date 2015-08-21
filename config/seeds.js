var DB = require("./connection");
var data = {
  lists: require("./list_data"),
  tasks: require("./task_data")
}

DB.models.List.bulkCreate(data.lists).done(function(){
  DB.models.List.findAll().done(function(lists){
    var l, list, t, task, tasks, output = [];
    for(l = 0; l < lists.length; l++){
      list = lists[l];
      tasks = data.tasks[list.title];
      for(t = 0; t < tasks.length; t++){
        task = tasks[t];
        task.listId = list.id;
        output.push(task);
      }
    }
    DB.models.Task.bulkCreate(output).done(function(){
      process.exit();
    })
  });
});
