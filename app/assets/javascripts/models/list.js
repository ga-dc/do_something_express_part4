var List = function(info) {
  this.title = info.title;
};

List.fetch = function() {
  var request = $.getJSON("/artists")
    .then(function(response) {
      var lists = [];
      for (var i=0; i<response.length; i++) {
        lists.push(newList(response[i]));
      }
      return lists;
    })
    .fail(function(respone){
      console.log("js failed to load");
    });
  return request;
};
