'use strict';

/* Controlers */

var restaurantController = angular.module('restaurantController', []);

restaurantController.controller('MainController', function ($scope, $http, $location) {
     $scope.headingCaption = 'Home';
});

restaurantController.controller('MenuController', function ($scope, $http, $location) {
     $scope.headingCaption = 'Menu';
});