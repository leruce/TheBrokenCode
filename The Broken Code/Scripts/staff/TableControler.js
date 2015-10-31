restaurantApp.controller('TableController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {
         var TableName = [];
         var TableDfd = $q.defer();
         var Table = Parse.Object.extend("Table");
         var queryTable = new Parse.Query(Table);
         queryTable.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     TableName.push({
                         ID: result.get("TableID"),
                         Status: result.get("tableStatus"),
                     });
                     
                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             TableDfd.resolve(data);
             
         },
         function (error) {
             TableDfd.reject(data);

         });
         TableDfd.promise
         .then(function (Table) {
            
             $scope.Table = TableName;
         })
         .catch(function (error) {
            
         });
         $scope.headingCaption = 'TablePage';
     }]);