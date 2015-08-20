$(document).ready(function(){

  List.fetch().then(function(lists){
    lists.forEach(function(list){
      var view = new ListView(list)
      view.render();
    })
  })
// new newListView();

  // List.js model
  var List = function(info){
    this.title = info.title;
    this.id = info.id;
  };

  List.fetch = function(){
    var request = $.getJSON("http://localhost:3000/lists").then(function(response){
      var lists = [];
      for (i = 0; i < response.length; i++) {
        lists.push(new List(response[i]));
      }
      return lists;
    }).fail(function(response){
      console.log("ajax request failed");
    });
    return request;
  };

  List.prototype = function(){

  }

  // listView.js view/controller
  var ListView = function(list){
    this.list = list;
    this.$el = $("<div class='list'></div>")
    this.render();
    $(".lists").append(this.$el);
  }

  ListView.prototype = {
    render: function(){
      console.log("helloooooo")
    }
  }

});
