'use strict';

restaurantApp.controller('DessertMenuController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {
          var menuItem = [];
          var MenuDfd = $q.defer();
          var Menu = Parse.Object.extend("Menu");
          var MenuC = new Menu();
          var MenuID = "BD9lPMwuxS";
          MenuC.id = MenuID;
          var MenuDessert = Parse.Object.extend("MenuItem");
          var queryDessert = new Parse.Query(MenuDessert);
          queryDessert.equalTo("CategoryPointer", MenuC);
          queryDessert.find({
               success: function (data) {
                    angular.forEach(data, function (result) {
                         menuItem.push({
                              FoodName: result.get("Name"),
                              Description: result.get("Description"),
                              NutritionInfo: result.get("NutritionInfo"),
                              Price: result.get("Price"),
                              FoodID: result.get("FoodID"),
                              FoodImg: result.get("ItemPhoto").url()
                         });
                         //alert("Food: " + result.get("Name"));
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
          .then(function (Dessert) {
               //alert("MenuValue:" + menuItem[0].FoodName);
               $scope.MenuDesserts = menuItem;
          })
          .catch(function (error) {
               //Balh
          });
          $scope.headingCaption = 'Menu';
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
              order.set("Completed", false);
              order.set("InProgress", false);
              order.set("Paid", false);
              //order.set("TableID", findTable($rootScope.currentUser))
              //We need to create a function for this later Right now we get this shit to work
              order.save(null, {
                  success: function (order) {
                      console.log("SAVED");
                      alert("You added " + _foodObject.FoodName);
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
                  },
                  error: function (orderObject, error) {
                      console.log("FAILED");
                  }
                  
              });
          }
     }]);

/*
     
     EOF

*/