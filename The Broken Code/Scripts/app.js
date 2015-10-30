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

               //The refill page
              .when('/PageR', {
                   templateUrl: 'Views/staff/PageR.html',
                   controller: 'TableController'
              })

              //The payment page
              .when('/payment', {
                  templateUrl: 'Views/payment/survey.html',
                  controller: 'TableController'
              })

              //The help page
              .when('/helppage', {
                   templateUrl: 'Views/staff/helppage.html',
                   controller: 'TableController'
              })
              //The tables page
              .when('/tables', {
                  templateUrl: 'Views/staff/tables.html',
                  controller: 'TableController'
              })
               //The menu page

               //The login page

               .when('/login', {
                    templateUrl: 'Views/account/login.html',
                    controller: 'AccountController'
               })

               //The register page
               .when('/register', {
                    templateUrl: 'Views/account/register.html',
                    controller: 'AccountController'
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
               //The drinks page
               .when('/drinks', {
                   templateUrl: 'Views/menu/drinks.html',
                   controller: 'DrinkMenuController'
               })
               //The entress page
               .when('/entrees', {
                   templateUrl: 'Views/menu/entrees.html',
                   controller: 'EntreeMenuController'
               })
               //The appetizers page
               .when('/appetizers', {
                   templateUrl: 'Views/menu/appetizers.html',
                   controller: 'AppetizerMenuController'
               })

              .when('/tictactoe', {
                  templateUrl: 'Views/game/TicTacToe/TicTacToe.html'
              })
              .when('/connectfour', {
                  templateUrl: 'Views/game/ConnectFour/ConnectFour.html'
              })
               //The desserts page
               .when('/desserts', {
                    templateUrl: 'Views/menu/desserts.html',
                    controller: 'DessertMenuController'
               })
               //The appetizers page
               .when('/kids', {
                    templateUrl: 'Views/menu/kids.html',
                    controller: 'KidsMenuController'
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