window.dataPersister = (function () {
    var UsersPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl
        },
        login: function (email, password) {
            var user = {
                email: email,
                authcode: CryptoJS.SHA1(password).toString()
            };

            return httpRequester.postJSON(this.apiUrl + "/login", user)
            .then(function (data) {
                localStorage.setItem("sessionKey", data.sessionKey);
                localStorage.setItem("username", data.username);
            });
        },
        register: function (password, mail) {
            var user = {
                authcode: CryptoJS.SHA1(password).toString(),
                email: mail
            };

            return httpRequester.postJSON(this.apiUrl + "/register", user).then(function (data) {
                localStorage.setItem("username", data.username);
                localStorage.setItem("sessionKey", data.sessionKey);
            });
        },
        logout: function () {
            var sessionKey = localStorage.getItem("sessionKey");
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.putJSON(this.apiUrl + "/logout", null, headers).then(function () {
                    localStorage.clear();
                });
            }
        },
        isLogin: function () {
            if (localStorage.getItem("sessionKey") == null) {
                return false;
            }
            else {
                return true;
            }
        },
        currentUser: function () {
            return localStorage.getItem("username");
        }
    });

    var TodosPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        create: function (title, description, dateAdded, category) {
            var todo = {
                title: title,
                description: description,
                date: dateAdded,
                category: category
            };

            var sessionKey = localStorage.getItem("sessionKey");
            console.log();
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.postJSON(this.apiUrl + "/create", todo, headers);
            }
        },
        all: function () {
            var sessionKey = localStorage.getItem("sessionKey");
           
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "/all", headers);
            }
        },
        getById: function (id) {
            var sessionKey = localStorage.getItem("sessionKey");

            console.log();
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "/getbyid/" + id, headers);
            }
        },
        update: function (id) {
            var sessionKey = localStorage.getItem("sessionKey");
            console.log(sessionKey);
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.postJSON(this.apiUrl + "/update/" + id, null, headers);
            }
        },
        destroy: function (id) {
            var sessionKey = localStorage.getItem("sessionKey");
            console.log(sessionKey);
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.postJSON(this.apiUrl + "/delete/" + id, null, headers);
            }
        }
    });

    var StuffesPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        all: function () {
            var sessionKey = localStorage.getItem("sessionKey");

            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "/all", headers);
            }
        },
        byDate: function (day, month, year) {
            var sessionKey = localStorage.getItem("sessionKey");

            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "/byDate/" + day + "/" + month + "/" + year, headers);
            }
        }
    });

    var NotesPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        create: function (title, description, imageUlrs, videoUrl) {
            var imagesArr = [];
            imagesArr.push(imageUlrs);

            var videosArr = [];
            videosArr.push(videoUrl);

            var note = {
                Title: title,
                Text: description,
                Images: imagesArr,
                Videos: videosArr
            };

            var sessionKey = localStorage.getItem("sessionKey");

            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.postJSON(this.apiUrl + "/create", note, headers);
            }
        },
        all: function () {
            var sessionKey = localStorage.getItem("sessionKey");

            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "/all/", headers);
            }
        },
        getById: function (id) {
            var sessionKey = localStorage.getItem("sessionKey");

            console.log();
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "/getbyid/" + id, headers);
            }
        },
        destroy: function (id) {
            var sessionKey = localStorage.getItem("sessionKey");
            console.log(sessionKey);
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.postJSON(this.apiUrl + "/delete/" + id, null, headers);
            }
        }
    });

    var EventsPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        create: function (title, description, startDate, endDate) {
            var event = {
                Title: title,
                Description: description,
                EndDate: endDate,
                StartDate: startDate
            };

            var sessionKey = localStorage.getItem("sessionKey");
   
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.postJSON(this.apiUrl + "/create", event, headers);
            }
        },
        all: function () {
            var sessionKey = localStorage.getItem("sessionKey");

            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "/all/", headers);
            }
        },
        getById: function (id) {
            var sessionKey = localStorage.getItem("sessionKey");

            console.log();
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "/getbyid/" + id, headers);
            }
        },
        destroy: function (id) {
            var sessionKey = localStorage.getItem("sessionKey");
            console.log(sessionKey);
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.postJSON(this.apiUrl + "/delete/" + id, null, headers);
            }
        }
    });

    var MainPersister = Class.create({
        init: function (rootUrl) {
            this.rootUrl = rootUrl;
            this.users = new UsersPersister(rootUrl + "users");
            this.todos = new TodosPersister(rootUrl + "todos");
            this.stuffes = new StuffesPersister(rootUrl + "stuffes");
            this.notes = new NotesPersister(rootUrl + "notes");
            this.events = new EventsPersister(rootUrl + "events");
        }
    });

    return {
        get: function (rootUrl) {
            return new MainPersister(rootUrl);
        }
    }
}());
