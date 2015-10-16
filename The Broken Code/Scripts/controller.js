'use strict';

/* Controlers */

restaurantApp.controller('MainController',
     ['$scope', '$http', '$location', '$rootScope',
     function ($scope, $http, $location, $rootScope, ParseService) {

          $scope.headingCaption = 'HOME';

          //Get the current user
          $rootScope.currentUser = Parse.User.current();

          /*
          If there is there is not a user logged in
          then the current user is NULL
          */
          $rootScope.loggedIn = function () {
               if ($rootScope.currentUser === null) {
                    return false;
               } else {
                    return true;
               }
          };

          $scope.logout = function () {
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