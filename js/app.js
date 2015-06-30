angular.module('scotchApp', [
    'ngLoadScript',
    'ngRoute',
    'scotchApp.controllers',
    'scotchApp.services',
    'ngTagsInput',
    'ngFileUpload'
]).config([
    '$httpProvider',
    function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]).config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://121.199.18.221:8081/v1/teacher/signup'
    ]);
}]).config(function ($routeProvider) {

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