'use strict';

restaurantApp.controller('removeController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q', '$uibModal',
     function ($rootScope, $scope, $http, ParseService, $location, $q, $uibModal) {
         var Item = [];
         var IngredientDfd = $q.defer();
         var MenuIngredient = Parse.Object.extend("Ingredients");
         var queryIngredient = new Parse.Query(MenuIngredient);
         queryIngredient.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     console.log(result);
                     Item.push({
                         IngredientName: result.get("Name"),
                         IngredientID: result.get("IngredientID"),
                     });
                 });
                 console.log(data.length);
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             IngredientDfd.resolve(data);
             //alert("Working got " + menuItem.length);
         },
         function (error) {
             IngredientDfd.reject(data);

         });
         IngredientDfd.promise
         .then(function (Entree) {
             //alert("MenuValue:" + menuItem[0].FoodName);
             $scope.Ingredient = Item;
         })
         .catch(function (error) {
             //Balh
         });
         $scope.headingCaption = 'Ingredients';
         //Add item to order
         $scope.removeFromMenu = function (Item) {
             //var boolean = document.getElementById(Item.);
             checkOrderQuery.equalTo("Customer", $rootScope.currentUser);
             checkOrderQuery.equalTo("Ordered", false);
             checkOrderQuery.first({
                 success: function (orders) {
                     if (orders == null) {
                         console.log("We got no orders for this person sucka");
                         createOrder(Item);
                     }
                     else {
                         console.log("we get into the query first order " + orders.id);
                         //We need to check if order exist or not. since it can return a 0.
                         addItem(orders, Item);
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
                 },
                 error: function (order, error) {
                     console.log("Failed " + error.code + error.message);
                 }
             });

         }
     }]);

/*
     
     EOF

*/