$(document).ready(function(){
  Task.fetch().then(function(tasks){
    tasks.forEach(function(task){
        var view = new TaskView(task);
        view.render();
    });
  });
});
