var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");

var listsController = require("./app/controllers/lists");
var tasksController = require("./app/controllers/tasks");

app.get("/", function(req, res){
  res.render("index");
});

app.use("/", listsController);
app.use("/", tasksController);

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
