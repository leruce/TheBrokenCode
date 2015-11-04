'use strict';

restaurantApp.controller('ModalInstanceCtrl', ['$scope', function ($scope, menuAppetizers) {
    $scope.menuAppetizers = menuAppetizers;
}]);



restaurantApp.controller('AppetizerMenuController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q', '$uibModal',
     function ($rootScope, $scope, $http, ParseService, $location, $q, $uibModal) {
         var menuItem = [];
         var MenuDfd = $q.defer();
         var Menu = Parse.Object.extend("Menu");
         var MenuC = new Menu();
         var MenuID = "XHFUmxcRYv";
         MenuC.id = MenuID;
         var MenuAppetizer = Parse.Object.extend("MenuItem");
         var queryAppetizer = new Parse.Query(MenuAppetizer);
         queryAppetizer.equalTo("CategoryPointer", MenuC);
         queryAppetizer.find({
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
         .then(function (Appetizer) {
             //alert("MenuValue:" + menuItem[0].FoodName);
             $scope.MenuAppetizers = menuItem;
         })
         .catch(function (error) {
             //Balh
         });
         $scope.headingCaption = 'Menu';
         $scope.addToOrder = function (_foodID) {
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
                     console.log("we get into the query first order " + orders);
                 }
             })
             //If either one of those are false, we just create a new object.
             //Being said, we need to create a new order if we have no customer. We need to create a new order if there no open OrderList
             //Now we get the first one, since we will ONLY have 1 of them open at the time we just append
             //Note, IT DOES NOT RETURN ERROR IF WE HAVE 0, SO WE NEED TO MAKE A CASE FOR THE 0 ITEMS

         }
         $scope.open = function (_menuAppetizer) {
             //console.log("We get into the modal open");
             var modalInstance = $uibModal.open({
                 templateUrl: "Views/menu/myModal.html",
                 controller: 'ModalInstanceCtrl',
                 resolve: {
                     MenuAppetizers: function () {
                         console.log("We managed to get into the open" + " " + _menuAppetizer.FoodName);
                         return _menuAppetizer;
                     }
                     }
             });
         }
     }]);

/*
     
     EOF

*/