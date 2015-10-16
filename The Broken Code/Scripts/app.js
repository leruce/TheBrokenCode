'use strict';

/* App Module */

var restaurantApp = angular.module('restaurantApp',
     ['ngRoute',])

     .config(function ($routeProvider) {
          $routeProvider
               //The main page 
               .when('/', {
                    templateUrl: 'Views/Home.html',
                    controller: 'MainController'
               })
               //The menu page
               .when('/login', {
                    templateUrl: 'Views/account/login.html',
                    controller: 'LoginController'
               })

               //The menu page
               .when('/menu', {
                    templateUrl: 'Views/Menu/menu.html',
                    controller: 'MenuController'
               })
              //The kitchen page
               .when('/kitchen', {
                  templateUrl: 'Views/kitchen/kitchen.html',
                  controller: 'KitchenController'
              })
               //Go to home if no route found
               .otherwise({ 
                    redirectTo: '/'
               });
         
     }) //end .config

     .run(function ($rootScope, $location, ParseService) {
          
     })//end .run

/*


     EOF


*/