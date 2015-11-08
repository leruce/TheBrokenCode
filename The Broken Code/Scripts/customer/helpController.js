


restaurantApp.controller('helpController',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {


         $scope.Helpf = function()
         {
         
             
             var Help = Parse.Object.extend("Help");
             var help = new Help();
             var String = document.getElementById('helptext').value;
            
             
           
             help.set("HelpRequest", String);
             help.set("customer", $rootScope.currentUser.id);
             help.save(null, {
                 success: function (help) {
                     alert("Thank you! Your request has been sent!");
                 },
                 error: function (help, error) {
                     //  alert("Failed to create!");
                 }
             });
         }
     }])