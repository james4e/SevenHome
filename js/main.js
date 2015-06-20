var scotchApp = angular.module('scotchApp', ['ngLoadScript', 'ngRoute']),
    apiUrlPrefix = 'http://121.199.18.221:8081/v1';

scotchApp.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

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

scotchApp.controller('studentSignUpController', function ($scope, $http) {
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

        $http({
            url: apiUrlPrefix + '/student/signup',
            method: 'POST',
            data: angular.toJson($scope.formData),
            headers: {
                'Content-Type': undefined
            }
        }).then(function(response){
            var data = response.data;
            if (data.success) {
                $scope.showsuccess = true;
            } else {
                $scope.showerror = true;
                $scope.errorMsg = data.errorMsg;
            }
        });
    }
});

scotchApp.controller('instructorSignUpController', function ($scope, $http) {
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

        $http({
            url: apiUrlPrefix + '/teacher/signup',
            method: 'POST',
            data: angular.toJson($scope.formData),
            headers: {
                'Content-Type': undefined
            }
        }).then(function(response){
            var data = response.data;
            if (data.success) {
                $scope.showsuccess = true;
            } else {
                $scope.showerror = true;
                $scope.errorMsg = data.errorMsg;
            }
        });
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