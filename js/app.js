// main ng module for the application
// mod by CS
// written on 25-01-2016
(function () {
    var app = angular.module('QuestionApp', ['ui.bootstrap', 'ngRoute']);

    // ROUTING //
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'mainController'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'loginController'
            })
            .when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'registerController'
            })
    });

    // SERVICES //
    app.factory('questionService', function ($http) {
        var baseUrl = 'api/';

        return {
            registerUser: function (data) {
                return $http({
                    method: 'POST',
                    url: baseUrl + 'registerUser.php',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            }
        };
    })

    // Controllers //
    app.controller('mainController', function ($scope) {

    });

    app.controller('navigationController', function ($scope) {
        $scope.loginText = 'Login';
    });

    app.controller('loginController', function ($scope) {

    });

    app.controller('registerController', function ($scope, questionService) {
        $scope.init = function () {
            $scope.userTitle = "1";
            $scope.status = false;
            $scope.css = 'warning';
            $scope.message = '';
        }



        $scope.register = function () {
            var data = {
                userEmail: $scope.userEmail,
                userPassword: $scope.userPassRe,
                userTitle: $scope.userTitle,
                userName: $scope.userName,
                userAddress: $scope.userAddress,
                userContact: $scope.userContact
            };

            questionService.registerUser(data)
                .success(function (d) {
                    $scope.status = true
                    if (d) {
                        $scope.css = 'success';
                        $scope.message = 'Registration Success. Continue to Login';
                    }
                    else {
                        $scope.css = 'danger';
                        $scope.message = 'Registration failed. Please try again';
                    }
                })
                .error(function (e) {
                    console.log(e);
                    // window.location.reload();
                    $scope.css = 'danger';
                    $scope.message = 'Registration failed. Please try again';
                })
        };
    });

})();