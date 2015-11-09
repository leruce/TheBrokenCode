'use strict'
/*
function myPromise($timeout, $q) {
    return $q(function () {
        var defer = $q.defer()

        $timeout(function() {
            defer.resolve('data recieved!')
        },2000)
    })
}
*/

restaurantApp.controller('KitchenController',
     ['$interval', '$rootScope', '$scope', 'ParseService', '$http', '$location', '$q',
     function ($interval, $rootscope, $scope, ParseService, $http, $location, $q) {
         var KitchenDfd = $q.defer();
         $scope.headingCaption = 'Kitchen';
         var Order = Parse.Object.extend("Order");
         var KitchenQueue = Parse.Object.extend("kitchenQueue");



         $scope.removeOrder = function (index) {
             //parse code here

             var query = new Parse.Query(Order);



             query.equalTo("objectID", $scope.orders[index].id);
             $scope.orders.splice(index, 1);
             query.first({
                 success: function (object) {
                     object.set("Completed", true);
                     object.save();
                 },
                 error: function (error) {
                     alert("Error: " + error.code + " " + error.message);
                 }
             });

         };
         var getItemNames = function (items) {
             var result = [];
             var nextItem;
             items.forEach(function (item) {
                 switch (item) {
                     case 38:
                         result.push("Kids Cheese Burger");
                         break;
                     case 37:
                         result.push("Kids Grilled Chicken Meal");
                         break;
                     case 36:
                         result.push("Classic Bacon Burger");
                         break;
                     case 35:
                         result.push("Hamburger with Cheese");
                         break;
                     case 34:
                         result.push("Original Ribs");
                         break;
                     case 33:
                         result.push("Classic Ribeye");
                         break;
                     case 32:
                         result.push("Classic Sirloin");
                         break;
                     case 31:
                         result.push("Grilled Ranch Chicken Sandwich");
                         break;
                     case 30:
                         result.push("Classic Turkey Toasted Sandwich");
                         break;
                     case 29:
                         result.push("Southwestern BLT Toasted Sandwich");
                         break;
                     case 28:
                         result.push("Chicken Caesar Salad");
                         break;
                     case 27:
                         result.push("Grilled Chicken Salad");
                         break;
                     case 26:
                         result.push("Fresh Salad");
                         break;
                     case 25:
                         result.push("Sprite");
                         break;
                     case 24:
                         result.push("Water");
                         break;
                     case 23:
                         result.push("Strawberry Lemonade");
                         break;
                     case 22:
                         result.push("Black Raspberry Lemonade");
                         break;
                     case 21:
                         result.push("Raspberry Lemonade");
                         break;
                     case 20:
                         result.push("Lemonade");
                         break;
                     case 19:
                         result.push("Sweet Tea");
                         break;
                     default:
                         result.push("INVALID ITEM CODE");
                         break;
                 }
             });
             return result;

         };
         $scope.orders = [/*
             {
                 id: '0',
                 table: '0',
                 comments: 'template comments',
                 placedTime: new Date,
                 waitTime: 0,
                 items: getItemNames([34, 35, 33])
             },
             {
                 id:'0',
                 table: '0',
                 comments: "template comments",
                 placedTime: new Date,
                 waitTime: 0,
                 items: getItemNames([38, 37, 36])
             },
             {
                 id:'0',
                 table: '0',
                 comments: "template comments",
                 placedTime: new Date,
                 waitTime: 0,
                 items: getItemNames([38, 37, 36])
             }*/
         ];
         var orderObjects = [];
         var getOrders = function () {
             orderObjects = [];
             var queryOrder = new Parse.Query(Order);
             queryOrder.equalTo("Completed", false);
             queryOrder.find({
                 success: function (data) {
                     angular.forEach(data, function (result) {
                         orderObjects.push({
                             id: result.get("ObjectId"),
                             table: result.get("TableID").get("TableID"),
                             comments: result.get("OrderComment"),
                             placedTime: result.get("createdAt"),
                             waitTime: 0,
                             items: getItemNames(result.get("ItemsOrdered"))
                         });
                     });
                 },
                 error: function (error) {
                     alert("Error: " + error.code + " " + error.message);
                 }
             }).then(function (data) {
                 KitchenDfd.resolve(data);
             },
             function (error) {
                 //error things
                 KitchenDfd.reject(data);
             });
             KitchenDfd.promise
             .then(function (data) {
                 $scope.orders = orderObjects;
             })
             .catch(function (error) {
                 //Balh
             });
             tick();
         };

         /*
         var loadQueue = function () {
             var orderObjects = [];
             var queryQueue = new Parse.Query(KitchenQueue);
             var queryOrder;
             queryQueue.find({
                 success: function (data) {
                     angular.forEach(data, function (result) {
                         orderObjects.push(result.orderID);
                     });
                 },
                 error: function (error) {
                     alert("Error: " + error.code + " " + error.message);
                 }
             }).then(function (data) {
                 angular.forEach(orderObjects, function (id) {
                     queryOrder = new Parse.Query(Order);
                     queryOrder.equalTo(id);
                     queryOrder.first({
                         success: function (result) {
                             $scope.orders.push({
                                 id: result.get("ObjectId"),
                                 table: getTableNum(result.get("TableID")),
                                 comments: result.get("OrderComment"),
                                 placedTime: result.get("createdAt"),
                                 waitTime: 0,
                                 items: getItemNames(result.get("ItemsOrdered"))
                             });
                         },
                         error: function (error) {
                             //error stuff
                         }
                     });
                 });
             },
             function (error) {
                 //error things
                 alert("Error: " + error.code + " " + error.message);
             });
         };*/

         var tick = function () {
             $scope.orders.forEach(function (order) {
                 order.waitTime = new Date() - order.placedTime;
             });
         };

         //loadQueue();
         getOrders();
         //   $interval(getOrders, 10000);
         $interval(tick, 1000);
     }]);

/*

     EOF


*/