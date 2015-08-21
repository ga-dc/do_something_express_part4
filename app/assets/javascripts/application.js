$(document).ready(function(){

  $.ajax({
    url: "/lists",
    method: "get"
  }).then(function(lists){
    for(var i = 0; i <lists.length; i++){
      var list = lists[i]
      // console.log(list.title)
      var $el = $("<div class='list'>" + list.title + "</div>")
      $("main").append($el)
    }
  })

  // var List = function(info){
  //   this.list = list;
  //   this.id = info.id;
  //   this.title = info.name
  //
  //   this.$el = $("<div class ='list'></div>")
  //   this.render();
  //   $(".lists").append(this.$el);
  // };
  //
  // List.fetch = function(){
  //   var request = $.getJSON("http://localhost:3000/lists")
  //   .then(function(response){
  //     var lists = []
  //     for(var i = 0; i <response.length; i++){
  //       lists.push(new List(response[i]))
  //     }
  //     return lists
  //   })
  //   .fail(function(response){
  //     console.log("lists fail")
  //   })
  //   return request
  // };
  //
  // List.prototype = {
  //   render: function(){
  //     var self = this;
  //
  //     self.$el.html(self.listTemplate(self.list));
  //     $(".lists").append(self.$el);
  //   },
  //   listTemplate: function(list){
  //     var html = $("<div>");
  //     html.append("<h3>" + list.title + "<h/3>");
  //     return(html);
  //   }
  // };
});
