'use strict';

/* Controlers */

restaurantApp.controller('MainController',
     ['$rootScope', '$scope', '$http', '$location', '$window', 'ParseService',
     function ($rootScope, $scope, $http, $location, $window, ParseService) {

          //Get the current user
          $rootScope.currentUser = Parse.User.current();
          
          //Called when user clicks Sign in button
          $scope.login = function () {
               var username = $scope.login.username;
               var password = $scope.login.password;

               Parse.User.logIn(username, password, {
                    success: loginSuccessful,
                    error: loginUnsuccessful
               });
          };
          
          //Called when user clicks Register button
          $scope.register = function () {
               console.log("hit_register");
               var user = new Parse.User();
               console.log("hit_register");
               user.set("Name", $scope.newuser.name);
               user.set("username", $scope.newuser.username);
               user.set("password", $scope.newuser.password);
               user.set("email", $scope.newuser.email);
               //user.set("Birthday", $scope.newuser.birthday);
               user.signUp(null, {
                    success: function (user) {                        
                         // Welcome the user and close the modal window
                         $rootScope.currentUser = Parse.User.current();
                         alert("Login Successful! Welcome " + user.username + "!");
                         $('#registerModal').modal('hide');
                         $window.location.reload()
                    },
                    error: function(user, error) {
                         // Show the error message somewhere and let the user try again.
                         alert("Error: " + error.code + " " + error.message);
                    }
               })
          };

          //Welcome user and redirect them to the main page
          function loginSuccessful(user) {
               $rootScope.$apply(function () {
                    $rootScope.currentUser = Parse.User.current();
                    alert("Login Successful! Welcome " + user.username + "!");
                    $location.path("/");
               });
          }

          //Gives an error if the login is unsuccessfull 
          function loginUnsuccessful(user, error) {
               switch (error.code) {
                    case Parse.Error.INVALID_SESSION_TOKEN:
                         console.log("hit invalid");
                         Parse.User.logOut();
                         break;
                    default:
                         alert("Error: " + error.message + " (" + error.code + ")");
                         break;
               }//end switch
              //alert("Error: " + error.message + " (" + error.code + ")");
          }

          //Log out function
          $rootScope.logOut = function () {
               console.log("hit logout");
               $rootScope.currentUser = null;
               Parse.User.logOut();
               $location.path("/");
          };

}]);


/*

     EOF


*/