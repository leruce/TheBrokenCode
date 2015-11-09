'use strict';

restaurantApp.controller('PaymentController',
     ['$rootScope', '$scope', '$http', '$location', '$window', '$uibModal', 'ParseService',  '$q',
     function ($rootScope, $scope, $http, $location, $window, $uibModal, ParseService, $q) {
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
               $scope.Cost2 = (FoodItem[0].Cost) / 2;
               $scope.Cost3 = (FoodItem[0].Cost) / 3;
               $scope.Cost4 = (FoodItem[0].Cost) / 4;

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
                    success: function (order) {
                         //Set the order as complete
                         order.set("Paid", true);
                         order.get("TableID").set("Available", true);
                         alert("Thank you for dining with us at The Broken Code! Your staff has been notified and will be with you shortly!");
                    },
                    error: function (order, error) {
                         alert("An error has occured. Staff has been notified and will be with you shortly.");
                    }
               })
               .then(function (order) {
                    Defered.resolve(order);
               },
               function (error) {
                    Defered.reject(order);
               });
               Defered.promise
               .then(function (order) {
                    //Update the database
                    order.save();
                    alert("If you have the time, please fill out the following survey letting us know how we did. Thanks!.");
                    //Reset the currentUser, log the user out, and go back to the home page
                    $rootScope.currentUser = null;
                    Parse.User.logOut();
                    $location.path("/survey");
               })
               .catch(function (error) {
                    //Catch errors
                    alert("An error has occured. Staff has been notified and will be with you shortly.");
               });

          };
          
          $scope.CreditPayment = function () {
              var Defered = $q.defer();
               var Order = Parse.Object.extend("Order");
               //Create query
               var completeOrderQuery = new Parse.Query(Order);
               //Parameters are for a customer order that has NOT been completed
               completeOrderQuery.equalTo("Customer", $rootScope.currentUser);
               completeOrderQuery.equalTo("Paid", false);
               completeOrderQuery.first({
                    success: function (order) {
                         //Set the order as complete
                         order.set("Paid", true);
                         order.get("TableID").set("Available", true);
                         alert("Thank you for dining with us at The Broken Code! Your staff has been notified and will be with you shortly!");
                    },
                    error: function (order, error) {
                         alert("An error has occured. Staff has been notified and will be with you shortly.");
                    }
               })
               .then(function (order) {
                    Defered.resolve(order);
               },
               function (error) {
                    Defered.reject(order);
               });
               Defered.promise
               .then(function (order) {
                    //Update the database
                    order.save();
                    alert("If you have the time, please fill out the following survey letting us know how we did. Thanks!.");
                    //Reset the currentUser, log the user out, and go back to the home page
                    $rootScope.currentUser = null;
                    Parse.User.logOut();
                    $location.path("/survey");
               })
               .catch(function (error) {
                    //Catch errors
                    alert("An error has occured. Staff has been notified and will be with you shortly.");
               });



              

          };

         

         //variables for keeping track of number of split order paid.

          var i = 0; 
          var j = 0;
          var k = 0;


          $scope.CashPayment2 = function () {
              var Defered = $q.defer();
              var Order = Parse.Object.extend("Order");
              
              //Create query
              var completeOrderQuery = new Parse.Query(Order);
              //Parameters are for a customer order that has NOT been completed
              completeOrderQuery.equalTo("Customer", $rootScope.currentUser);
              completeOrderQuery.equalTo("Paid", false);
              completeOrderQuery.first({
                  success: function (order) {
                      //divide cost of order into two
                      var Cost = order.get("Cost") / 2;
                      
                      //first pay
                      if (i == 0) {
                          order.set("Cost", Cost);
                          i++;
                      }
                          //second pay
                      else {
                          order.set("Cost", 0);                          
                          order.set("Paid", true);
                          i = 0;
                      }
                      alert("Thank you for dining with us at The Broken Code! Your staff has been notified and will be with you shortly!");
                      
                  },
                  error: function (order, error) {
                      alert("An error has occured. Staff has been notified and will be with you shortly.");
                  }
              })
              .then(function (order) {
                  Defered.resolve(order);
              },
         function (error) {
             Defered.reject(order);
         });
              Defered.promise
                   .then(function (order) {
                       //Update the database
                       order.save();
                       //Reset the currentUser, log the user out, and go back to the home page
                       if (order.get("Cost") == 0) {
                           $rootScope.currentUser = null;
                           Parse.User.logOut();
                           $location.path("/");
                       }
                   })
                   .catch(function (error) {
                       //Catch errors
                       alert("An error has occured. Staff has been notified and will be with you shortly.");
                   });

          };

          $scope.CashPayment3 = function () {
              var Defered = $q.defer();
              var Order = Parse.Object.extend("Order");

              //Create query
              var completeOrderQuery = new Parse.Query(Order);
              //Parameters are for a customer order that has NOT been completed
              completeOrderQuery.equalTo("Customer", $rootScope.currentUser);
              completeOrderQuery.equalTo("Paid", false);
              completeOrderQuery.first({
                  success: function (order) {
                      //divide cost of order into two
                      
                      
                      
                      //first pay
                      if (j == 0) {
                          var Cost = (order.get("Cost") * 2) / 3;
                          order.set("Cost", Cost);
                          j++;
                      }
                          //second pay
                      else if (j == 1) {
                          var Cost = order.get("Cost") / 2;
                          order.set("Cost", Cost);
                          
                          j++;
                      }
                          //third pay
                      else {

                          order.set("Cost",0);
                          order.set("Paid", true);
                          j = 0;
                      }
                      alert("Thank you for dining with us at The Broken Code! Your staff has been notified and will be with you shortly!");

                  },
                  error: function (order, error) {
                      alert("An error has occured. Staff has been notified and will be with you shortly.");
                  }
              })
              .then(function (order) {
                  Defered.resolve(order);
              },
         function (error) {
             Defered.reject(order);
         });
              Defered.promise
                   .then(function (order) {
                       //Update the database
                       order.save();
                       //Reset the currentUser, log the user out, and go back to the home page
                       if (order.get("Cost") == 0) {
                           $rootScope.currentUser = null;
                           Parse.User.logOut();
                           $location.path("/");
                       }
                   })
                   .catch(function (error) {
                       //Catch errors
                       alert("An error has occured. Staff has been notified and will be with you shortly.");
                   });

          };

          $scope.CashPayment4 = function () {
              var Defered = $q.defer();
              var Order = Parse.Object.extend("Order");

              //Create query
              var completeOrderQuery = new Parse.Query(Order);
              //Parameters are for a customer order that has NOT been completed
              completeOrderQuery.equalTo("Customer", $rootScope.currentUser);
              completeOrderQuery.equalTo("Paid", false);
              completeOrderQuery.first({
                  success: function (order) {
                      //divide cost of order into four



                      //first pay
                      if (k == 0) {
                          var Cost = (order.get("Cost") * 3) / 4;
                          order.set("Cost", Cost);
                          k++;
                      }
                          //second pay
                      else if (k == 1) {
                          var Cost = (order.get("Cost") * 2) / 3;
                          order.set("Cost", Cost);

                          k++;
                      }
                          //third pay
                      else if (k == 2) {
                          var Cost = order.get("Cost") / 2;
                          order.set("Cost", Cost);

                          k++;
                      }
                          //fourth pay
                      else {

                          order.set("Cost", 0);
                          order.set("Paid", true);
                          k = 0;
                      }
                      alert("Thank you for dining with us at The Broken Code! Your staff has been notified and will be with you shortly!");

                  },
                  error: function (order, error) {
                      alert("An error has occured. Staff has been notified and will be with you shortly.");
                  }
              })
              .then(function (order) {
                  Defered.resolve(order);
              },
         function (error) {
             Defered.reject(order);
         });
              Defered.promise
                   .then(function (order) {
                       //Update the database
                       order.save();
                       //Reset the currentUser, log the user out, and go back to the home page
                       if (order.get("Cost") == 0) {
                           $rootScope.currentUser = null;
                           Parse.User.logOut();
                           $location.path("/");
                       }
                   })
                   .catch(function (error) {
                       //Catch errors
                       alert("An error has occured. Staff has been notified and will be with you shortly.");
                   });

          };


     }]);