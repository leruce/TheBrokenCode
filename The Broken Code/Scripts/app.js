'use strict';

/* App Module */

var restaurantApp = angular.module('restaurantApp',
     ['ngRoute', "ui.bootstrap"])

     .config(function ($routeProvider) {
          $routeProvider
               //The main page 
               .when('/', {
                    templateUrl: 'Views/Home.html',
                    controller: 'MainController'
               })
              //The manager adjusment report
               .when('/manager/report', {
                   templateUrl: 'Views/manager/adjustments.html',
                   controller: 'ManagerController'
               })
              //The manager revnue page
              .when('/manager/revenue', {
                  templateUrl: 'Views/manager/dailyRevenue.html',
                  controller: 'TableController'
              })
              //The manager top items page
               .when('/manager/tops', {
                   templateUrl: 'Views/manager/topItems.html',
                   controller: 'TableController'
               })
              //The staff ordering page
              .when('/stafforder', {
                    templateUrl: 'Views/staff/staffOrder.html',
                    controller: 'TableController'
              })
              //The main manager page
              .when('/manager', {
                  templateUrl: 'Views/manager/manager.html',
                  controller: 'ManagerController'
              })

               //The refill page
              .when('/refill', {
                   templateUrl: 'Views/staff/PageR.html',
                   controller: 'TableController'
              })             
              //The payment page
              .when('/payment', {
                  templateUrl: 'Views/payment/survey.html',
                  controller: 'TableController'
              })
              //The help page
              .when('/help', {
                   templateUrl: 'Views/staff/helppage.html',
                   controller: 'TableController'
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
               //The view order page
               .when('/vieworder', {
                   templateUrl: 'Views/account/ViewOrders.html',
                   controller: 'ViewOrderController'
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
               //The desserts page
               .when('/desserts', {
                    templateUrl: 'Views/menu/desserts.html',
                    controller: 'DessertMenuController'
               })
               //The kids menu page
               .when('/kids', {
                    templateUrl: 'Views/menu/kids.html',
                    controller: 'KidsMenuController'
               })
               //Games Routing
               .when('/games', {
                    templateUrl: 'Views/game/GameList.html'
               })
               .when('/tictactoe', {
                    templateUrl: 'Views/game/TicTacToe/TicTacToe.html'
               })
               .when('/connectfour', {
                    templateUrl: 'Views/game/ConnectFour/ConnectFour.html'
               })
               .when('/LotteryGame', {
                    templateUrl: 'Views/game/Lottery.html'
               })

               //The tables page
              .when('/tables', {
                  templateUrl: 'Views/staff/tables.html',
                  controller: 'TableController'
              })
               //The table1 page
              .when('/tables/1', {
                  templateUrl: 'Views/tables/Table1.html',
                  controller: 'TableController'
              })
              .when('/tables/2', {
                  templateUrl: 'Views/tables/Table2.html',
                  controller: 'TableController'
              })
                //The table3 page                
              .when('/tables/3', {
                  templateUrl: 'Views/Tables/Table3.html',
                  controller: 'TableController'
              })

              .when('/tables/4', {
                  templateUrl: 'Views/Tables/Table4.html',
                  controller: 'TableController'
              })
                //The table1 page
              .when('/tables/5', {
                  templateUrl: 'Views/Tables/Table5.html',
                  controller: 'TableController'
              })
                //The table1 page
              .when('/tables/6', {
                  templateUrl: 'Views/Tables/Table6.html',
                  controller: 'TableController'
              })
                //The table1 page
              .when('/tables/7', {
                  templateUrl: 'Views/Tables/Table7.html',
                  controller: 'TableController'
              })
                //The table1 page
              .when('/tables/8', {
                  templateUrl: 'Views/Tables/Table8.html',
                  controller: 'TableController'
              })
                //The table1 page
              .when('/tables/9', {
                  templateUrl: 'Views/Tables/Table9.html',
                  controller: 'TableController'
              })
                //The table1 page
              .when('/tables/10', {
                  templateUrl: 'Views/Tables/Table10.html',
                  controller: 'TableController'
              })
                //The table1 page
              .when('/tables/11', {
                  templateUrl: 'Views/Tables/Table11.html',
                  controller: 'TableController'
              })
                //The table1 page
              .when('/tables/12', {
                  templateUrl: 'Views/Tables/Table12.html',
                  controller: 'TableController'
              })
               //Go to home if no route found
               .otherwise({ 
                    redirectTo: '/'
               });
         
     }) //end .config

     .run(function ($rootScope, $location, ParseService) {
          $rootScope.sessionUser = Parse.User.current();
     })//end .run


/*


     EOF


*/