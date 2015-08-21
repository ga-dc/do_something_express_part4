var ListView = function(list){
  this.list = list;
  this.$el = $("<div class = 'list'></div>");
};

ListView.prototype ={
  render: function(){
    var self = this;
    // appending elements to the .$el property
    self.$el.append("<h3>" + list.title + "</h3>");
  }
}
