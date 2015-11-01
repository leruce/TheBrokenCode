restaurantApp.controller('PageRController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {
         var RefillName = [];
         var RefillDfd = $q.defer();
         var Refill = Parse.Object.extend("Refill");
         var queryRefill = new Parse.Query(Refill);
         var value = element(by.binding('example.value'));
         var input = element(by.model('example.value'));
         queryRefill.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     RefillName.push({
                         ID: result.get("RefillID"),
                         TableID: result.get("TableID"),
                         DrinkName: result.get("DrinkName"),
                     });
                     
                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             RefillDfd.resolve(data);
             
         },
         function (error) {
             RefillDfd.reject(data);

         });
         RefillDfd.promise
         .then(function (Refill) {
            
             $scope.Refill = RefillName;
         })
         .catch(function (error) {
            
         });
         $scope.headingCaption = 'Refill';
     }]);
