var ListView = function(list){
  this.list = list;
  this.$el = $("<div class ='list'></div>")
}

ListView.prototype = {
  render: function(){
    var self = this;
    self.$el.html(self.listTemplate(self.list));
    $(".lists").append(self.$el);
  },
  listTemplate: function(list){
    var html = $("<div>")
    html.append("<h2 class = list-title>" +list.title+ "<h2>");
    return(html);
  }
}
