﻿

app.controller('aboutCtrl', ['$scope', '$location', 'manageService',
    function aboutCtrl($scope, $location, manageService) 
    {
        $scope.yt = {
          width: 600, 
          height: 480, 
          videoid: "eCkjTaqIJpc",
        };

        getCurrentUser();

        function getCurrentUser() {
            manageService.getCurrentUser().then(
                function success(user) {
                    $scope.user = user;
                    if($scope.user.RoleId == 1){
                        $scope.goToStudentView();
                    }
                },
                function fail(reason) {
                    console.log("Unable to load current user: " + reason);
                }
            );
        }

        // ---------------------------------------------------------------
        // Navigation
        // ---------------------------------------------------------------
        $scope.goToStudentView = function (id) {
            $location.path("/StudentView/");
        }
    }
])