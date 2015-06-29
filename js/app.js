angular.module('scotchApp', [
    'ngLoadScript',
    'ngRoute',
    'scotchApp.controllers',
    'scotchApp.services',
    'ngTagsInput'
]).config([
    '$httpProvider',
    function ($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]).config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/instructor', {
            templateUrl: 'pages/instructor.html',
            controller: 'instructorController'
        })
        .when('/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'contactController'
        })
        .when('/signin', {
            templateUrl: 'pages/signin.html',
            controller: 'signInController'
        })
        .when('/studentreg', {
            templateUrl: 'pages/student-signup.html',
            controller: 'studentSignUpController'
        })
        .when('/instructorreg', {
            templateUrl: 'pages/instructor-signup.html',
            controller: 'instructorSignUpController'
        })
        .otherwise({
            redirectTo: '/'
        });
});