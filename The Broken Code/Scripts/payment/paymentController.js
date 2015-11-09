'use strict';

restaurantApp.controller('PaymentController',
     ['$rootScope', '$scope', '$http', '$location', '$window', 'ParseService',  '$q',
     function ($rootScope, $scope, $http, $location, $window, ParseService, $q) {
          console.log($window.sessionStorage.table);
          console.log($rootScope.currentUser);
          var Defered = $q.defer();
          var Order = Parse.Object.extend("Order");
          var getOrderQuery = new Parse.Query(Order);
          getOrderQuery.equalTo("Customer", $rootScope.currentUser);
          getOrderQuery.equalTo("Paid", false);
          var FoodItem = [];
          getOrderQuery.first({
               success: function (orders) {
                    if (orders == null) {
                         //console.log("We get into no orders in view");
                    }
                    else {
                         //console.log("We got an order to list");
                         angular.forEach(orders, function (result) {
                              FoodItem.push({
                                   OrderComment: orders.get("OrderComment"),
                                   Cost: orders.get("Cost"),
                                   ItemOrdered: orders.get("ItemOrdered"),
                                   ID: orders.id
                              })
                         })
                    }
               },
               error: function (orders, error) {
                    alert("We got an error son!");
               }
          })
          .then(function (orders) {
               Defered.resolve(orders);
          },
          function (error) {
               Defered.reject(orders);
          });
          Defered.promise
          .then(function (orders) {
               $scope.CrudeOrder = FoodItem;
               $scope.Cost = FoodItem[0].Cost.toFixed(2);
               CheckOrder(orders);
          })
          .catch(function (error) {
               //Catch errors
               console.log("We get an ERROR here");
          });

          function CheckOrder(Ordered) {
               var SecondDeffered = $q.defer();
               var OrderExpanded = [];
               var menuItem = Parse.Object.extend("MenuItem");
               var menuQuery = new Parse.Query(menuItem);
               var FoodIDArray = Ordered.get("ItemsOrdered")
               menuQuery.find({
                    success: function (OrderExpand) {
                         angular.forEach(OrderExpand, function (result) {
                              for (var x = 0; x < FoodIDArray.length; x++) {
                                   if (FoodIDArray[x] == result.get("FoodID")) {
                                        OrderExpanded.push({
                                             FoodName: result.get("Name"),
                                             Price: result.get("Price"),
                                             FoodID: result.get("FoodID"),
                                             OrderID: Ordered.id,
                                             OrderComment: Ordered.get("OrderComment"),
                                             FoodIDarray: Ordered.get("ItemsOrdered"),
                                             Cost: Ordered.get("Cost")
                                        });
                                   }
                              }
                         });
                    },
                    error: function (error) {
                         alert("Error DUDE");
                    }

               }).then(function (OrderExpand) {
                    SecondDeffered.resolve(OrderExpand);
                    //console.log("We resvolved the 2nd promise we have " + OrderExpand);
               },
               function (error) {
                    SecondDeffered.reject(OrderExpand);
               });
               SecondDeffered.promise
               .then(function (OrderStuff) {
                    $rootScope.OrderThings = OrderExpanded;
                    //console.log("In the 2nd Promise! " + $rootScope.OrderThings);
                    //return OrderExpanded;
               })
               .catch(function (error) {
                    alert("WEEEE");
               });
          };

          $scope.CashPayment = function () {
               var Defered = $q.defer();
               var Order = Parse.Object.extend("Order");
               //Create query
               var completeOrderQuery = new Parse.Query(Order);
               //Parameters are for a customer order that has NOT been completed
               completeOrderQuery.equalTo("Customer", $rootScope.currentUser);
               completeOrderQuery.equalTo("Paid", false);
               completeOrderQuery.first({
                    success: function (orders) {
                         //Set the order as complete
                         orders.set("Paid", true);
                         alert("Thank you for dining with us at The Broken Code! Your staff has been notified and will be with you shortly!");
                    },
                    error: function (orders, error) {
                         alert("An error has occured. Staff has been notified and will be with you shortly.");
                    }
               })
               .then(function (orders) {
                    Defered.resolve(orders);
               },
          function (error) {
               Defered.reject(orders);
          });
          Defered.promise
               .then(function (orders) {
                    //Update the database
                    orders.save();
                    //Reset the currentUser, log the user out, and go back to the home page
                    $rootScope.currentUser = null;
                    Parse.User.logOut();
                    $location.path("/");
               })
               .catch(function (error) {
                    //Catch errors
                    alert("An error has occured. Staff has been notified and will be with you shortly.");
               });

          };
     }]);