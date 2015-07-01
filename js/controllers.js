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
    controller('instructorSignUpController', function ($scope, sevenAPIService) {
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
        $scope.formData = {};
        $scope.profileImage = null;
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


            sevenAPIService.mentorSignUp($scope).
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
        $scope.onFileChange = function (files, rejectedFiles) {
            if (rejectedFiles.length > 0) {
                $scope.invalidFileError = $scope.text.fileError;
            } else {
                $scope.invalidFileError = null;
            }
        };
        $scope.loadSubjects = function (query) {
            return sevenAPIService.getDefaultSubjects();
        };
        $scope.loadMajors = function (query) {
            return sevenAPIService.getDefaultMajors();
        };
        $scope.loadCountries = function (query) {
            return sevenAPIService.getCountries();
        };
    }).
    controller('instructorController', function ($scope, sevenAPIService) {
        $scope.text = {};
        $scope.view = 'school';
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
        sevenAPIService.getTeacherList().then(function (response) {
            var res = response.data;
            if (res.success) {
                $scope.teacherList = res.data;
                $scope.formatTeacherList(res.data)
            } else {
                $scope.showerror = true;
                $scope.errorMsg = res.errorMsg;
            }
        });
        $scope.formatTeacherList = function (rs) {
            var view = $scope.view,
                sections = {},
                len = rs.length, r, i, keys,
                len2, j, key;
            for (i = 0; i < len; i++) {
                r = rs[i];
                if (angular.isString(r[view])) {
                    keys = [r[view]];
                }
                if (angular.isArray(r[view])) {
                    keys = r[view];
                }
                len2 = keys.length;
                for (j = 0; j < len2; j++) {
                    key = keys[j];
                    if (!sections[key]) {
                        sections[key] = {
                            rows: [{teachers: [r]}]
                        }
                    } else {
                        var currentRow = sections[key].rows[sections[key].rows.length - 1];
                        if (currentRow.teachers.length >= 4) {
                            currentRow = sections[key].rows.push({
                                teachers: [r]
                            });
                        } else {
                            currentRow.teachers.push(r);
                        }
                    }
                }
            }
            $scope.formattedTeacherList = $scope.changeSectionObjectToArray(sections);
        };
        $scope.changeSectionObjectToArray = function (sections) {
            var array = [];
            for (var key in sections) {
                array.push({
                    key: key,
                    data: sections[key].rows
                })
            }
            console.log(array)
            return array;
        }
    }
);