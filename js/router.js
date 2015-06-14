//Created by Shiyang Fei on 6/12/2015

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