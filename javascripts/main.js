var scotchApp = angular.module('scotchApp', ['ngLoadScript', 'ngRoute']);

scotchApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'aboutController'
        })
        .when('/instructor', {
            templateUrl: 'pages/instructor.html',
            controller: 'instructorController'
        })
        .when('/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'contactController'
        })
        .when('/studentreg', {
            templateUrl: 'pages/student-signup.html',
            controller: 'studentSignUpController'
        })
        .when('/teacherreg', {
            templateUrl: 'pages/teacher-signup.html',
            controller: 'teacherSignUpController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

scotchApp.controller('homeController', function ($scope) {
    $scope.pageClass = 'page-home';
});

scotchApp.controller('aboutController', function ($scope) {
    $scope.pageClass = 'page-about';
});

scotchApp.controller('instructorController', function ($scope) {
    $scope.pageClass = 'page-contact';
});

scotchApp.controller('contactController', function ($scope) {
    $scope.pageClass = 'page-contact';
});

scotchApp.controller('studentSignUpController', function ($scope) {
    $scope.pageClass = 'page-contact';
});

scotchApp.controller('teacherSignUpController', function ($scope) {
    $scope.pageClass = 'page-contact';
});