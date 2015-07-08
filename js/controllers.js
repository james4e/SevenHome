angular.module('scotchApp.controllers', []).
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
    }]).
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
                });
        };
    }]).
    controller('instructorController', ["$scope", "sevenAPIService", '$routeParams', '$rootScope', '$location', function ($scope, sevenAPIService, $routeParams, $rootScope, $location) {
        $scope.text = {};
        for (var fieldName in translation) {
            $scope.text[fieldName] = translation[fieldName];
        }
        $scope.colors = ['#005F9F', '#1F9DC0', '#5BBBBB', '#FDDB08', '#F5851F',
            '#ED1C24', '#FF7F27', '#EDDE76', '#85AA9E', '#668CA6'];
        $scope.view = $routeParams.view || 'school';
        $scope.profileUrlPrefix = sevenAPIService.profileUrlPrefix;
        $scope.views = [
            {
                name: 'school',
                text: translation.slide2btn1
            },
            {
                name: 'majors',
                text: translation.slide2btn2
            },
            {
                name: 'subjects',
                text: translation.slide2btn3
            }
        ];
        _.each($scope.views, function (view) {
                view.status = view.name == $scope.view ? 'current' : '';
            }
        );
        $scope.selectedKeys = [];
        sevenAPIService.getTeacherList().then(function (response) {
            var res = response.data;
            if (res.success) {
                _.each(res.data, function (t) {
                    if (t.majors) {
                        if (sevenAPIService.isJSON(t.majors)) {
                            t.majors = t.majors.replace('\\', '');
                            t.majors = _.pluck(JSON.parse(t.majors), 'text');
                        }
                    }
                    if (t.subjects) {
                        if (sevenAPIService.isJSON(t.subjects)) {
                            t.subjects = t.subjects.replace('\\', '');
                            t.subjects = _.pluck(JSON.parse(t.subjects), 'text');
                        }
                    }

                });
                $scope.teacherList = res.data;
                $scope.formatTeacherList(res.data);
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
                    if (key && key.length > 0) {
                        if (!sections[key]) {
                            sections[key] = {
                                rows: [{teachers: [r]}]
                            };
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
            }
            $scope.formattedTeacherList = $scope.processSections(sections);
        };
        $scope.processSections = function (sections) {
            var array = [],
                filterOptions = [];
            for (var key in sections) {
                var visible = ($scope.selectedKeys.length === 0) || ($scope.selectedKeys.indexOf(key) > -1);
                filterOptions.push({
                    name: key,
                    status: $scope.selectedKeys.indexOf(key) > -1 ? 'active' : 'inactive'
                });
                array.push({
                    key: key,
                    data: sections[key].rows,
                    visible: visible
                });
            }
            $scope.filterOptions = _.sortBy(filterOptions, 'name');
            $scope.filterOptions.splice(0, 0, {
                name: 'All',
                status: $scope.selectedKeys.length > 0 ? 'inactive' : 'active'
            });
            array = _.sortBy(array, 'key');
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
                if ($scope.selectedKeys.length === 0) {
                    $scope.filterOptions[0].status = 'active';
                }
            }
            $scope.refreshView();
        };
        $scope.refreshView = function () {
            if ($scope.teacherList) {
                $scope.formatTeacherList($scope.teacherList);
            }
            $scope.formatTeacherList($scope.teacherList);
        };
        $scope.onMentorSelected = function (mentorInfo) {
            sevenAPIService.mentorInfo = mentorInfo;
            $location.path('/mentor');
            window.scrollTo(0, 0);
        };
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
    }]);