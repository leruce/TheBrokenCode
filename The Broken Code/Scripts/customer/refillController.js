


restaurantApp.controller('refillController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {


         $scope.RefillF = function () {


             var Refill = Parse.Object.extend("Refill");
             var refill = new Refill();
             var String = document.getElementById('refilltext').value;


             refill.set("RefillRequest", String);
             refill.set("customer", $rootScope.currentUser.id);
             refill.save(null, {
                 success: function (refill) {
                     alert("Thank you! Your request has been sent!");
                 },
                 error: function (refill, error) {
                     //  alert("Failed to create!");
                 }
             });
         }
     }])