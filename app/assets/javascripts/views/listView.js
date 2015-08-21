var ListView = function(list){
  this.list = list;
  this.$el = $("main");
}

ListView.prototype = {
  render: function(){
    var self = this;
    self.$el.html(self.listTemplate(self.list));
    $("main").append(self.$el)

    		self.list.fetchTasks().then(function(tasks) {
            tasks.forEach(function(task) {
              var taskView = new TaskView(task)
              $(".tasks").append(taskView.render())
            })
          })
    	},
    	listTemplate: function(list) {
    		var html = $("<div>")
    		html.append("<h2>" + list.title + "</h2>");
    	  html.append("<div class='tasks'></div>");
    		html.append("<div class='tasks'></div>")
    		return(html)
    	}
}
