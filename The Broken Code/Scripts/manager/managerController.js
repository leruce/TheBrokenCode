restaurantApp.controller('ManagerController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {
         var reportList = [];
         var ManagerDfd = $q.defer();
         var Report = Parse.Object.extend("Notification");
         var queryReport = new Parse.Query(Report);
         queryReport.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     reportList.push({
                         ID: result.get("StaffName"),
                         Reason: result.get("Reason"),
                         Reduced: result.get("AmountReduced"),
                     });

                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             ManagerDfd.resolve(data);

         },
         function (error) {
             Manager.reject(data);

         });
         ManagerDfd.promise
         .then(function (Report) {

             $scope.Report = reportList;
         })
         .catch(function (error) {

         });
         $scope.headingCaption = 'Report';
     }]);