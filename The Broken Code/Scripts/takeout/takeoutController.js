'use strict';

restaurantApp.controller('TakeOutController',
     ['$rootScope', '$scope', '$http', '$location', '$q', 'ParseService', 
     function ($rootScope, $scope, $http, $location, $q, ParseService) {

          //Create order variable

         //pull appetizers
         var menuItem = [];
         var MenuDfd = $q.defer();
         var Menu = Parse.Object.extend("Menu");
         var MenuA = new Menu();
         var MenuID = "XHFUmxcRYv";
         MenuA.id = MenuID;
         var MenuAppetizer = Parse.Object.extend("MenuItem");
         var queryAppetizer = new Parse.Query(MenuAppetizer);
         queryAppetizer.equalTo("CategoryPointer", MenuA);
         queryAppetizer.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     menuItem.push({
                         FoodName: result.get("Name"),
                         Description: result.get("Description"),
                         NutritionInfo: result.get("NutritionInfo"),
                         Price: result.get("Price"),
                         FoodID: result.get("FoodID"),
                         FoodImg: result.get("ItemPhoto").url(),
                         Amount: result.get("AmountSold")
                     });
                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             MenuDfd.resolve(data);
         },
         function (error) {
             MenuDfd.reject(data);

         });
         MenuDfd.promise
         .then(function (Appetizer) {

             $scope.MenuAppetizers = menuItem;
         })
         .catch(function (error) {

         });


         //pull drinks
         var menuItem2 = [];
         var MenuDfd2 = $q.defer();
         var Menu2 = Parse.Object.extend("Menu");
         var MenuB = new Menu2();
         var MenuID2 = "6Qsej6wC2a";
         MenuB.id = MenuID2;
         var MenuDrink = Parse.Object.extend("MenuItem");
         var queryDrink = new Parse.Query(MenuDrink);
         queryDrink.equalTo("CategoryPointer", MenuB);
         queryDrink.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     menuItem2.push({
                         FoodName: result.get("Name"),
                         Description: result.get("Description"),
                         NutritionInfo: result.get("NutritionInfo"),
                         Price: result.get("Price"),
                         FoodID: result.get("FoodID"),
                         FoodImg: result.get("ItemPhoto").url(),
                         Amount: result.get("AmountSold")
                     });

                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             MenuDfd2.resolve(data);

         },
         function (error) {
             MenuDfd2.reject(data);

         });
         MenuDfd2.promise
         .then(function (Drink) {

             $scope.MenuDrinks = menuItem2;
         })
         .catch(function (error) {

         });


         //pull entrees
         var menuItem3 = [];
         var MenuDfd3 = $q.defer();
         var Menu3 = Parse.Object.extend("Menu");
         var MenuC = new Menu3();
         var MenuID3 = "zABMJ6tOXx";
         MenuC.id = MenuID3;
         var MenuEntree = Parse.Object.extend("MenuItem");
         var queryEntree = new Parse.Query(MenuEntree);
         queryEntree.equalTo("CategoryPointer", MenuC);
         queryEntree.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     menuItem3.push({
                         FoodName: result.get("Name"),
                         Description: result.get("Description"),
                         NutritionInfo: result.get("NutritionInfo"),
                         Price: result.get("Price"),
                         FoodID: result.get("FoodID"),
                         FoodImg: result.get("ItemPhoto").url(),
                         Amount: result.get("AmountSold")
                     });

                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             MenuDfd3.resolve(data);

         },
         function (error) {
             MenuDfd3.reject(data);

         });
         MenuDfd3.promise
         .then(function (Entree) {
         
             $scope.MenuEntree = menuItem3;
         })
         .catch(function (error) {

         });

         //pull deserts
         var menuItem4 = [];
         var MenuDfd4 = $q.defer();
         var Menu4 = Parse.Object.extend("Menu");
         var MenuD = new Menu4();
         var MenuID4 = "BD9lPMwuxS";
         MenuD.id = MenuID4;
         var MenuDesert = Parse.Object.extend("MenuItem");
         var queryDesert = new Parse.Query(MenuDesert);
         queryDesert.equalTo("CategoryPointer", MenuD);
         queryDesert.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     menuItem4.push({
                         FoodName: result.get("Name"),
                         Description: result.get("Description"),
                         NutritionInfo: result.get("NutritionInfo"),
                         Price: result.get("Price"),
                         FoodID: result.get("FoodID"),
                         FoodImg: result.get("ItemPhoto").url(),
                         Amount: result.get("AmountSold")
                     });
                
                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             MenuDfd4.resolve(data);
           
         },
         function (error) {
             MenuDfd4.reject(data);

         });
         MenuDfd4.promise
         .then(function (Desert) {
         
             $scope.MenuDesert = menuItem4;
         })
         .catch(function (error) {
          
         });

          //Add item to order
         $scope.addToOrder = function (foodObject) {
              //Goal is to do the following things
              //Check the Customer via currentUser
              //We check the order class if we have the following details
              //If the customer have an order created
              //If so, we check if Ordered is true or False
              //If it false then we append the _foodID to the ItemsOrdered
              //If not, we create a new order object
              //If not, we then create a new order Object.
              //That should resolve this problem and add orders into the system easily
              var Order = Parse.Object.extend("Order");
              var checkOrderQuery = new Parse.Query(Order);
              checkOrderQuery.equalTo("Customer", $rootScope.currentUser);
              checkOrderQuery.equalTo("Ordered", false);
              checkOrderQuery.equalTo("Takeout", true);
              checkOrderQuery.first({
                   success: function (orders) {
                        if (orders == null) {
                             //  console.log("We got no orders for this person sucka");
                             $scope.createOrder(foodObject);
                        }
                        else {
                             //console.log("we get into the query first order " + orders.id);
                             //We need to check if order exist or not. since it can return a 0.
                             $scope.addItem(orders, foodObject);
                        }
                   }
              })
              //If either one of those are false, we just create a new object.
              //Being said, we need to create a new order if we have no customer. We need to create a new order if there no open OrderList
              //Now we get the first one, since we will ONLY have 1 of them open at the time we just append
              //Note, IT DOES NOT RETURN ERROR IF WE HAVE 0, SO WE NEED TO MAKE A CASE FOR THE 0 ITEMS

         }
         $scope.createOrder = function (_foodObject) {
              //What we do is create a object and save it here
              //We want to set customer, FoodID, Price, The Booleans
              var Order = Parse.Object.extend("Order");
              var order = new Order();
              //console.log("food Name " + _foodObject.FoodName);
              //order.set("ItemsOrdered", [__foodID]);
              order.set("Customer", $rootScope.currentUser);
              order.set("ItemsOrdered", [_foodObject.FoodID]);
              order.set("Cost", _foodObject.Price);
              order.set("Takeout", true);
              order.set("Ordered", false);
              order.set("Completed", false);
              order.set("InProgress", false);
              order.set("Paid", false);
              order.set("OrderComment", []);
              //order.set("TableID", findTable($rootScope.currentUser));
              //We need to create a function for this later Right now we get this shit to work
              order.save(null, {
                   success: function (order) {
                        console.log("SAVED");
                        alert("You added " + _foodObject.FoodName);
                        $scope.findTable(order);
                        $scope.addAmount(_foodObject);
                   },
                   error: function (order, error) {
                        console.log("Failed " + error.code + error.message);
                   }
              });

         }
         $scope.addItem = function (orderObject, _foodObject) {
              //We need to add price value
              //Append the  itemsOrdered
              var cost = orderObject.get("Cost") + _foodObject.Price;
              var ItemsOrdered = orderObject.get("ItemsOrdered");
              ItemsOrdered.push(_foodObject.FoodID);
              console.log(cost);
              console.log(ItemsOrdered);
              orderObject.set("Cost", cost);
              orderObject.set("ItemsOrdered", ItemsOrdered);
              orderObject.save(null, {
                   success: function (orderObject) {
                        console.log("Saved");
                        alert("You added " + _foodObject.FoodName);
                        $scope.addAmount(_foodObject);
                   },
                   error: function (orderObject, error) {
                        console.log("FAILED");
                   }
              });
         }
         $scope.addAmount = function (FoodObject) {
              console.log(FoodObject);
              console.log("We managed to get in addAmount " + FoodObject.FoodObject);
              var FoodTable = Parse.Object.extend("MenuItem");
              var query = new Parse.Query(FoodTable);
              query.get(FoodObject.FoodObject, {
                   success: function (Object) {
                        console.log(Object);
                        Object.set("AmountSold", (Object.get("AmountSold") + 1));
                        Object.save();

                   }
              })

         }
         $scope.findTable = function(orderTable) {
              //In order to find the table, we need to access the table class it seem
              //We know th efollowing things, We know the CUtomer ID
              //console.log("We breaking here?");
              var TableList = Parse.Object.extend("Table");
              var TableQuery = new Parse.Query(TableList);
              TableQuery.equalTo("Customer", $rootScope.currentUser);
              TableQuery.first({
                   success: function (TableCustomer) {
                        if (TableCustomer == null) {
                             console.log("NULL");
                        }
                        else {
                             console.log(TableCustomer.id);
                             orderTable.set("TableID", TableCustomer);
                             console.log(orderTable);
                             orderTable.save(null, {
                                  success: function (orderObject) {
                                       //              console.log("We saved te orderTable.set");
                                  },
                                  error: function (orderObject, error) {
                                       console.log("failed" + error.code + error.message);
                                  }
                             });


                        }
                   }
              });
         }

         var Defered = $q.defer();
         var Order = Parse.Object.extend("Order");
         var viewOrderQuery = new Parse.Query(Order);
         viewOrderQuery.equalTo("Customer", $rootScope.currentUser);
         viewOrderQuery.equalTo("Ordered", false);
         viewOrderQuery.equalTo("Takeout", true);
         var FoodItem = [];
         viewOrderQuery.first({
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
         }).then(function (orders) {
              Defered.resolve(orders);
              ///$scope.CrudeOrder = FoodItem;
              //console.log($scope.orderStuff);
              //console.log("First Resolve give us this: "+orders.get("ItemsOrdered"));
         },
         function (error) {
              Defered.reject(orders);
         });
         Defered.promise
         .then(function (orders) {
              console.log("Which then be promised to hold value :" + orders.get("ItemsOrdered"));
              $scope.CrudeOrder = FoodItem;
              $scope.Cost = FoodItem[0].Cost.toFixed(2);
              CheckOrder(orders);
              //Here where i will  call my function
         })
         .catch(function (error) {
              //Catch errors
              console.log("We get an ERROR here");
         });
         function CheckOrder(Ordered) {
              //console.log("We get into the CheckOrdered");
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
                                       //console.log("We got into the Check order Success!");
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
         }
         $scope.DeleteItem = function (ItemToDelete) {
              console.log("We clicked DeleteItemFunction");
              //Goal: Get the Order ID stuff
              console.log(ItemToDelete);
              //Query for that item
              //Remove that Item
              //We first need to find the index value
              for (var x = 0; x < ItemToDelete.FoodIDarray.length; x++) {
                   if (ItemToDelete.FoodID == ItemToDelete.FoodIDarray[x]) {
                        //console.log("We show up ONE TIME");
                        //Now we delete 
                        console.log(ItemToDelete.FoodIDarray);
                        ItemToDelete.FoodIDarray.splice(x, 1);
                        console.log(ItemToDelete.FoodIDarray);
                        var NewOrder = Parse.Object.extend("Order");
                        var OrderQuery = new Parse.Query(NewOrder);
                        OrderQuery.get(ItemToDelete.OrderID, {
                             success: function (TempOrder) {
                                  console.log(TempOrder);
                                  TempOrder.set("ItemsOrdered", ItemToDelete.FoodIDarray);
                                  console.log(ItemToDelete.Cost);
                                  console.log(ItemToDelete.Price);
                                  TempOrder.set("Cost", (ItemToDelete.Cost - ItemToDelete.Price));
                                  TempOrder.save(null, {
                                       success: function (Stuff) {
                                            console.log("We saved it?");
                                            $window.location.reload()
                                       }
                                  });
                             }
                        });

                        //  OrderQuery.equalTo("objectId", OrderIdAdded);
                        //OrderQuery.find({
                        //  success: function (DeletedOrder) {
                        //    console.log(DeletedOrder);
                        //  DeletedOrder.set("ItemOrdered", ItemToDelete.FoodIDarray);
                        //DeletedOrder.save();
                        // }

                        //                        })
                        break;
                   }
              }


         }
         $scope.SaveComment = function (OrderSend, TextBoxComments) {
              //We take in the Textbox save the value in the fucking textbox then store the shit in the god damn database and we done
              //IN order to do this shit we need to Pull the fucking thing
              console.log("We got into SaveComment");
              console.log(TextBoxComments);
              for (var x = 0; x < OrderSend.FoodIDarray.length; x++) {
                   if (OrderSend.FoodIDarray[x] == OrderSend.FoodID) {
                        //console.log("We EDIT THIS SHIT BROTHER");
                        //var CommentStuff = $scope.CommentArea;

                        OrderSend.OrderComment.splice(x, 0, TextBoxComments);
                        ///console.log(OrderSend.OrderComment);
                        var NewOrder = Parse.Object.extend("Order");
                        var OrderQuery = new Parse.Query(NewOrder);
                        OrderQuery.get(OrderSend.OrderID, {
                             success: function (TempOrder) {
                                  ///     console.log(TempOrder);
                                  TempOrder.set("OrderComment", OrderSend.OrderComment);
                                  TempOrder.save(null, {
                                       success: function (Stuff) {
                                            //          console.log("We saved it?");
                                       }
                                  });
                             }
                        });

                   }
              }
         }
         $scope.Submit = function (OrderSubmit) {
              //Goal is to get the Order then flip the True/False value
              //Flip Ordered
              //Flip InProgress
              console.log("We get into Submit");
              console.log(OrderSubmit);
              var NewOrder = Parse.Object.extend("Order");
              var OrderQuery = new Parse.Query(NewOrder);
              console.log(OrderSubmit[0].OrderID);
              OrderQuery.get(OrderSubmit[0].OrderID, {
                   success: function (OrderS) {
                        OrderS.set("Ordered", true);
                        OrderS.set("InProgress", true);
                        OrderS.save(null, {
                             success: function (Stuff) {
                                  console.log("We saved it?");

                             }
                        });
                   }
              });
              $location.path('/');
         }

     }]);