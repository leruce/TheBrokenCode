'use strict';

restaurantApp.controller('EntreeMenuController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, ParseService, $location, $q) {
         var menuItem = [];
         var MenuDfd = $q.defer();
         var Menu = Parse.Object.extend("Menu");
         var MenuC = new Menu();
         var MenuID = "zABMJ6tOXx";
         MenuC.id = MenuID;
         var MenuEntree = Parse.Object.extend("MenuItem");
         var queryEntree = new Parse.Query(MenuEntree);
         queryEntree.equalTo("CategoryPointer", MenuC);
         queryEntree.find({
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
         .then(function (Entree) {
             //alert("MenuValue:" + menuItem[0].FoodName);
             $scope.MenuEntrees = menuItem;
         })
         .catch(function (error) {
             //Balh
         });
         $scope.headingCaption = 'Menu';
     }]);

/*
     
     EOF

*/