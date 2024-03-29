/**
 * Created by shiyangfei on 7/6/15.
 */
angular.module('scotchApp.controllers.instructorSignUpController', []).
    controller('instructorSignUpController', ["$scope", "sevenAPIService", 'toaster', function ($scope, sevenAPIService, toaster) {
        console.log('instructorSignUpController');
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
        $scope.formData = {};
        $scope.profileImage = null;
        $scope.showsuccess = false;
        $scope.showerror = false;
        sevenAPIService.getCountries().then(function (response) {
            $scope.countries = response.data;
        });
        sevenAPIService.getSchools().then(function (response) {
            $scope.schools = response.data;
        });
        sevenAPIService.getDegrees().then(function (response) {
            $scope.degrees = response.data;
        });
        sevenAPIService.getSubjects().then(function (response) {
            $scope.subjects = response.data;
        });
        sevenAPIService.getMajors().then(function (response) {
            $scope.majors = response.data;
        });
        $scope.submitForm = function () {
            $scope.showsuccess = false;
            $scope.showerror = false;
            var data = $scope.formData;
            var error = $scope.getFormValidationErrors(data);
            if (!error) {
                $scope.triggerSubmission();
            } else {
                $scope.showerror = true;
                $scope.errorMsg = error;
                toaster.error({title: translation.error, body: error});
            }
        };
        $scope.getFormValidationErrors = function (data) {
            if (data.spam && data.spam.length > 0) {
                return 'We do not accept spam!';
            }
            if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
                return translation.emailerror;
            }
            if (!data.password || !data.password1 || data.password.length < 6
             || data.password.length > 12 || data.password1.length < 6 || data.password1.length > 12) {
                return translation.passworderror;
            }
            if (data.password != data.password1) {
                return translation.passworddifferror;
            }
            if (!$scope.profileImage || $scope.profileImage.length == 0) {
                return translation.selectprofile;
            }
            if (!data.name) {
                return translation.namerror;
            }
            if (!data.weixin) {
                return translation.weixinerror;
            }
            if (!data.subjects || data.subjects.length == 0) {
                return translation.subjectserror;
            }
            if (!data.majors || data.majors.length == 0) {
                return translation.majorserror;
            }
            if (!data.degree || data.degree.length == 0) {
                return translation.degreeerror;
            }
            if (!data.country || data.country.length == 0) {
                return translation.countryerror;
            }
            if (!data.state) {
                return translation.stateerror;
            }
            if (!data.zip) {
                return translation.ziperror;
            }
            if (!data.description) {
                return translation.descriptionerror;
            }
        };
        $scope.triggerSubmission = function () {
            $scope.showerror = false;
            $scope.signupSuccessText = translation.instructorsignupsuccess;
            $scope.disableSubmitBtn = true;
            sevenAPIService.mentorSignUp($scope).
                then(function (response) {
                    var data = response.data;
                    if (data.success) {
                        $scope.showsuccess = true;
                        $scope.formData = {};
                        $scope.profileImage = null;
                        window.scrollTo(0, 0);
                        toaster.success({title: translation.success, body: translation.instructorsignupsuccess});
                    } else {
                        $scope.showerror = true;
                        $scope.errorMsg = data.errorMsg;
                        toaster.error({title: translation.error, body: data.errorMsg});
                    }
                    $scope.disableSubmitBtn = false;
                });
        };
        $scope.onFileChange = function (files, rejectedFiles) {
            if (rejectedFiles.length > 0) {
                $scope.invalidFileError = $scope.text.fileError;
            } else {
                $scope.invalidFileError = null;
            }
        };
        $scope.loadSubjects = function (query) {
            return _.sortBy($scope.subjects, 'text');
        };
        $scope.loadMajors = function (query) {
            return _.sortBy($scope.majors, 'text');
        };
    }]
);