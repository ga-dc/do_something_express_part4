var List = function(info){
  var self = this;
  this.title = info.title;
}

List.fetch = function(){
  var request = $.getJSON("http://localhost:3000/lists")
  .then(function(response){
    var lists = [];
    for (var i = 0; i < response.length; i++){
      lists.push(new List(response[i]));
    }
    console.log(lists);
    return lists;
  })
  .fail(function(response){
    console.log("js failed to load");
  });
  return request
};
