restaurantApp.controller('Table2Controller',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {
         var list = [];
         var TableDfd2 = $q.defer();
         var Table2 = Parse.Object.extend("Table");
             
         var queryList = new Parse.Query(Table2);
             
         queryList.equalTo("TableID", 2);
            
         queryList.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     list.push({
                         ID: result.get("TableID"),
                         Customer: result.get("Customer"),
                         Status: result.get("Status")
                     });



                 });
             },


             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         })

             


             
             
             
             
         .then(function (data) {

             TableDfd2.resolve(data);
             //next query based on _User class
             //console.log(data.get("Customer"));
                 
         },
         function (error) {
             TableDfd2.reject(data);

         });

            


         TableDfd2.promise
             .then(function (List) {


                 
                 var nameList = [];
                 var cust = Parse.Object.extend("User");
                
                 var queryCust = new Parse.Query(cust);
                 queryCust.equalTo("objectId", list[0].Customer.id);
                 
                 queryCust.find({
                     success: function (data) {
                         angular.forEach(data, function (result) {
                             nameList.push({

                                 Name: result.get("Name"),
                               

                             });



                         });
                     },


                     error: function (error) {
                         alert("Error: " + error.code + " " + error.message);
                     }
                 })


                 .then(function (data) {

                     TableDfd2.resolve(data);
                   
                     

                 },
             function (error) {
                 TableDfd2.reject(data);

             });
                 $scope.Table2 = list;
                 $scope.Name = nameList;
                 
             })





                 .catch(function (error) {

                 });
     }]);