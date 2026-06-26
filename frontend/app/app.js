var mainApp = angular.module("myApp", ['ngRoute']);
// app.js (or a config.js loaded first)
mainApp.constant("API_BASE", "http://localhost:8080");
mainApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/", {
            templateUrl: "views/homeView.html",
            controller: "myController"
        })
        .when("/students", {
            templateUrl: "views/student/students.html",
            controller: "myController"
        })
        .when("/teachers", {
            templateUrl: "views/teacher/teachers.html",
            controller: "myController"
        })
        .otherwise({
            redirectTo: "/"
        });
}]);

mainApp.controller("myController", function ($scope, $location, StudentService, TeacherService) {
    // Keep active tab + title synced with the URL (covers direct load & refresh)
    $scope.$on('$routeChangeSuccess', function () {
        var path = $location.path();
        if (path === '/students') $scope.setTab('students');
        else if (path === '/teachers') $scope.setTab('teachers');
        else $scope.setTab('home');
    });

    $scope.features = [
        {
            icon: "find",
            title: "Search by name",
            description: "Filter students or teachers instantly as you type, straight from the database."
        },
        {
            icon: "edit",
            title: "Add & update",
            description: "Create new records or revise existing ones with a clean, focused form."
        },
        {
            icon: "check",
            title: "Validated entries",
            description: "Every field is checked on save, so emails, year ranges, and salaries stay sane."
        }
    ];

    $scope.entries = [
        {
            path: "/students",
            title: "Students",
            description: "Enrolment records — name, email, course, and year. Add, edit, search, or remove entries.",
            tag: "Manage students"
        },
        {
            path: "/teachers",
            title: "Teachers",
            description: "Faculty records — subject, department, experience, and salary, kept current and consistent.",
            tag: "Manage teachers"
        }
    ];

    // Teacher data
    function loadTeachers() {
        TeacherService.getAll().then(function (res) {
            $scope.teachers = res.data;
        })
    }

    loadTeachers();

    // Student data
    function loadStudents() {
        StudentService.getAll().then(function (res) {
            $scope.students = res.data;
        })
    }

    loadStudents();

    // Form visibility
    $scope.formVisible = false;
    $scope.newTeacher = {};
    $scope.errors = {};

    // Show add form
    $scope.showForm = function () {
        $scope.formVisible = true;
        $scope.editingTeacher = false;
        $scope.newTeacher = {};
        $scope.errors = {};
    };

    // Cancel form
    $scope.cancelForm = function () {
        $scope.formVisible = false;
        $scope.editingTeacher = false;
        $scope.newTeacher = {};
        $scope.errors = {};
    };

    // Save teacher
    $scope.saveTeacher = function () {
        $scope.errors = {};

        // Validation
        if (!$scope.newTeacher.name || $scope.newTeacher.name.length < 3) {
            $scope.errors.name = "Name must be 3+ characters";
        }
        if (!$scope.newTeacher.email || !$scope.newTeacher.email.includes("@")) {
            $scope.errors.email = "Enter valid email";
        }
        if (!$scope.newTeacher.subject) {
            $scope.errors.subject = "Subject is required";
        }
        if (!$scope.newTeacher.department) {
            $scope.errors.department = "Department is required";
        }
        if ($scope.newTeacher.experience === undefined || $scope.newTeacher.experience === null) {
            $scope.errors.experience = "Experience is required";
        }
        if (!$scope.newTeacher.salary || $scope.newTeacher.salary < 30000) {
            $scope.errors.salary = "Salary must be 30,000+";
        }

        // If no errors, add or update teacher
        if (Object.keys($scope.errors).length === 0) {
            if ($scope.editingTeacher) {
                // Update existing row in place (match by id)
                TeacherService.update($scope.newTeacher.id, $scope.newTeacher).then(function () {
                    $scope.cancelForm();
                    loadTeachers();
                    alert("Teacher updated successfully!");
                });
            } else {
                TeacherService.add($scope.newTeacher).then(function(){
                    $scope.cancelForm();
                    loadTeachers();
                    alert("Teacher added successfully!");
                });
            }
        }
    };

    // Edit teacher
    $scope.editTeacher = function (teacher) {
        $scope.newTeacher = angular.copy(teacher);
        $scope.formVisible = true;
        $scope.editingTeacher = true;
        $scope.errors = {};
    };

    // Delete teacher
    $scope.deleteTeacher = function (teacherId) {
        if (confirm("Delete this teacher?")) {
            TeacherService.remove(teacherId).then(function () {
                loadTeachers();
                alert("Teacher deleted successfully!");
            })
        }
    };

    // Student functions
    $scope.newStudent = {};
    $scope.editingStudent = false;

    // Show add student form
    $scope.showStudentForm = function () {
        $scope.formVisible = true;
        $scope.newStudent = {};
        $scope.editingStudent = false;
        $scope.errors = {};
    };

    // Cancel student form
    $scope.cancelStudentForm = function () {
        $scope.formVisible = false;
        $scope.newStudent = {};
        $scope.editingStudent = false;
        $scope.errors = {};
    };

    // Save student
    $scope.saveStudent = function () {
        $scope.errors = {};

        // Validation
        if (!$scope.newStudent.name || $scope.newStudent.name.length < 3) {
            $scope.errors.name = "Name must be 3+ characters";
        }
        if (!$scope.newStudent.email || !$scope.newStudent.email.includes("@")) {
            $scope.errors.email = "Enter valid email";
        }
        if (!$scope.newStudent.course) {
            $scope.errors.course = "Course is required";
        }
        if (!$scope.newStudent.year || $scope.newStudent.year < 1900 || $scope.newStudent.year > 2026) {
            $scope.errors.year = "Enter valid year (1900-2026)";
        }

        // If no errors, add or update student
        if (Object.keys($scope.errors).length === 0) {
            if ($scope.editingStudent) {
                // Update existing student
                StudentService.update($scope.newStudent.id, $scope.newStudent).then(function () {
                    $scope.cancelStudentForm();
                    loadStudents();
                    alert("Student updated successfully!");
                })
            } else {
                // Add new student
                StudentService.add($scope.newStudent).then(function () {
                    $scope.cancelStudentForm();
                    loadStudents();
                    alert("Student added successfully!");
                });
            }
            $scope.cancelStudentForm();
        }
    };

    // Edit student
    $scope.editStudent = function (student) {
        $scope.newStudent = angular.copy(student);
        $scope.formVisible = true;
        $scope.editingStudent = true;
    };

    // Delete student
    $scope.deleteStudent = function (studentId) {
        if (confirm("Delete this student?")) {
            StudentService.remove(studentId).then(function () {
                loadStudents();
                alert("Student deleted successfully!");
            });
        }
    };

    $scope.setTab = function (tabName) {
        $scope.activeTab = tabName;

        if (tabName === "home") {
            $scope.pageTitle = "School Registry";
        } else if (tabName === "students") {
            $scope.pageTitle = "Students - School Registry";
        } else if (tabName === "teachers") {
            $scope.pageTitle = "Teachers - School Registry";
        } else if (tabName === "add") {
            $scope.pageTitle = "Add Record - School Registry";
        }
    };
});

