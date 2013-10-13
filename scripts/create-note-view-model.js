(function (a) {
    var persister = new dataPersister.get("http://mobileorganizer.apphb.com/api/");
 
    var viewModel = kendo.observable({
        title: "",
        description: "",
        imageUrl: "",
        //videoUrl: "",
        createButton: create
    });

    function init() {
        kendo.bind($("#create-note-view"), viewModel);
    }

    function create() {
        console.log(viewModel);
        app.application.pane.loader.show();

        var errorsText = "";
        var isValidModel = true;

        if (this.get("title").length < 1) {
            errorsText += "Title is required! <br/>";
            isValidModel = false;
        }

        if (this.get("description").length < 1) {
            errorsText += "Description is required!  <br/>";
            isValidModel = false;
        }

        if (isValidModel) {
            viewModel.imageUrl = localStorage.getItem("image");
            //viewModel.videoUrl = localStorage.getItem("video");
            console.log(viewModel);
            $(".validationError").html("");
            persister.notes.create(this.get("title"), this.get("description"), this.get("imageUrl"), this.get("videoUrl"), "business")
            .then(function (data) {
                app.application.pane.loader.hide();
                navigator.notification.alert("Created!");
                viewModel.set("title", "");
                viewModel.set("description", "");
                viewModel.set("imageUrl", "");
                //viewModel.set("videoUrl", "");
            }, function (data) {
                app.application.pane.loader.hide();
                $(".validationError").text(data.responseText);
            });
        }
        else {
            app.application.pane.loader.hide();
            $(".validationError").html(errorsText);
        }
    }

    a.createNote = {
        init: init
    };
}(app));
