var scotchApp = angular.module('scotchApp', ['ngLoadScript', 'ngRoute']);

scotchApp.controller('headerController', function ($scope) {
    $scope.selectCategory = function (lang) {
        console.log(lang);
        localStorage.setItem("seven-education-user-lang", lang);
        window.location.reload();
    };

    $scope.titles = {};
    for (var fieldName in translation) {
        $scope.titles[fieldName] = translation[fieldName];
    }
});

scotchApp.controller('homeController', function ($scope) {
    $scope.text = {};
    for (var fieldName in translation) {
        $scope.text[fieldName] = translation[fieldName];
    }
});

scotchApp.controller('instructorController', function ($scope) {
    $scope.text = {};
    for (var fieldName in translation) {
        $scope.text[fieldName] = translation[fieldName];
    }
});

scotchApp.controller('contactController', function ($scope) {
    $scope.text = {};
    for (var fieldName in translation) {
        $scope.text[fieldName] = translation[fieldName];
    }
});

scotchApp.controller('studentSignUpController', function ($scope) {
    $scope.text = {};
    for (var fieldName in translation) {
        $scope.text[fieldName] = translation[fieldName];
    }
});

scotchApp.controller('instructorSignUpController', function ($scope) {
    $scope.text = {};
    for (var fieldName in translation) {
        $scope.text[fieldName] = translation[fieldName];
    }
});

scotchApp.controller('signInController', function ($scope) {
    $scope.text = {};
    for (var fieldName in translation) {
        $scope.text[fieldName] = translation[fieldName];
    }
});

scotchApp.controller('footerController', function ($scope) {
    $scope.text = {};
    for (var fieldName in translation) {
        $scope.text[fieldName] = translation[fieldName];
    }
});