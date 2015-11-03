'use strict';

restaurantApp.controller('ViewOrderController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {
          var allOrder = [];
          var OrderDfd = $q.defer();
          var Table = Parse.Object.extend("Table");
          console.log($rootScope.currentUser);
          var newTable = $rootScope.table;
          var thisOrder = Parse.Object.extend("Order");
          var queryOrder = new Parse.Query(thisOrder);
          queryOrder.equalTo("TableID", newTable.getObjectId());
          queryOrder.find({
               success: function (data) {
                    angular.forEach(data, function (result) {
                        allOrder.push({
                              OrderID: result.get("OrderID"),
                              Cost: result.get("Cost"),
                              ItemOrdered: result.get("ItemOrdered"),
                              Ordered: result.get("Ordered")
                         });
                         //alert("Food: " + result.get("Name"));
                    });
               },
               error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
               }
          }).then(function (data) {
               console.log("dataamount" + data.length);
               OrderDfd.resolve(data);
               //alert("Working got " + menuItem.length);
          },
          function (error) {
               OrderDfd.reject(data);

          });
          OrderDfd.promise
          .then(function (Dessert) {
               //alert("MenuValue:" + menuItem[0].FoodName);
               $scope.allOrder = menuItem;
          })
          .catch(function (error) {
               //Balh
          });
          $scope.headingCaption = 'Menu';
     }]);