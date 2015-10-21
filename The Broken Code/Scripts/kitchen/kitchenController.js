'use strict'

restaurantApp.controller('KitchenController',
     ['$rootScope', '$scope', 'ParseService', '$http', '$location',
     function ($rootscope, $scope, $http, $location, ParseService) {
         $scope.headingCaption = 'Kitchen';

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
     }]);

/*

     EOF


*/