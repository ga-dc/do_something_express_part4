var express = require("express");
var router = express.Router();
var DB = require("../../config/connection");
var List = DB.models.List;
var Task = DB.models.Task;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/tasks", function(req, res){
  Task.findAll({order: "id"}).then(function(tasks){
    res.json(tasks);
  });
});

router.get("/tasks/:id", function(req, res){
  Task.findById(req.params.id).then(function(task){
    if(!task) return error (res, "not found");
    res.json(task);
  });
});

router.put("/tasks/:id", function(req, res){
  Task.findById(req.params.id).then(function(task){
    if(!task) return error(res, "not found");
    task.updateAttributes(req.body).then(function(updateTask){
      res.json(updateTask);
    });
  });
});

router.delete("/tasks/:id", function(req, res){
  Task.findById(req.params.id).then(function(task){
    if(!task) return error(res, "not found");
    task.destroy().then(function(){
      res.json({succes: true});
    });
  });
});

router.get("/lists/:listId/tasks", function(req, res){
  List.findById(req.params.listId)
  .then(function(list){
    if(!list) return error(res, "not found");
    return list.getTasks();
  })
  .then(function(tasks){
    res.json(tasks);
  });
});

router.post("/lists/:listId/tasks", function(req, res){
  List.findById(req.params.listId)
  .then(function(list){
    if(!list) return error(res, "not found");
    return Task.create(req.body);
  })
  .then(function(task){
    task.listId = list.id;
    task.complete = false;
    res.json(task);
  });
});

router.get("/lists/:listId/tasks/:id", function(req, res) {
  List.findById(req.params.listId)
  .then(function(list) {
    if(!list) return error(res, "not found");
    return list.getTasks();
  })
  .then(function(tasks) {
    for(var i in tasks) {
      // doesn't respond with an error
      if(!tasks[i]) {return error(res, "not found")}
      if( tasks[i].dataValues.id == req.params.id) {
        res.json(tasks[i]);
      }
    }
  })
})

router.delete("/lists/:listId/tasks/:id", function(req, res) {
  List.findById(req.params.listId)
  .then(function(list) {
    if(!list) return error(res, "not found");
    return list.getTasks();
  })
  .then(function(tasks) {
    for(var i in tasks) {
      if(!tasks[i]) {return error(res, "not found")}
      if( tasks[i].dataValues.id == req.params.id) {
        tasks[i].destroy().then(function() {
          res.json({ success: true});
        });
      }
    }
  })
})


// task.destroy().then(function(){
//   res.json({succes: true});
// });

module.exports = router;
