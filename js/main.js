var scotchApp = angular.module('scotchApp', ['ngLoadScript', 'ngRoute']);

scotchApp.controller('headerController', function ($scope) {
    $scope.selectCategory = function (lang) {
        console.log(lang);
        localStorage.setItem("seven-education-user-lang", lang);
        window.location.reload();
    };
    var titles = ['home', 'instructors', 'contact', 'signin', 'joinus',
        'asinstructor', 'asstudent', 'language'];
    $scope.titles = {};
    for (var i = 0; i < titles.length; i++) {
        $scope.titles[titles[i]] = translation[titles[i]];
    }
});

scotchApp.controller('homeController', function ($scope) {
    var homeText = [
        'slide1header', 'slide1body',
        'slide2header', 'slide2body', 'slide2btn',
        'slide3header', 'slide3body', 'slide3btn',
        'aboutus',
        'box1header', 'box1body',
        'box2header', 'box2body',
        'box3header', 'box3body',
        'milestone', 'milestonetext',
        'milestone1', 'milestone2', 'milestone3',
        'clientheader'
    ];
    $scope.homeText = {};
    for (var i = 0; i < homeText.length; i++) {
        $scope.homeText[homeText[i]] = translation[homeText[i]];
    }
});