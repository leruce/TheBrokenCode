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
               console.log("hit_register");
               var user = new Parse.User();
               console.log("hit_register");
               user.set("Name", $scope.newuser.name);
               user.set("username", $scope.newuser.username);
               user.set("password", $scope.newuser.password);
               user.set("email", $scope.newuser.email);

               //user.set("Birthday", $scope.newuser.birthday);
               console.log("fuck yeah");

               user.signUp(null, {
                    success: function(user) {
                         console.log("Hooray!");
                         // Hooray! Let them use the app now.
                    },
                    error: function(user, error) {
                         // Show the error message somewhere and let the user try again.
                         alert("Error: " + error.code + " " + error.message);
                    }
               })
          };

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