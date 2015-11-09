/// <reference path="C:\Users\User\Git\The Broken Code\The Broken Code\Views/kitchen/kitchen.html" />
/// <reference path="C:\Users\User\Git\The Broken Code\The Broken Code\Views/kitchen/kitchen.html" />
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
             .when('/info', {
                 templateUrl: 'Views/menu/Info.html',
                 controller: 'InfoController'
              })
              //The manager adjusment report
               .when('/manager/report', {
                   templateUrl: 'Views/manager/adjustments.html',
                   controller: 'ManagerController'
               })
              //The manager revenue page
              .when('/manager/revenue', {
                  templateUrl: 'Views/manager/dailyRevenue.html',
                  controller: 'TableController'
              })
              //The Amount of Order been done so far
              .when('/manager/numberoforder', {
                  templateUrl: 'Views/manager/OrderNumber.html',
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
              //The remove page
              .when('/manager/remove', {
                  templateUrl: 'Views/kitchen/remove.html',
                  controller: 'removeController'
              })
              //The main manager page
              .when('/manager', {
                  templateUrl: 'Views/manager/manager.html',
                  controller: 'ManagerController'
              })
               //The main staff page 
              .when('/waitstaff', {
                  templateUrl: 'Views/staff/waitstaff.html',
                  controller: 'TableController'
              })
              //The staff ordering page
              .when('/waitstaff/order', {
                    templateUrl: 'Views/staff/staffOrder.html',
                    controller: 'TableController'
              })
             //The waitstaff help page
              .when('/waitstaff/refill', {
                   templateUrl: 'Views/staff/staffrefill.html',
                   controller: 'RefillSController'
              })  
              //The waitstaff refill page
              .when('/waitstaff/help', {
                   templateUrl: 'Views/staff/staffhelp.html',
                   controller: 'HelpSController'
              })
               //The customer refill page
              .when('/help', {
                   templateUrl: 'Views/customer/helppage.html',
                   controller: 'helpController'
              })   
                //The customer help page
              .when('/refill', {
                   templateUrl: 'Views/customer/refillpage.html',
                   controller: 'refillController'
              })      
              //The payment page
              .when('/payment', {
                  templateUrl: 'Views/payment/payment.html',
                  controller: 'PaymentController'
              })
              //Receipt pahe
              .when('/receipt', {
                  templateUrl: 'Views/payment/Receipt.html',
                  controller: 'ReceiptController'
              })
              //The survery page
              .when('/survey', {
                   templateUrl: 'Views/payment/survey.html',
                   controller: 'SurveyController'
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

               /* //////////////////////////// */
              /* All the main table html pages */
             /* ///////////////////////////// */
              
              .when('/tables/1', {
                  templateUrl: 'Views/tables/mainPages/Table1.html',
                  controller: 'Table1Controller'
              })
             
              .when('/tables/2', {
                  templateUrl: 'Views/tables/mainPages/Table2.html',
                  controller: 'Table2Controller'
              })
                          
              .when('/tables/3', {
                  templateUrl: 'Views/Tables/mainPages/Table3.html',
                  controller: 'Table3Controller'
              })

              .when('/tables/4', {
                  templateUrl: 'Views/Tables/mainPages/Table4.html',
                  controller: 'Table4Controller'
              })
              
              .when('/tables/5', {
                  templateUrl: 'Views/Tables/mainPages/Table5.html',
                  controller: 'Table5Controller'
              })
             
              .when('/tables/6', {
                  templateUrl: 'Views/Tables/mainPages/Table6.html',
                  controller: 'Table6Controller'
              })
                
              .when('/tables/7', {
                  templateUrl: 'Views/Tables/mainPages/Table7.html',
                  controller: 'Table7Controller'
              })
               
              .when('/tables/8', {
                  templateUrl: 'Views/Tables/mainPages/Table8.html',
                  controller: 'Table8Controller'
              })
              
              .when('/tables/9', {
                  templateUrl: 'Views/Tables/mainPages/Table9.html',
                  controller: 'Table9Controller'
              })
               
              .when('/tables/10', {
                  templateUrl: 'Views/Tables/mainPages/Table10.html',
                  controller: 'Table10Controller'
              })
              
              .when('/tables/11', {
                  templateUrl: 'Views/Tables/mainPages/Table11.html',
                  controller: 'Table11Controller'
              })
             
              .when('/tables/12', {
                  templateUrl: 'Views/Tables/mainPages/Table12.html',
                  controller: 'Table12Controller'
              })

                 /* //////////////////////////// */
              /* All the main table html pages */
             /* ///////////////////////////// */

              .when('/tables/1/order', {
                  templateUrl: 'Views/Tables/orderPage/Table1Order.html',
                  controller: 'Table1Controller'
              })

              .when('/tables/2/order', {
                  templateUrl: 'Views/Tables/orderPage/Table2Order.html',
                  controller: 'Table2Controller'
              })

              .when('/tables/3/order', {
                  templateUrl: 'Views/Tables/orderPage/Table3Order.html',
                  controller: 'Table3Controller'
              })

              .when('/tables/4/order', {
                  templateUrl: 'Views/Tables/orderPage/Table4Order.html',
                  controller: 'Table4Controller'
              })

              .when('/tables/5/order', {
                  templateUrl: 'Views/Tables/orderPage/Table5Order.html',
                  controller: 'Table5Controller'
              })

              .when('/tables/6/order', {
                  templateUrl: 'Views/Tables/orderPage/Table6Order.html',
                  controller: 'Table6Controller'
              })

              .when('/tables/7/order', {
                  templateUrl: 'Views/Tables/orderPage/Table7Order.html',
                  controller: 'Table7Controller'
              })

              .when('/tables/8/order', {
                  templateUrl: 'Views/Tables/orderPage/Table8Order.html',
                  controller: 'Table8Controller'
              })

              .when('/tables/9/order', {
                  templateUrl: 'Views/Tables/orderPage/Table9Order.html',
                  controller: 'Table9Controller'
              })

              .when('/tables/2/order', {
                  templateUrl: 'Views/Tables/orderPage/Table2Order.html',
                  controller: 'Table2Controller'
              })

              .when('/tables/10/order', {
                  templateUrl: 'Views/Tables/orderPage/Table10Order.html',
                  controller: 'Table10Controller'
              })

              .when('/tables/11/order', {
                  templateUrl: 'Views/Tables/orderPage/Table11Order.html',
                  controller: 'Table11Controller'
              })

              .when('/tables/12/order', {
                  templateUrl: 'Views/Tables/orderPage/Table12Order.html',
                  controller: 'Table12Controller'
              })


               //Go to home if no route found
               .otherwise({ 
                    redirectTo: '/'
               });
         
     }) //end .config

     .run(function ($rootScope, $location, ParseService) {
          $rootScope.currentUser = Parse.User.current();
          // redirect to login page if not logged in and trying to access a restricted page
          var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
          if (restrictedPage && !$rootScope.currentUser) {
               $location.path('/login');
          }
     })//end .run


/*


     EOF


*/