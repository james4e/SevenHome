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
    var text = [
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
    $scope.text = {};
    for (var i = 0; i < text.length; i++) {
        $scope.text[text[i]] = translation[text[i]];
    }
});

scotchApp.controller('instructorController', function ($scope) {
    var text = [
        'instructors',
        'teacher1text', 'teacher1title',
        'teacher2text', 'teacher2title',
        'teacher3text', 'teacher3title',
        'teacher4text', 'teacher4title'
    ];
    $scope.text = {};
    for (var i = 0; i < text.length; i++) {
        $scope.text[text[i]] = translation[text[i]];
    }
});