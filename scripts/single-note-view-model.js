(function (a) {
    var persister = new dataPersister.get("http://localhost:61680/api/");

    var viewModel = kendo.observable({
        id: "",
        title: "",
        description: "",
        imageUrl: "",
        //videoUrl: "",
        deleteButton: deleteStuff
    });

    function init(e) {
        kendo.bind($("#single-note-view"), viewModel);

        loadNote(e.view.params.id);
    }

    function deleteStuff() {
        app.application.pane.loader.show();
        var id = viewModel.get("id");

        persister.notes.destroy(id)
        .then(function (data) {
            app.application.pane.loader.hide();
            alert("Deleted!");
        }, function (data) {
            app.application.pane.loader.hide();
            $(".validationError").text(data.responseText);
        });
    }

    function loadNote(id) {
        app.application.pane.loader.show();
        persister.notes.getById(id)
        .then(function (data) {
            app.application.pane.loader.hide();
            viewModel.set("id", data.Id);
            viewModel.set("title", data.Title);
            viewModel.set("description", data.Description);
            viewModel.set("imageUrl", data.ImagesUrls[0].Path);
            //viewModel.set("videoUrl", data.VideosUrls[0].Path);
        }, function (data) {
            app.application.pane.loader.hide();
            $(".validationError").text(data.responseText);
        });
    }

    a.singleNote = {
        init: init
    };
}(app));
