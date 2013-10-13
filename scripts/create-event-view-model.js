(function (a) {
    var persister = new dataPersister.get("http://mobileorganizer.apphb.com/api/");
 
    var viewModel = kendo.observable({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        createButton: create
    });

    function init() {
        kendo.bind($("#create-event-view"), viewModel);
    }

    function create() {
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

        if (this.get("startDate").length < 1) {
            errorsText += "Start Date is required!  <br/>";
            isValidModel = false;
        }

        if (this.get("endDate").length < 1) {
            errorsText += "End Date is required!  <br/>";
            isValidModel = false;
        }

        var start = new Date(this.get("startDate"));
        var end = new Date(this.get("endDate"));

        if (start > end) {
            errorsText += "Start date must be before end Date!  <br/>";
            isValidModel = false;
        }

        if (isValidModel) {
            $(".validationError").html("");
            persister.events.create(this.get("title"), this.get("description"), this.get("startDate"), this.get("endDate"))
            .then(function (data) {
                app.application.pane.loader.hide();
                navigator.notification.alert("Created!");
                viewModel.set("title", "");
                viewModel.set("description", "");
                viewModel.set("startDate", "");
                viewModel.set("endDate", "");
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

    a.createEvent = {
        init: init
    };
}(app));
