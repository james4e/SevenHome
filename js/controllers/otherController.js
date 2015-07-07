/**
 * Created by shiyangfei on 7/6/15.
 */
angular.module('scotchApp.controllers.otherController', []).
    controller('headerController', ["$scope", function ($scope) {
        $scope.selectCategory = function (lang) {
            console.log(lang);
            localStorage.setItem("seven-education-user-lang", lang);
            window.location.reload();
        };

        $scope.titles = {};
        for (var fieldName in translation) {
            $scope.titles[fieldName] = translation[fieldName];
        }
    }]).
    controller('homeController', ["$scope", function ($scope) {
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
    }]).
    controller('contactController', ["$scope", function ($scope) {
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
    }]).
    controller('signInController', ["$scope", function ($scope) {
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
    }]).
    controller('footerController', ["$scope", function ($scope) {
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
    }])
    .controller('singleMentorController', ['$scope', 'sevenAPIService', '$location', function ($scope, sevenAPIService, $location) {
        $scope.text = {};
        $scope.profileUrlPrefix = sevenAPIService.profileUrlPrefix;
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
        $scope.mentorInfo = sevenAPIService.mentorInfo;
        if (!$scope.mentorInfo) {
            $location.path('/instructor');
            return;
        }
    }]
);