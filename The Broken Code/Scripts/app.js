'use strict';

/* App Module */

var restaurantApp = angular.module('restaurantApp', ['ngRoute']);

restaurantApp
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'View/Home.html',
                controller: 'homeViewModel'
            });

        //Go to home if no route found
        $routeProvider.otherwise({ redirectTo: '/'});
        $locationProvider.html5Mode(true);
    });
