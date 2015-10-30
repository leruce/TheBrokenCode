'use strict';

restaurantApp.controller('DrinkMenuController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {
         var menuItem = [];
         var MenuDfd = $q.defer();
         var Menu = Parse.Object.extend("Menu");
         var MenuC = new Menu();
         var MenuID = "6Qsej6wC2a";
         MenuC.id = MenuID;
         var MenuDrink = Parse.Object.extend("MenuItem");
         var queryDrink = new Parse.Query(MenuDrink);
         queryDrink.equalTo("CategoryPointer", MenuC);
         queryDrink.find({
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
         .then(function (Drink) {
             //alert("MenuValue:" + menuItem[0].FoodName);
             $scope.MenuDrinks = menuItem;
         })
         .catch(function (error) {
             //Balh
         });
         $scope.headingCaption = 'Menu';
     }]);
     
/*
     
     EOF

*/