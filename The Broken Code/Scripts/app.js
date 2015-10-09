'use strict';

/* App Module */

var restaurantApp = angular.module('restaurantApp',
     [
          'ngRoute',
          'restaurantController'
     ])

     .config(function ($routeProvider) {
          $routeProvider
               //The main page 
               .when('/', {
                    templateUrl: 'Views/Home.html',
                    controller: 'MainController'
               })
               //The menu page
               .when('/menu', {
                    templateUrl: 'Views/Menu/menu.html',
                    controller: 'MenuController'
               })

               //Go to home if no route found
               .otherwise({ 
                    redirectTo: '/'
               });
         
     }); //end .config

