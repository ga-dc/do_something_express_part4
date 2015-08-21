var ListView = function(list) {
	this.list = list;
	this.$el = $("main");
};

ListView.prototype = {
	render: function() {
		var self = this;
		self.$el.append(self.listTemplate(self.list))
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
		// html.append("<button class='showTasks'>Show Tasks</button>");
		html.append("<div class='tasks'></div>");
		// append the .$el to the div with class artists in our view.
		html.append("<div class='tasks'></div>")
		return(html)
	}
}
