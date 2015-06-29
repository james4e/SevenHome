//Created by Shiyang Fei on 6/29/2015
angular.module('scotchApp.services', [])
    .factory('sevenAPIService', function ($http) {
        var apiUrlPrefix = 'http://121.199.18.221:8081/v1',
            sevenAPI = {};

        sevenAPI.mentorSignUp = function (formData) {
            return ($http({
                url: apiUrlPrefix + '/teacher/signup',
                method: 'POST',
                data: angular.toJson(formData),
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

        return sevenAPI;
    }
);