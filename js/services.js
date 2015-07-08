//Created by Shiyang Fei on 6/29/2015
angular.module('scotchApp.services', [])
    .factory('sevenAPIService', function ($http, Upload) {
        var sevenAPI = {};
        sevenAPI.apiUrlPrefix = 'http://' + globalConfig.serverIP + ':8081/v1';
        sevenAPI.profileUrlPrefix = 'http://' + globalConfig.serverIP + ':8081/profile/';
        sevenAPI.linUrlPrefix = 'https://shiyang-fei.github.io/data';

        /**************************SIGN UP**************************/
        sevenAPI.mentorSignUp = function (scope) {
            var submissionData = scope.formData;
            if (submissionData.country) {submissionData.country = submissionData.country.name || submissionData.country;}
            if (submissionData.degree) {submissionData.degree = submissionData.degree.text || submissionData.degree;}
            if (submissionData.school) {submissionData.school = submissionData.school.text || submissionData.school;}

            return (
                Upload.upload({
                    url: sevenAPI.apiUrlPrefix + '/teacher/signup',
                    method: 'POST',
                    fields: submissionData,
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

        sevenAPI.getSubjects = function (query) {
            return $http.get(sevenAPI.linUrlPrefix + '/default-subjects.json');
        };

        sevenAPI.getMajors = function (query) {
            return $http.get(sevenAPI.linUrlPrefix + '/default-majors.json');
        };

        sevenAPI.getCountries = function (query) {
            return $http.get(sevenAPI.linUrlPrefix + '/countries.json');
        };

        sevenAPI.getSchools = function () {
            return $http.get(sevenAPI.linUrlPrefix + '/universities.json');
        };

        sevenAPI.getDegrees = function () {
            return $http.get(sevenAPI.linUrlPrefix + '/degrees.json');
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

        sevenAPI.isJSON = function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        };

        return sevenAPI;
    }
);