$(document).ready(function(){

  function List(params) {
    if(params) this.data = params;
    this.render();
  }
  List.prototype = {
    fetchTasks: function() {
      var url = "http://localhost:3000/lists" + this.id "/tasks";
      var request = $/getJSON(url)
      .then(function(response) {
        var tasks = [];
        for(var i = 0; i < response.length; i++) {
          tasks.push(new Task(response[i]));
        }
        return tasks;
      })
      .fail(function(response) {
        console.log("js load failed");
      });
      return request;
    },
    update: function(listData) {
      var self = this;

    delete: function(listData) {
      var self = this;

      var url = "/lists" + self.id
      var ajaxPromise = $.ajax({
        url: url,
        method: "delete",
        data: JSON.stringify(listData),
        contentType: 'application/JSON'
      }).then(
        function(deletedListInfo) {self}
      )
      }
    }
  }

});
