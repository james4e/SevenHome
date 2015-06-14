var scotchApp = angular.module('scotchApp', ['ngLoadScript', 'ngRoute']);

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