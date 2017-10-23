var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope, $http) {
    $scope.master = {
        // dummie data
        firstName:"John",
        lastName:"Doe",
        phoneNum:"(801)422-4636"};
    $scope.reset = function() {
        // just copies the dummy data and populates the form.
        $scope.user = angular.copy($scope.master);
        $scope.responseMSG = "";
    };
    $scope.sendSMS = function(firstName, lastName, phoneNum) {
        console.log("Attempting to send sms");
        $http({
            url: 'https://www.searchit.today/send-sms',
            method: "POST",
            data: {
                "fName": firstName,
                "lName": lastName,
                "pNum": phoneNum
            },
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            transformRequest: function (obj) {
                var str = [];
                for(var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                };
                return str.join("&");
            }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.responseMSG = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.error = response.statusText;
        });
    };
    $scope.reset();
});