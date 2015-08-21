var ListView = function(list){
  this.list = list;
  this.$el = $("<div class='list"+this.list.id+"'></div>")
};

ListView.prototype.render = function(){
  console.log("rendering");
  var self = this;
  self.$el.html(self.listTemplate(self.list));

  $(".lists").append(self.$el)

}
ListView.prototype.listTemplate = function(list){
  var html = $("<div>");
  html.append("<input type='hidden' name='id' value='" + (list.id || "") + "' />"); //think this is doing double duty with the listCreateView
  html.append("<input type='text' name='title' value='" + (list.title || "") + "' />");
  html.append("<button type='button' class='save'>Save</button>");
  html.append("<button type='button' class='delete'>Delete</button>");
  html.append("<div class='tasks'></div>");
  return(html);
}
