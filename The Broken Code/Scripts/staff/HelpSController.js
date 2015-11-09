restaurantApp.controller('HelpSController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {
         var helpList = [];
         var WaitstaffDfd = $q.defer();
         var Help = Parse.Object.extend("Help");
         var queryHelp = new Parse.Query(Help);
         queryHelp.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     helpList.push({
                         Request: result.get("HelpRequest"),
                         String: result.get("HelpStatus")
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
         .then(function (Help) {
             $scope.Help = helpList;
         })
         .catch(function (error) {

         });
         $scope.headingCaption = 'Help';
     }]);