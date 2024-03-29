﻿(function (a) {
    var persister = new dataPersister.get("http://mobileorganizer.apphb.com/api/");

    var viewModel = kendo.observable({
        email: "",
        password: "",
        loginButton: login,
        registerButton: register
    });

    function init() {
        kendo.bind($("#login-register-view"), viewModel);
    }

    function register() {
        app.application.pane.loader.show();
        var errorsText = "";
        var isValidModel = true;

        if (this.get("password").length < 6) {
            errorsText += "Password must be more then 6!  <br/>";
            isValidModel = false;
        }

        if (this.get("email").indexOf("@") == -1) {
            errorsText += "Invalid Email!  <br/>";
            isValidModel = false;
        }

        if (isValidModel) {
            persister.users.register(this.get("password"), this.get("email"))
            .then(function (data) {
                app.application.pane.loader.hide();
                app.application.navigate("index.html#home-view");
            }, function (data) {
                app.application.pane.loader.hide();
                $(".validationError").text(data.responseText);
            });
        }
        else {
            console.log(errorsText);
            $(".validationError").html(errorsText);
        }
    }

    function login() {
        app.application.pane.loader.show();
        persister.users.login(this.get("email"), this.get("password"))
        .then(function (data) {
            app.application.pane.loader.hide();
            app.application.navigate("index.html#home-view");
        }, function (err) {
            app.application.pane.loader.hide();
            $(".validationError").html(err.responseText);
        });
    }

    a.auth = {
        init: init
    };
}(app));