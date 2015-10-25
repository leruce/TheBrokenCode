restaurantApp.controller('TableController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {
         var TableName = [];
         var TableDfd = $q.defer();
         //var TablePage = Parse.Object.extend("TablePage");
        // var TableC = new TablePage();
         //var TableID = "YjJYr68NKm";
         //TableC.id = TableID;
         var Table = Parse.Object.extend("Table");
         var queryTable = new Parse.Query(Table);
         //queryTable.equalTo("Pointer", TableC);
         queryTable.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     TableName.push({
                         ID: result.get("TableID"),
                         Status: result.get("TableStatus"),
                         //Notification: result.get("TableNotification"),
                         //Customer: result.get("Customer"),
                         //Staff: result.get("WaitStaffID")
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
         $scope.headingCaption = 'Table';
     }]);