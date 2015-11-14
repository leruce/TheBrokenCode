'use strict';

restaurantApp.controller('KidsMenuController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, ParseService, $location, $q) {
         var menuItem = [];
         var MenuDfd = $q.defer();
         var Menu = Parse.Object.extend("Menu");
         var MenuC = new Menu();
         var MenuID = "tX8lLaC2QQ";
         MenuC.id = MenuID;
         var MenuKid = Parse.Object.extend("MenuItem");
         var queryKid = new Parse.Query(MenuKid);
         queryKid.equalTo("CategoryPointer", MenuC);
         queryKid.equalTo("Active", true);
         queryKid.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     menuItem.push({
                         FoodName: result.get("Name"),
                         Description: result.get("Description"),
                         NutritionInfo: result.get("NutritionInfo"),
                         Price: result.get("Price"),
                         FoodID: result.get("FoodID"),
                         FoodObject: result.id,
                         FoodImg: result.get("ItemPhoto").url()
                     });
                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             MenuDfd.resolve(data);
             //alert("Working got " + menuItem.length);
         },
         function (error) {
             MenuDfd.reject(data);

         });
         MenuDfd.promise
         .then(function (Kid) {
             //alert("MenuValue:" + menuItem[0].FoodName);
             $scope.MenuKids = menuItem;
         })
         .catch(function (error) {
             //Balh
         });
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
             console.log($rootScope.currentUser);
             var Order = Parse.Object.extend("Order");
             var checkOrderQuery = new Parse.Query(Order);
             checkOrderQuery.equalTo("Customer", $rootScope.currentUser);
             checkOrderQuery.equalTo("Ordered", false);
             checkOrderQuery.first({
                 success: function (orders) {
                     if (orders == null) {
                         console.log("We got no orders for this person sucka");
                         createOrder(foodObject);
                     }
                     else {
                         console.log("we get into the query first order " + orders.id);
                         //We need to check if order exist or not. since it can return a 0.
                         addItem(orders, foodObject);
                     }
                 }
             })
             //If either one of those are false, we just create a new object.
             //Being said, we need to create a new order if we have no customer. We need to create a new order if there no open OrderList
             //Now we get the first one, since we will ONLY have 1 of them open at the time we just append
             //Note, IT DOES NOT RETURN ERROR IF WE HAVE 0, SO WE NEED TO MAKE A CASE FOR THE 0 ITEMS

         }
         function createOrder(_foodObject) {
             //What we do is create a object and save it here
             //We want to set customer, FoodID, Price, The Booleans
             var Order = Parse.Object.extend("Order");
             var order = new Order();
             //console.log("food Name " + _foodObject.FoodName);
             //order.set("ItemsOrdered", [__foodID]);
             order.set("Customer", $rootScope.currentUser);
             order.set("ItemsOrdered", [_foodObject.FoodID]);
             order.set("Cost", _foodObject.Price);
             order.set("Ordered", false);
             order.set("Claimed", false);
             order.set("Completed", false);
             order.set("InProgress", false);
             order.set("Paid", false);
             order.set("OrderComment", []);
             //order.set("TableID", findTable($rootScope.currentUser))
             //We need to create a function for this later Right now we get this shit to work
             order.save(null, {
                 success: function (order) {
                     console.log("SAVED");
                     alert("You added " + _foodObject.FoodName);
                     findTable(order);
                     addAmount(_foodObject);
                 },
                 error: function (order, error) {
                     console.log("Failed " + error.code + error.message);
                 }
             });

         }
         function addItem(orderObject, _foodObject) {
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
                     addAmount(_foodObject);
                 },
                 error: function (orderObject, error) {
                     console.log("FAILED");
                 }
             });
         }
         function addAmount(FoodObject) {
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
         function findTable(orderTable) {
             //In order to find the table, we need to access the table class it seem
             //We know th efollowing things, We know the CUtomer ID
             //console.log("We breaking here?");
             var TableList = Parse.Object.extend("Table");
             var TableQuery = new Parse.Query(TableList);
             TableQuery.equalTo("Customer", $rootScope.currentUser);
             TableQuery.first({
                 success: function (TableCustomer) {
                     if (TableCustomer == null) {
                         //          console.log("We returning NULL")
                     }
                     else {
                         //        console.log("We need to save the Customer Table here");
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
                     console.log("We should see something above this that not a Object");
                 }
             });
         }
         $scope.open = function (_menuAppetizer) {
             //We need to Reroute
             $rootScope.Detail = _menuAppetizer.NutritionInfo;
             $location.path("/info");
         }
         $scope.headingCaption = 'Menu';
     }]);

/*
     
     EOF

*/