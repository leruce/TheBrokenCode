'use strict'

restaurantApp.controller('AccountController', 
     ['$rootScope', '$scope', 'ParseService', '$http', '$location', 
     function ($rootScope, $scope, $http, $location, ParseService) {

         

          //Called when user clicks Sign in button
          $scope.login = function () {
               var username = $scope.login.username;
               var password = $scope.login.password;

               Parse.User.logIn(username, password, {
                    success: loginSuccessful,
                    error: loginUnsuccessful
               });
          };

          $scope.register = function () {
               console.log("fuck yeah");
          }

          if ($rootScope.loggedIn) {
                    console.log("true");
               }
          else {
                    console.log("false");
               }

          function loginSuccessful(user) {
               $rootScope.$apply(function () {
                    $rootScope.currentUser = Parse.User.current();
                    console.log("Woohoo!");
                    var path = $location.path();
               });
          }

          // redirect to "/" if user is already logged in
          if ($rootScope.loggedIn() === true) {
          //$location.path("/#");
          }

          function loginUnsuccessful(user, error) {
               switch (error.code) {
                    case Parse.Error.INVALID_SESSION_TOKEN:
                         Parse.User.logOut();
                         break;
                    default:
                         alert("Error: " + error.message + " (" + error.code + ")");
                         break;
               }//end switch
              //alert("Error: " + error.message + " (" + error.code + ")");
         }

        

}]);

/*

     EOF


*/