//Created by Shiyang Fei on 6/29/2015
angular.module('scotchApp.services', [])
    .factory('sevenAPIService', function ($http, Upload) {
        var sevenAPI = {};
        sevenAPI.apiUrlPrefix = 'http://198.11.176.132:8081/v1';
        sevenAPI.profileUrlPrefix = 'http://198.11.176.132:8081/profile/';


        /**************************MENTOR**************************/
        sevenAPI.loadMentorList = function () {
            return $http.get('data/mentor-list.json');
        };


        /**************************SIGN UP**************************/
        sevenAPI.mentorSignUp = function (scope) {
            return (
                Upload.upload({
                    url: sevenAPI.apiUrlPrefix + '/teacher/signup',
                    method: 'POST',
                    fields: scope.formData,
                    file: scope.profileImage[0],
                    fileFormDataName: 'profileImage',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            );
        };

        sevenAPI.studentSignUp = function (formData) {
            return ($http({
                url: sevenAPI.apiUrlPrefix + '/student/signup',
                method: 'POST',
                data: angular.toJson(formData),
                headers: {
                    'Content-Type': undefined
                }
            }));
        };

        sevenAPI.getDefaultSubjects = function (query) {
            return $http.get('data/default-subjects.json');
        };

        sevenAPI.getDefaultMajors = function (query) {
            return $http.get('data/default-majors.json');
        };

        sevenAPI.getCountries = function (query) {
            return $http.get('data/countries.json');
        };

        sevenAPI.getSchools = function () {
            return $http.get('data/universities.json');
        };

        sevenAPI.getDegrees = function () {
            return $http.get('data/degrees.json');
        };

        sevenAPI.getTeacherList = function () {
            return $http({
                url: sevenAPI.apiUrlPrefix + '/teacher/list-www',
                method: 'POST',
                data: angular.toJson({action: 'load'}),
                headers: {
                    'Content-Type': undefined
                }
            });
        };

        return sevenAPI;
    }
);