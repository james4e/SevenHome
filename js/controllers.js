angular.module('scotchApp.controllers', []).
    controller('headerController', ["$scope", "$q", function ($scope, $q) {
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
    controller('homeController', ["$scope", "$q", function ($scope) {
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
    }]).
    controller('contactController', ["$scope", "$q", function ($scope) {
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
    }]).
    controller('signInController', ["$scope", "$q", function ($scope) {
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
    }]).
    controller('footerController', ["$scope", "$q", function ($scope) {
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
    }]).
    controller('studentSignUpController', ["$scope", "sevenAPIService", function ($scope, sevenAPIService) {
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }

        $scope.formData = {};
        $scope.showsuccess = false;
        $scope.showerror = false;
        $scope.submitForm = function () {
            $scope.showsuccess = false;
            $scope.showerror = false;
            var data = $scope.formData;
            if (data.spam && data.spam.length > 0) {
                return;
            }
            if ($scope.studentSignUp.$valid) {
                if (data.password == data.password1) {
                    $scope.triggerSubmission();
                }
                else {
                    $scope.showerror = true;
                    $scope.errorMsg = translation.passworddifferror;
                }
            } else {
                $scope.showerror = true;
                $scope.errorMsg = translation.generalformerror;
            }
        };
        $scope.triggerSubmission = function () {
            $scope.showerror = false;
            $scope.signupSuccessText = translation.signupsuccess;

            sevenAPIService.studentSignUp($scope.formData)
                .then(function (response) {
                    var data = response.data;
                    if (data.success) {
                        $scope.showsuccess = true;
                        $scope.formData = {};
                    } else {
                        $scope.showerror = true;
                        $scope.errorMsg = data.errorMsg;
                    }
                });
        }
    }]).
    controller('instructorSignUpController', function ($scope, sevenAPIService, $timeout) {
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
        $scope.formData = {};
        $scope.showsuccess = false;
        $scope.showerror = false;
        $scope.submitForm = function () {
            $scope.showsuccess = false;
            $scope.showerror = false;
            var data = $scope.formData;
            if (data.spam && data.spam.length > 0) {
                return;
            }
            if ($scope.instructorSignUp.$valid) {
                if (data.password == data.password1) {
                    $scope.triggerSubmission();
                }
                else {
                    $scope.showerror = true;
                    $scope.errorMsg = translation.passworddifferror;
                }
            } else {
                $scope.showerror = true;
                $scope.errorMsg = translation.generalformerror;
            }
        };
        $scope.triggerSubmission = function () {
            $scope.showerror = false;
            $scope.signupSuccessText = translation.instructorsignupsuccess;


            sevenAPIService.mentorSignUp($scope.formData).
                then(function (response) {
                    var data = response.data;
                    if (data.success) {
                        $scope.showsuccess = true;
                        $scope.formData = {};
                    } else {
                        $scope.showerror = true;
                        $scope.errorMsg = data.errorMsg;
                    }
                });
        };
        $scope.loadTags = function (query) {
            return sevenAPIService.getDefaultTags();
        };
        $scope.loadMajors = function (query) {
            return sevenAPIService.getDefaultMajors();
        };
    }).
    controller('instructorController', function ($scope) {
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
    }
);