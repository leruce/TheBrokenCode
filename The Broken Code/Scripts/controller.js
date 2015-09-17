'use strict';

/* Controlers */

restaurantApp.controller('indexViewModel', ['$scope', 
    function ($scope, $http, $location) {
        $scope.headingCaption = 'Index';
    }]);

restaurantApp.controller('homeViewModel', ['$scope',
    function ($scope, $http, $location) {
        $scope.headingCaption = 'Home';
    }]);