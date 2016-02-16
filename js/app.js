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

    // FILTERS
    app.filter('unsafe', function ($sce) {
        return $sce.trustAsHtml;
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
            .when('/admin', {
                templateUrl: 'templates/dash-admin.html',
                controller: 'questionController'
            })
            .when('/lecturer', {
                templateUrl: 'templates/dash-lec.html',
                controller: 'questionController'
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
            .when('/question-view/:id', {
                templateUrl: 'templates/question-view.html',
                controller: 'questionViewController'
            })
            .when('/user-add', {
                templateUrl: 'templates/user-add.html',
                controller: 'registerController'
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
            },
            getUserTypes: function (data) {
                return $http({
                    method: 'GET',
                    url: baseUrl + 'getUserTypeData.php',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            setLecturer: function (data) {
                return $http({
                    method: 'POST',
                    url: baseUrl + 'setLecturerToQuestion.php',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            questionById: function (data) {
                return $http({
                    method: 'POST',
                    url: baseUrl + 'getQuestionById.php',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            userById: function (data) {
                return $http({
                    method: 'POST',
                    url: baseUrl + 'getUserById.php',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            getAnswers: function (data) {
                return $http({
                    method: 'POST',
                    url: baseUrl + 'getAnswersByQuestion.php',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            }
            //getLecturers: function (data) {
            //    return $http({
            //        method: 'GET',
            //        url: baseUrl + 'getLecturers.php',
            //        data: data,
            //        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            //    });
            //}
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
            $rootScope.url = "/login";
        });
    });

    app.controller('navigationController', function ($scope, $rootScope, $location, questionService) {
        // check for session
        var data = {};
        questionService.checkSession(data).success(function (d) {
            if (d.id > 0) {
                $rootScope.logged = true;
                $rootScope.loginText = d.name;

                switch (d.userType) {
                    case "1":
                        // admin
                        $rootScope.url = "/admin";
                        break;
                    case "2":
                        // student
                        $rootScope.url = "/dashboard";
                        break;
                    case "3":
                        // lecturer
                        $rootScope.url = "/lecturer";
                        break;
                    case "4":
                        // moderator
                        $rootScope.url = "/admin";
                        break;
                }

            }
            else {
                $rootScope.logged = false;
                $rootScope.loginText = "Login";
                $rootScope.url = "/login";
            }
        });

        $scope.init = function () {
            $rootScope.loginText = "Login";
            $rootScope.logged = false;
            $rootScope.url = "/login";
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
                        $rootScope.url = "/login";
                        $scope.css = 'success';
                        switch (d.d.userType) {
                            case "1":
                                // admin
                                $rootScope.url = "/admin";
                                $location.path('/admin');
                                break;
                            case "2":
                                // student
                                $rootScope.url = "/dashboard";
                                $location.path('/dashboard');
                                break;
                            case "3":
                                // lecturer
                                $rootScope.url = "/lecturer";
                                $location.path('/lecturer');
                                break;
                            case "4":
                                // moderator
                                $rootScope.url = "/admin";
                                $location.path('/admin');
                                break;
                        }
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
            $scope.userTitle = "Mr.";
            $scope.status = false;
            $scope.css = 'warning';
            $scope.message = '';
            $scope.userType = {"id": 2};
            $scope.getUserTypes();
        }

        $scope.register = function () {
            var data = {
                userEmail: $scope.userEmail,
                userPassword: $scope.userPassRe,
                userTitle: $scope.userTitle,
                userName: $scope.userName,
                userAddress: $scope.userAddress,
                userContact: $scope.userContact,
                userType: $scope.userType ? $scope.userType.id : 2
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

        $scope.getUserTypes = function () {
            var data = {};

            questionService.getUserTypes(data)
                .success(function (d) {
                    if (d.s) {
                        $scope.userTypes = d.data;
                    }
                    else {
                        $scope.css = 'danger';
                        $scope.message = 'Error loading data. Please try again';
                    }
                })
                .error(function (e) {
                    console.log(e);
                    $scope.css = 'danger';
                    $scope.message = 'Error loading data. Please try again';
                })
        }
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
                if (d.s) {
                    // console.log(d.qData);
                    $scope.qData = d.qData;
                    $scope.lData = d.lData;
                }
            });
        }

        //$scope.getLecturers = function () {
        //    var data = {};
        //    questionService.getLecturers(data)
        //        .success(function (d) {
        //            if (d.s) {
        //                $scope.lecturers = d.data;
        //            }
        //            else {
        //                $scope.css = 'danger';
        //                $scope.message = 'Error loading data. Please try again';
        //            }
        //        })
        //        .error(function (e) {
        //            console.log(e);
        //            $scope.css = 'danger';
        //            $scope.message = 'Error loading data. Please try again';
        //        })
        //}

        $scope.setLecturer = function (i, t) {
            console.log(i);
            console.log(t.id);

            var data = {
                lecId: t.id,
                qId: i
            };
            questionService.setLecturer(data)
                .success(function (d) {

                })
                .error(function (e) {
                    console.log(e);
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

    app.controller('questionViewController', function ($scope, $routeParams, $location, questionService) {
        $scope.init = function () {
            $scope.addAnswerPanel = false;
            // get question by id
            var postData = {id: $routeParams.id};
            questionService.questionById(postData).success(function (d) {
                // console.log(d);
                if (d.s) {
                    $scope.question = d.data[0];
                    var qData = {id: d.data[0].user_id};
                    questionService.userById(qData).success(function (dd) {
                        $scope.author = dd.data[0].title + " " + dd.data[0].name;
                    });
                    var aData = {id: d.data[0].id};
                    questionService.getAnswers(aData).success(function (ddd) {
                        $scope.answers = ddd.data;
                    });
                }
            });
        }

        $scope.showAnswerPanel = function () {
            $scope.addAnswerPanel = true;
        }

        // save answer
    })

})();