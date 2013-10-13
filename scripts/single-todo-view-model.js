(function (a) {
    var persister = new dataPersister.get("http://mobileorganizer.apphb.com/api/");

    var viewModel = kendo.observable({
        id: "",
        title: "",
        description: "",
        date: "",
        isDone: "",
        doneButton: doneChange,
        deleteButton: deleteStuff
    });

    function init(e) {
        kendo.bind($("#single-todo-view"), viewModel);

        loadTodo(e.view.params.id);
    }

    function doneChange() {
        app.application.pane.loader.show();
        var id = viewModel.get("id");

        persister.todos.update(id)
        .then(function (data) {
            app.application.pane.loader.hide();
            viewModel.set("isDone", "OK");
        }, function (data) {
            app.application.pane.loader.hide();
            $(".validationError").text(data.responseText);
        });
    }

    function deleteStuff() {
        app.application.pane.loader.show();
        var id = viewModel.get("id");

        persister.todos.destroy(id)
        .then(function (data) {
            app.application.pane.loader.hide();
            alert("Deleted!");
        }, function (data) {
            app.application.pane.loader.hide();
            $(".validationError").text(data.responseText);
        });
    }

    function loadTodo(id) {
        app.application.pane.loader.show();
        persister.todos.getById(id)
        .then(function (data) {
            app.application.pane.loader.hide();

            //$("#single-todo-view").attr("data-checked", "")
            viewModel.set("id", data.Id);
            viewModel.set("title", data.Title);
            viewModel.set("description", data.Description);
            viewModel.set("date", data.Date);
            viewModel.set("isDone", data.IsDone);
        }, function (data) {
            app.application.pane.loader.hide();
            $(".validationError").text(data.responseText);
        });
    }

    a.singleTodo = {
        init: init
    };
}(app));
