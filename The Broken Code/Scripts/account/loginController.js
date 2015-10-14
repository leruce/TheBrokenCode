'use strict'

restaurantApp.controller('LoginController', 
     ['$rootScope', '$scope', 'ParseService', '$http', '$location', 
     function ($rootScope, $scope, $http, $location, ParseService) {

         $scope.test = 'IT WORKS!!!!';

          // redirect to "/" if user is already logged in
         if ($rootScope.loggedIn() === true) {
              //$location.path("/#");
         }

         function loginSuccessful(user) {
              $rootScope.$apply(function () {
                   $rootScope.currentUser = Parse.User.current();
                   console.log("Woohoo!");
                   //$location.path("/#");
              });
         }

         function loginUnsuccessful(user, error) {
              alert("Error: " + error.message + " (" + error.code + ")");
         }

         $scope.login = function () {
              var username = $scope.login.username;
              var password = $scope.login.password;

              Parse.User.logIn(username, password, {
                   success: loginSuccessful,
                   error: loginUnsuccessful
              });
         };

}]);

/*

     EOF


*/