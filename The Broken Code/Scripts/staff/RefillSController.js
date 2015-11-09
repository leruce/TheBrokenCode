restaurantApp.controller('RefillSController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {
         var refillList = [];
         var WaitstaffDfd = $q.defer();
         var Refill = Parse.Object.extend("Refill");
         var queryRefill = new Parse.Query(Refill);
         queryRefill.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     refillList.push({
                         Request: result.get("RefillRequest"),
                         String: result.get("RefillStatus")
                     });

                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             WaitstaffDfd.resolve(data);

         },
         function (error) {
             Waitstaff.reject(data);

         });
         WaitstaffDfd.promise
         .then(function (Refill) {
             $scope.Refill = refillList;
         })
         .catch(function (error) {

         });
         $scope.headingCaption = 'Refill';
     }]);
