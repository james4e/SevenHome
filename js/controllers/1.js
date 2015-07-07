/**
 * Created by shiyangfei on 7/6/15.
 */
angular.module('scotchApp.controllers.studentSignUpController', []).
    controller('studentSignUpController', ["$scope", "sevenAPIService", 'toaster', function ($scope, sevenAPIService, toaster) {
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
                    toaster.error({title: translation.error, body: translation.passworddifferror});
                }
            } else {
                $scope.showerror = true;
                $scope.errorMsg = translation.generalformerror;
                toaster.error({title: translation.error, body: translation.generalformerror});
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
                        toaster.success({title: translation.success, body: translation.signupsuccess});
                    } else {
                        $scope.showerror = true;
                        $scope.errorMsg = data.errorMsg;
                        toaster.error({title: translation.error, body: data.errorMsg});
                    }
                }
            );
        };
    }]
);