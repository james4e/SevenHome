//Created by Shiyang Fei on 6/29/2015
angular.module('scotchApp.services', [])
    .factory('sevenAPIService', function ($http, Upload) {
        var apiUrlPrefix = 'http://121.199.18.221:8081/v1',
            sevenAPI = {};

        /**************************MENTOR**************************/
        sevenAPI.loadMentorList = function () {
            return $http.get('data/mentor-list.json');
        };


        /**************************SIGN UP**************************/
        sevenAPI.mentorSignUp = function (scope) {
            return (
                Upload.upload({
                    url: apiUrlPrefix + '/teacher/signup',
                    method: 'POST',
                    fields: scope.formData,
                    file: scope.profileImage[0],
                    fileFormDataName: 'profileImage',
                    headers: {
                        'Content-Type': undefined
                    }
                }));
        };

        sevenAPI.studentSignUp = function (formData) {
            return ($http({
                url: apiUrlPrefix + '/student/signup',
                method: 'POST',
                data: angular.toJson(formData),
                headers: {
                    'Content-Type': undefined
                }
            }));
        };

        sevenAPI.getDefaultTags = function (query) {
            return (Upload.upload({
                url: 'student/signup',
                method: 'OPTIONS',
                fields: {name: '123'},
                file: null,
                fileFormDataName: 'profileImage',
                headers: {
                    'Content-Type': undefined
                }
            }));
        };

        sevenAPI.getDefaultMajors = function (query) {
            return $http.get('http://121.199.18.221:8081/v1/');
        };

        sevenAPI.getCountries = function (query) {
            return $http.get('data/countries.json');
        };

        return sevenAPI;
    }
);