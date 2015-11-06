restaurantApp.controller('RefillsSController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {
         var refillsList = [];
         var RefillsDfd = $q.defer();
         var Refills = Parse.Object.extend("Refills");
         var queryRefills = new Parse.Query(Refills);
         queryRefills.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     refillsList.push({
                         Request: result.get("RefillRequest"),
                         String: result.get("RefillID",refillsList)
                     });

                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             RefillsDfd.resolve(data);

         },
         function (error) {
             Refills.reject(data);

         });
         RefillsDfd.promise
         .then(function (Refills) {
              console.log(Refills);
             console.log(Refills);
             $scope.Refills = refillsList;
         })
         .catch(function (error) {

         });
         $scope.headingCaption = 'Refills';
     }]);
