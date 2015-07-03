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
        sevenAPIService.getCountries().then(function (response) {
            $scope.countries = response.data;
        });
        sevenAPIService.getSchools().then(function (response) {
            $scope.schools = response.data;
        });
        sevenAPIService.getDegrees().then(function (response) {
            $scope.degrees = response.data;
        });
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
    }).
    controller('instructorController', function ($scope, sevenAPIService, $routeParams) {
        $scope.colors = ['#005F9F', '#1F9DC0', '#5BBBBB', '#FDDB08', '#F5851F',
            '#ED1C24', '#FF7F27', '#EDDE76', '#85AA9E', '#668CA6'];
        $scope.text = {};
        $scope.view = $routeParams.view || 'school';
        $scope.views = [
            {
                name: 'school',
                text: 'School'
            },
            {
                name: 'majors',
                text: 'Major'
            },
            {
                name: 'subjects',
                text: 'Subject'
            }
        ];
        _.each($scope.views, function (view) {
                view.status = view.name == $scope.view ? 'current' : ''
            }
        );
        $scope.selectedKeys = [];
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
            $scope.formattedTeacherList = $scope.processSections(sections);
        };
        $scope.processSections = function (sections) {
            var array = [],
                filterOptions = [{
                    name: 'All',
                    status: $scope.selectedKeys.length > 0 ? 'inactive' : 'active'
                }];
            for (var key in sections) {
                var visible = ($scope.selectedKeys.length == 0) || ($scope.selectedKeys.indexOf(key) > -1);
                filterOptions.push({
                    name: key,
                    status: $scope.selectedKeys.indexOf(key) > -1 ? 'active' : 'inactive'
                });
                array.push({
                    key: key,
                    data: sections[key].rows,
                    visible: visible
                })
            }
            $scope.filterOptions = _.sortBy(filterOptions, 'name');
            return array;
        };
        $scope.onViewSelect = function (event) {
            $scope.selectedKeys = [];
            $scope.view = event.target.attributes['data-cat'].value;
            $scope.refreshView();
        };
        $scope.onFilterToggle = function (event, index) {
            var status = $scope.filterOptions[index].status,
                key = $scope.filterOptions[index].name;
            if (status != 'active') {
                $scope.filterOptions[index].status = 'active';
                if (key == 'All') {
                    _.each($scope.filterOptions, function (option) {
                            if (option.name != 'All') {
                                option.status = 'inactive';
                            }
                        }
                    );
                    $scope.selectedKeys = [];
                } else {
                    _.each($scope.filterOptions, function (option) {
                        if (option.name == 'All') {
                            option.status = 'inactive';
                        }
                    });
                    $scope.selectedKeys.push(key);
                }
            }
            else {
                $scope.filterOptions[index].status = 'inactive';
                _.remove($scope.selectedKeys, function (n) {
                    return n == key;
                });
                if ($scope.selectedKeys.length == 0) {
                    $scope.filterOptions[0].status = 'active';
                }
            }
            $scope.refreshView();
        };
        $scope.refreshView = function () {
            $scope.formatTeacherList($scope.teacherList);
        }
    }
);