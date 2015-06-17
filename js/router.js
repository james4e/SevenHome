//Created by Shiyang Fei on 6/12/2015

scotchApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html'
        })
        .when('/instructor', {
            templateUrl: 'pages/instructor.html'
        })
        .when('/contact', {
            templateUrl: 'pages/contact.html'
        })
        .when('/signin', {
            templateUrl: 'pages/signin.html'
        })
        .when('/studentreg', {
            templateUrl: 'pages/student-signup.html'
        })
        .when('/instructorreg', {
            templateUrl: 'pages/instructor-signup.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});