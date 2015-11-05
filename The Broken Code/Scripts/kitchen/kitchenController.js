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
     ['$interval', '$rootScope', '$scope', 'ParseService', '$http', '$location',
     function ($interval, $rootscope, $scope, $http, $location, ParseService) {
         $scope.headingCaption = 'Kitchen';

         
         $scope.start = new Date();
         $scope.now = new Date();
         $scope.orderObjects = [];
         $scope.orders = [
             {
                 id: 0,
                 table: '0',
                 comments: 'template comments',
                 placedTime: new Date,
                 waitTime: 0,
                 items: [34,35,33]
             },
             {
                 id: 0,
                 table: '0',
                 comments: 'template comments',
                 placedTime: new Date,
                 waitTime: 0,
                 items: [38, 37, 36]
             },
             {
                 id: 0,
                 table: '0',
                 comments: 'template comments',
                 placedTime: new Date,
                 waitTime: 0,
                 items: [38, 37, 36]
             }
         ];
         
         $scope.works = "nope";

         $scope.addOrder = function () {
             alert("working");
             $scope.works = "yep";
      /*       var GameScore = Parse.Object.extend("Order");
             var gameScore = new GameScore();

             gameScore.save(null, {
                 success: function (gameScore) {
                     // Execute any logic that should take place after the object is saved.
                     alert('New object created with objectId: ' + gameScore.id);
                 },
                 error: function (gameScore, error) {
                     // Execute any logic that should take place if the save fails.
                     // error is a Parse.Error with an error code and message.
                     alert('Failed to create new object, with error code: ' + error.message);
                 }
             });*/
         };
         
         $scope.removeOrder = function (index) {
             //parse code here
             
             var Order = Parse.Object.extend("order");
             var query = new Parse.Query(Order);
            
             query.equalTo("objectID", $scope.orders[index].id);
             $scope.orders.splice(index, 1);
             query.first({
                 success: function (object) {
                     object.set("Completed", true);
                     object.save();
                 },
                 error: function (error) {
                     alert("Error: " + error.code + " " + error.message + "Object removed from order list regardless");
                 }
             });
             
         };
 
         $scope.getItemNames = function (item) {

             //parse code here


             var Item = Parse.Object.extend("MenuItem");
             var query = new Parse.Query(Item);
             query.equalTo("FoodID", item);
             query.first({
                 success: function (obj) {
                     element.text(obj.get("Name"));
                 },
                 error: function (error) {
                     alert("Error: " + error.code + " " + error.message);
                 }
             });
         };

         /*
         var updateOrders = function () {
             var Order = Parse.Object.extend("Order");
             var query = new Parse.Query(Order);
             query.equalTo("Completed", false);
             query.equalTo("InProgress", false);
             query.find({
                 success: function (results) { //returns list
                     object.set("InProgress", true);
                     object.save();
                     $scope.orders.push({
                         id: object.id,
                         table: $scope.getTableNum(object.get("TableID")),
                         comments: 'template comments',
                         placedTime: object.createdAt,
                         waitTime: 0,
                         items: object.get("ItemsOrdered")
                     });
                 },
                 error: function (error) {
                     alert("Error: " + error.code + " " + error.message);
                 }
             });
             $scope.orders.forEach(function (order) {
                 order.waitTime = Date.now() - order.placedTime;
             });
         };

         $scope.getTableNum = function (id) {
             var Table = Parse.Object.extend("Table");
             var query = new Parse.Query(Table);
             query.equalTo("id", id);
             query.first({
                 success: function (table) {
                     return table.get("TableID");
                 },
                 error: function (error) {
                     return 0;
                 }
             });
             return 0;
         };*/
         var tick = function () {
             $scope.orders.forEach(function (order) {
                 order.waitTime = Date.now() - order.placedTime;
             });
         }
         //    $interval(updateOrders, 20000);
         $scope.getItemNames(0);
         $scope.getItemNames(1);
         $scope.getItemNames(2);
         $interval(tick, 1000);
     }]);

/*

     EOF


*/