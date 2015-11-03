'use strict';

/* Controlers */

restaurantApp.controller('MainController',
     ['$rootScope', '$scope', '$http', '$location', '$window', '$q', 'ParseService',
     function ($rootScope, $scope, $http, $location, $window, $q, ParseService) {

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
               var user = new Parse.User();
               user.set("Name", $scope.newuser.name);
               user.set("username", $scope.newuser.username);
               user.set("password", $scope.newuser.password);
               user.set("email", $scope.newuser.email);
               //user.set("Birthday", $scope.newuser.birthday);
               user.signUp(null, {
                    success: function (user) {                        
                         // Welcome the user and close the modal window
                         $rootScope.currentUser = Parse.User.current();
                         alert("Login Successful! Welcome " + user.getUsername() + "!");
                         $('#registerModal').modal('hide');
                         $window.location.reload()
                         getTable(user);
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
                    //Set the currentUser, welcome the user, and get them a table
                    $rootScope.currentUser = Parse.User.current();
                    alert("Login Successful! Welcome " + user.getUsername() + "!");
                    $location.path("/");
                    getTable(user);

               });
          }

          //Gives an error if the login is unsuccessfull 
          function loginUnsuccessful(user, error) {
               switch (error.code) {
                    case Parse.Error.INVALID_SESSION_TOKEN:
                         Parse.User.logOut();
                         break;
                    default:
                         alert("Error: " + error.message + " (" + error.code + ")");
                         break;
               }//end switch
          }

          //Log out function
          $rootScope.logOut = function () {
               $rootScope.currentUser = null;
               Parse.User.logOut();
               $location.path("/");
          };

          //Function to get the user a table
          function getTable(user) {
               var Table = Parse.Object.extend("Table");
               var tableQuery = new Parse.Query(Table);
               tableQuery.equalTo("Available", true);
               //Gets the first free table
               tableQuery.first({
                    success: function (data) {
                         $rootScope.table = data;
                         $rootScope.table.set("Available", false);
                         $rootScope.table.save();
                         return $rootScope.table;
                    },
                    error: function (error) {
                         alert("Error: " + error.code + " " + error.message);
                    }
               });// End tableQuery.first              
          }

}]);


/*

     EOF

*/