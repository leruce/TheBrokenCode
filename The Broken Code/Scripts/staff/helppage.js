restaurantApp.controller('HelpController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {
         var HelpName = [];
         var HelpDfd = $q.defer();
         var Help = Parse.Object.extend("Help");
         var queryHelp = new Parse.Query(Help);
         queryHelp.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     HelpName.push({
                         Request: result.get("HelpRequest"),
                         Status: result.get("HelpStatus"),
                         TableID: result.get("TableID"),
                     });
                     
                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             HelpDfd.resolve(data);
             
         },
         function (error) {
                HelpDfd.reject(data);

         });
         HelpDfd.promise
         .then(function (Help) {
            
             $scope.Help = HelpName;
         })
         .catch(function (error) {
            
         });
         $scope.headingCaption = 'Help';
     }]);