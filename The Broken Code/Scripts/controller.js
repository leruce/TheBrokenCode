'use strict';

/* Controlers */

restaurantApp.controller('MainController',
     ['$scope', '$http', '$location', '$rootScope',
     function ($scope, $http, $location, $rootScope, ParseService) {

          //Get the current user
          $rootScope.currentUser = Parse.User.current({
               //success:alert("Fuck yeah!"),
               //error: alert("Error")
          });
          
          /*
          If there is there is not a user logged in
          then the current user is NULL
          */
          $rootScope.loggedIn = function () {
               console.log("hit logged in");
               if ($rootScope.currentUser === null) {
                    return false;
               } else {
                    return true;
               }
          };

          $rootScope.logout = function () {
               console.log("hit logout");
               $rootScope.currentUser = null;
               Parse.User.logOut();
          };

}]);

restaurantApp.controller('MenuController',
     ['$rootScope', '$scope', '$http', '$location',
     function ($rootScope, $scope, $http, $location) {

          $scope.headingCaption = 'Menu';
}]);

/*

     EOF


*/