(function (a) {
    var persister = new dataPersister.get("http://mobileorganizer.apphb.com/api/");

    var viewModel = kendo.observable({
        id: "",
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        deleteButton: deleteStuff
    });

    function init(e) {
        kendo.bind($("#single-event-view"), viewModel);

        loadEvent(e.view.params.id);
    }

    function deleteStuff() {
        app.application.pane.loader.show();
        var id = viewModel.get("id");

        persister.events.destroy(id)
        .then(function (data) {
            app.application.pane.loader.hide();
            alert("Deleted!");
        }, function (data) {
            app.application.pane.loader.hide();
            $(".validationError").text(data.responseText);
        });
    }

    function loadEvent(id) {
        app.application.pane.loader.show();
        persister.events.getById(id)
        .then(function (data) {
            app.application.pane.loader.hide();
            viewModel.set("id", data.Id);
            viewModel.set("title", data.Title);
            viewModel.set("description", data.Description);
            viewModel.set("startDate", data.StartDate.split("T")[0]);
            viewModel.set("endDate", data.EnddDate.split("T")[0]);
        }, function (data) {
            app.application.pane.loader.hide();
            $(".validationError").text(data.responseText);
        });
    }

    a.singleEvent = {
        init: init
    };
}(app));
