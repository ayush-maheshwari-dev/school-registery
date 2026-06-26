mainApp.factory("Crud", function ($http, API_BASE) {
    return function (resource) {
        var url = API_BASE + "/" + resource;
        return {
            getAll: function () { return $http.get(url); },
            add: function (data) { return $http.post(url + "/add", data); },
            update: function (id,data) { return $http.put(url + "/" + id, data); },
            remove: function (id) { return $http.delete(url + "/" + id); },
            search: function (name) { return $http.get(url + "/search", { params: { name: name } }); }
        };
    };
});

mainApp.factory("StudentService", function (Crud) { return Crud("students"); });
mainApp.factory("TeacherService", function (Crud) { return Crud("teachers"); });