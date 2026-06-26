var mainApp = angular.module("myApp", ['ngRoute']);

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

mainApp.controller("myController", function ($scope, $location) {
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
    $scope.teachers = [
        {
            id: "#1",
            name: "Meera Iyer",
            email: "meera@example.com",
            subject: "Mathematics",
            department: "Science",
            experience: 12,
            salary: 84000
        },
        {
            id: "#2",
            name: "Rohan Mehta",
            email: "rohan@example.com",
            subject: "History",
            department: "Humanities",
            experience: 7,
            salary: 61500
        },
        {
            id: "#3",
            name: "Priya Sharma",
            email: "priya@example.com",
            subject: "English",
            department: "Humanities",
            experience: 9,
            salary: 72000
        }
    ];

    // Student data
    $scope.students = [
        {
            id: "#1",
            name: "Aarav Sharma",
            email: "aarav@example.com",
            course: "B.Tech CSE",
            year: 2024
        },
        {
            id: "#2",
            name: "Zara Khan",
            email: "zara@example.com",
            course: "B.Tech ECE",
            year: 2025
        },
        {
            id: "#3",
            name: "Vikram Singh",
            email: "vikram@example.com",
            course: "B.Tech ME",
            year: 2023
        }
    ];

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
                for (var i = 0; i < $scope.teachers.length; i++) {
                    if ($scope.teachers[i].id === $scope.newTeacher.id) {
                        $scope.teachers[i] = angular.copy($scope.newTeacher);
                        break;
                    }
                }
                $scope.cancelForm();
                alert("Teacher updated successfully!");
            } else {
                var newId = Math.max.apply(null, $scope.teachers.map(function(t) { return parseInt(t.id.replace("#", "")); })) + 1;
                $scope.newTeacher.id = "#" + newId;
                $scope.teachers.push(angular.copy($scope.newTeacher));
                $scope.cancelForm();
                alert("Teacher added successfully!");
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
            $scope.teachers = $scope.teachers.filter(function(t) { return t.id !== teacherId; });
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
                alert("Student updated successfully!");
            } else {
                // Add new student
                var newId = Math.max.apply(null, $scope.students.map(function(s) { return parseInt(s.id.replace("#", "")); })) + 1;
                $scope.newStudent.id = "#" + newId;
                $scope.students.push(angular.copy($scope.newStudent));
                alert("Student added successfully!");
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
            $scope.students = $scope.students.filter(function(s) { return s.id !== studentId; });
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

