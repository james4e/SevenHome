angular.module('scotchApp', [
    'ngLoadScript',
    'ngRoute',
    'scotchApp.controllers',
    'scotchApp.services',
    'ngTagsInput',
    'ngFileUpload',
    'toaster',
    'ngAnimate'
]).config([
    '$httpProvider',
    function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]).config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://' + globalConfig.serverIP + ':8081/v1/teacher/signup'
    ]);
}]).config(function ($routeProvider) {

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
        .when('/mentor', {
            templateUrl: 'pages/single-mentor.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});