//model for list, this is a model constructor
var List = function(info){
  this.title = info.title;
  this.id = info.id
}

//add fetch to get all of the lists
List.fetch = function(){
  // saving the ajax request to a local variable
  var request = $.getJSON("http://localhost:3000/lists")
  // the promise function on a successful ajax call.
  .then(function(response) {
    // local variable in the promise callback instantiated as an empty array
    var lists = []
    // loop over each element in the response
    for(var i = 0; i < response.length; i++){
      // create a new JS Artist object for each element in the response
      lists.push(new List(response[i]))
    }
    // returns artists in the promise so that it can be passed in as an argument to future promises
    return lists
    })
  .fail(function(response){
      console.log("lists fetch failed")
    })
  // explicit return of the fetch function that returns the json request with artists available an argument for future promises
  return request
}

//view for lists
var ListView = function(list){
  this.list = list;
  this.$el = $("<div><button id='"+ list.id +"' type='button'>Delete</button></div>");
};

//use "prtototype" to add render function to ALL listView objects created
ListView.prototype ={
  render: function(){
    var self = this;
    // appending elements to the .$el property
    self.$el.append("<h3>" + self.list.title + "</h3>");
    // add this list's html to the main div
    $("main").append(self.$el)
  }
}

//on page ready, call the fetch to get all the list data, then for each list
//create a listView and call the render function for it.
$(document).ready(function(){
  List.fetch().then(function(lists){
    lists.forEach(function(list){
      var view = new ListView(list);
      view.render();
    });

    //add a click  listener to all buttons so that it gets the id from the button
    // and ajax a delete to the url with that id. once that is done, reloads the page.
    $("button").on("click", function(){
      var id = this.id;
      $.ajax({
        method: "delete",
        contentType: "application/json",
        url: "/lists/" + id
      }).always(function(response){
        location.reload();
      });
    });

  })
});
