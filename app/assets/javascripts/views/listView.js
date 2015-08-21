var ListView = function(list){
  this.list = list;
  this.$el = $("main");
};

ListView.prototype ={
  render: function(){
    var self = this;
    self.$el.append("<h2>" + list.title + "</h2>");
    self.$el.append("<button class='showTasks'>Show Tasks</button>");
    self.$el.append("<div class='tasks'></div>");
    // append the .$el to the div with class artists in our view.
    $("div.lists").append(self.$el)
  }
}