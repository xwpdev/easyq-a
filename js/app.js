// main ng module for the application
// mod by CS
// written on 25-01-2016
(function () {
    var app = angular.module('QuestionApp', [
            'ui.bootstrap',
            'ngRoute',
            'ui.tinymce',
            'ngTagsInput'

        ])
        .run(function ($rootScope, questionService) {
            console.log("Easy Q & A is alive");
            var data = {};
            questionService.setSession(data);
        });

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
            .when('/dashboard', {
                templateUrl: 'templates/dashboard.html',
                controller: 'dashboardController'
            })
            .when('/logout', {
                templateUrl: 'templates/logout.html',
                controller: 'logoutController'
            })
            .when('/question-new', {
                templateUrl: 'templates/question-new.html',
                controller: 'questionController'
            })
    });

    // SERVICES //
    app.factory('questionService', function ($http) {
        var baseUrl = 'api/';
        return {
            setSession: function (data) {
                return $http({
                    method: 'GET',
                    url: baseUrl + 'setSession.php',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            checkSession: function (data) {
                return $http({
                    method: 'GET',
                    url: baseUrl + 'checkSession.php',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            registerUser: function (data) {
                return $http({
                    method: 'POST',
                    url: baseUrl + 'registerUser.php',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            validateUser: function (data) {
                return $http({
                    method: 'POST',
                    url: baseUrl + 'validateUser.php',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            logoutUser: function (data) {
                return $http({
                    method: 'GET',
                    url: baseUrl + 'logoutUser.php',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            saveQuestion: function (data) {
                return $http({
                    method: 'POST',
                    url: baseUrl + 'saveQuestion.php',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            getQuestionData: function (data) {
                return $http({
                    method: 'POST',
                    url: baseUrl + 'getDashboardData.php',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            }
        };
    });

    // Controllers //
    app.controller('mainController', function ($scope) {

    });

    app.controller('logoutController', function ($scope, $rootScope, $location, questionService) {
        var data = {};
        questionService.logoutUser(data).success(function (d) {
            $location.path("/");
            $rootScope.logged = false;
            $rootScope.loginText = "Login";
        });
    });

    app.controller('navigationController', function ($scope, $rootScope, $location, questionService) {
        $rootScope.loginText = "Login";
        $rootScope.logged = false;

        // check for session
        var data = {};
        questionService.checkSession(data).success(function (d) {

            if (d.id > 0) {
                $rootScope.logged = true;
                $rootScope.loginText = d.name;
            }
            else {
                $rootScope.logged = false;
                $rootScope.loginText = "Login";
            }
        });

        $scope.init = function () {

        }
    });

    app.controller('loginController', function ($scope, $rootScope, $location, questionService) {
        $scope.init = function () {
            $scope.status = true;
            $scope.css = 'warning';
            $scope.message = '';
        }

        $scope.validateUser = function () {
            var data = {
                e: $scope.userEmail,
                p: $scope.userPass
            };

            questionService.validateUser(data)
                .success(function (d) {
                    if (d.d.id > 0) {
                        $rootScope.logged = true;
                        $rootScope.loginText = d.d.name;
                        $scope.css = 'success';
                        $location.path('/dashboard');
                    }
                    else {
                        $scope.css = 'danger';
                        $scope.status = false;
                        $scope.message = 'Email not found. Register now';
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
                    $scope.status = d.s;
                    if (d.d) {
                        $scope.css = 'success';
                        $scope.message = 'Registration success. Continue to Login';
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

    app.controller('dashboardController', function ($scope, $location, questionService) {
        $scope.searchOption = "1";
        $scope.qData = '';
        $scope.init = function () {
            $scope.getData();
        }
        $scope.getData = function () {
            var data = {
                f: $scope.searchOption
            };
            questionService.getQuestionData(data).success(function (d) {
                console.log(d);
                if (d.s) {
                    $scope.qData = d.data;
                }
            });
        }
    });

    app.controller('questionController', function ($scope, $location, questionService) {
        $scope.init = function () {
            $scope.status = true;
            $scope.css = 'warning';
            $scope.message = '';
        }

        $scope.tinymceOptions = {
            plugins: 'advlist autolink link image lists charmap print preview textcolor',
            toolbar: 'insertfile undo redo | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
        };

        $scope.saveQuestion = function () {
            var data = {
                qTitle: $scope.qTitle,
                qDesc: $scope.qDesc,
                qTags: $scope.qTags
            };

            questionService.saveQuestion(data).success(function (d) {
                // console.log(d);
                $scope.status = false;
                if (d.s) {
                    $scope.css = 'success';
                    $scope.message = 'Successfully saved';
                    $location.path('/dashboard');
                }
                else {
                    $scope.css = 'danger';
                    $scope.message = 'Error saving question. Please try again';
                }
            });
        }
    });
})();