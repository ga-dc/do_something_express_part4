var List = function(title) {
  this.title = title;
};

List.prototype = {
  create: function(){
    var self = this;
    $.ajax({
      url: "/lists",
      method: "post",
      contentType: "application/json",
      data: JSON.stringify(self)
    });
  },

  render: function(){
    var self = this;
  }

}







// $(document).ready(function(){
  // List.fetch().then(function(lists){
  //   lists.forEach(function(list){
  //     var view = new ListView(list)
  //     view.render();
  //   })
  // })

// });
