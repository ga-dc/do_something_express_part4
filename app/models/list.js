module.exports = function(sequelize, Sequelize){
  return sequelize.define("list", {
    title: Sequelize.STRING
  });
};

List.prototype = {
  render: function(){
    this.view = "<div class='list'><input type='hidden' name='id' value='" + (this.data.id || "") + "' /><input type='text' name='title' value='" + (this.data.title || "") + "' />";
    if(!this.data.id){
      this.view += "<button type='button' class='create'>Create</button>";
    }else{
      this.view += "<button type='button' class='save'>Save</button><button type='button' class='delete'>Delete</button>";
      this.view += "<ul>" + this.tasksHtml + "</ul>";
    }
    this.view += "</div>";
  },
  fetchList: function(){
    var list;
    var url = "http://localhost:3000/lists";
    var request = $.getJSON(url)
    .then(function(response){
      lists = response;
      lists.push({title: ""});
        for (var l = 0; l < lists.length; l++){
          list = lists[l];
          tasksHtml = "";
          tasks.push({listId: list.id, content: ""});
          return lists;
        }
    });
  },
  createList: function(){
    var params = {title: $(this).siblings("[name=title]").val()};
    $.ajax({
      method: "post",
      contentType: "application/json",
      url: "/lists",
      data: JSON.stringify(params)
    }).always(function(){
      location.reload();
    });
  }
};
