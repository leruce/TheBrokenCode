'use strict';

/* App Module */

var restaurantApp = angular.module('restaurantApp', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'Views/Home.html',
                controller: 'homeViewModel'
            });

        //Go to home if no route found
        $routeProvider.otherwise({ redirectTo: '/'});
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });
    });

restaurantApp.controller('indexViewModel', function ($scope, $http, $location) {
        $scope.headingCaption = 'Index';
    });

restaurantApp.controller('homeViewModel', function ($scope, $http, $location) {
        $scope.headingCaption = 'Home';
    });