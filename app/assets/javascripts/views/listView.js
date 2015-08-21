// create constructor function for ListView "class"
var ListView = function(list){
  this.list = list;

  this.$el = $("<div class='list'><div>");
  this.render();

  $(".lists").append(this.$el);
};

// Add interface to render via instance methods on prototype
ListView.prototype = {
  render: function(){
    var self = this;
    self.$el.html(self.listTemplate(self.list));
  },
  listTemplate: function(list){
    var html = $("<div>");
    html.append("<h2>" + list.title + "</h2>");
    return(html);
  }
}
