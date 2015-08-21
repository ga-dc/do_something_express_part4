$(document).ready(function(){

  function List(initialTitle) {
    this.title = title;
  }

  List.prototype = {
    render: function(){
    // saving the ajax request to a local variable
    var request = $.getJSON("http://localhost:3000/lists")
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
    // explicit return of the fetch function that returns the json request with lists available an argument for future promises
    return request
    }
  }

  var lists;
  $.ajax({
    url: "/lists",
    method: "get"
  }).then(function(response){
    $("main").html(response);
  });


});


// ```
// $.ajax({
//   url: "/lists",
//   method: "get"
// }).then(function(response){
//   $("main").html(response);
// });
// ```

// function List(params, tasksHtml){
//   if(params){
//     this.data = params;
//     this.tasksHtml = tasksHtml;
//     this.render();
//   }
// }
//
// List.fetch = function(){
//   // saving the ajax request to a local variable
//   var request = $.getJSON("http://localhost:3000/lists")
//   // the promise function on a successful ajax call.
//   .then(function(response) {
//     // local variable in the promise callback instantiated as an empty array
//     var lists = []
//     // loop over each element in the response
//     for(var i = 0; i < response.length; i++){
//       // create a new JS List object for each element in the response
//       lists.push(new List(response[i]))
//     }
//     // returns lists in the promise so that it can be passed in as an argument to future promises
//     return lists
//     })
//   .fail(function(response){
//       console.log("lists fetch fail")
//     })
//   // explicit return of the fetch function that returns the json request with lists available an argument for future promises
//   return request
// }
