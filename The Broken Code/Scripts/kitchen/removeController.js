﻿'use strict';

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
                     
                     var active;
                     if (result.get("Active") == true)
                     {
                         active = "Remove";
                     }
                     else
                     {
                         active = "Activate";
                     }
                     Item.push({
                         IngredientName: result.get("Name"),
                         IngredientID: result.get("IngredientID"),
                         IngredientActive: result.get("Active"),
                         Active: active,
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
             if (Item.Active == "Remove")
             {
                 Item.Active = "Activate";
                 Item.IngredientActive = false;
                 getMenu();
                 console.log(Item.IngredientActive);
             }
             else if (Item.Active == "Activate")
             {
                 Item.Active = "Remove";
                 Item.IngredientActive = true;
                 getMenu();
                 console.log(Item.IngredientActive);
             }

             //If either one of those are false, we just create a new object.
             //Being said, we need to create a new order if we have no customer. We need to create a new order if there no open OrderList
             //Now we get the first one, since we will ONLY have 1 of them open at the time we just append
             //Note, IT DOES NOT RETURN ERROR IF WE HAVE 0, SO WE NEED TO MAKE A CASE FOR THE 0 ITEMS

             
         }
         
         function getMenu() {
             var menuList = [];
             var MenuDfd = $q.defer();
             var Menu = Parse.Object.extend("MenuItem");
             var queryIngredient = new Parse.Query(Menu);
             queryIngredient.find({
                 success: function (data) {
                     angular.forEach(data, function (result) {
                         //console.log(result);
                         menuList.push({
                             menuIngredients: result.get("IngredientList"),
                             menuActive: result.get("Active"),
                         });
                     });
                 },
                 error: function (error) {
                     alert("Error: " + error.code + " " + error.message);
                 }
             }).then(function (data) {
                 //console.log("menu list it " + menuList);
                 //console.log("data is " + data);
                 MenuDfd.resolve(data);
                 //alert("Working got " + menuItem.length);
             },
         function (error) {
             MenuDfd.reject(data);

         });
             MenuDfd.promise
             .then(function (data) {
                 //alert("MenuValue:" + menuItem[0].FoodName);
                 $scope.menuList = data;
             })
             .catch(function (error) {
                 //Balh
             });

             console.log($scope.menuList);

         }
     }]);

/*
     
     EOF

*/