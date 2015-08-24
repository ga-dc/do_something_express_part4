var newListView = function(list){
  var self = this;
  this.$el = $(".newListView");
  this.$el.find("form").hide();

  var showFormButton    = this.$el.find(".addList");
  var submitFormButton  = this.$el.find(".createList");

  showFormButton.on("click", function() {
    self.$el.find("form").slideToggle();
    $("#newList").focus();

  });
  submitFormButton.on("click", function(event) {
    event.preventDefault();
    self.createList();
  });
};

newListView.prototype = {
  createList: function() {
    var self = this;
    var data = {  title: self.$el.find('input[name=title]').val() };

    console.log(data)
    console.log(List)
    List.create(data).then(function(newList) {
      self.$el.find("input").val();
      self.$el.find("form").hide();

      var view = new ListView(newList);
    });
  }
};
