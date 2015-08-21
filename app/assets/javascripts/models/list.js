var List = function(params){
  this.title = params.title;
  this.id = params.id;
}

List.fetch = function(){
  var request = $.getJSON("/lists")
  .then(function(response){
    var lists = [];
    for (i in response){
      lists.push(new List(response[i]))
    }
    return lists;
  })
  .fail(function(response){
    console.log("Failed to fetch lists")
  })
  return request;
}
