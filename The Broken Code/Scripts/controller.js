'use strict';

/* Controlers */

restaurantApp.controller('MainController',
     ['$rootScope', '$scope', '$http', '$location', '$window', '$q', 'ParseService',
     function ($rootScope, $scope, $http, $location, $window, $q, ParseService) {
          //Get the current user
          $rootScope.currentUser = Parse.User.current();
          
          //Called when user clicks Sign in button
          $scope.login = function () {
              var username = $scope.login.username;
              var password = $scope.login.password;

              Parse.User.logIn(username, password, {
                  success: loginSuccessful,
                  error: loginUnsuccessful
              });
              console.log("user: " + username + " pw: " + password);
              
              var UserList = Parse.Object.extend("_User");
              var queryUser = new Parse.Query(UserList);
              var user;
              queryUser.equalTo("username", username);
              queryUser.find({
                  success: function (data) {
                      angular.forEach(data, function (result) {
                          var update = result.get("updatedAt");
                          var birthday = result.get("Birthday");
                          var lastVisit = result.get("lastVisitTime");
                          var hasRewards = result.get("hasRewards");
                          var points = result.get("rewardPoints");
                          var visits = result.get("numVisits");
                          console.log("bday: " + birthday + " update: " + update);

                          var dt = new Date();

                          // Display the month, day, and year. getMonth() returns a 0-based number.
                          var monthToday = dt.getMonth() + 1;
                          var dayToday = dt.getDate();
                          var yearToday = dt.getFullYear();
                          dt.setFullYear(yearToday, monthToday, dayToday);

                          var month = lastVisit.getMonth();
                          var day = lastVisit.getDate();
                          var year = lastVisit.getFullYear();

                          //var bmonth = birthday.getMonth();
                          //var bday = birthday.getDate();
                          //var byear = birthday.getFullYear();

                          // Output: current month, day, year
                          console.log(dt);
                          console.log(lastVisit);
                          console.log("Month: " + month + " Today Month: " + monthToday);
                          console.log("Day: " + day + " Today Day: " + dayToday);
                          console.log("Year: " + year + " Today Year: " + yearToday);

                          if (day != dayToday && month != monthToday && year != yearToday)
                          {
                              user = data[0];
                              user.set("lastVisitTime", dt);
                              user.set("numVisits", visits + 1);
                              if (hasRewards)
                              {
                                  //if (bday == dayToday && bmonth == monthToday && byear == yearToday)
                                      //points += 10;
                                  
                                  var test = (visits + 1) % 5;
                                  if (test == 0)
                                  {
                                      points += Math.floor((Math.random() * 10) + 1);
                                  }
                                  user.set("rewardPoints", points + 1);
                              }

                              user.save();
                          }
                      });
                  }

              });


          }
          
          //Called when user clicks Register button
          $scope.register = function () {
               var user = new Parse.User();
               user.set("Name", $scope.newuser.name);
               user.set("username", $scope.newuser.username);
               user.set("password", $scope.newuser.password);
               user.set("email", $scope.newuser.email);
               user.set("Birthday", $scope.newuser.Birthday);
               user.set("hasRewards", false);
               user.set("rewardPoints", 0);
               
               var dt = new Date();

               // Display the month, day, and year. getMonth() returns a 0-based number.
               var monthToday = dt.getMonth() + 1;
               var dayToday = dt.getDate();
               var yearToday = dt.getFullYear();
               dt.setFullYear(yearToday, monthToday, dayToday);

               user.set("lastVisitTime", dt);
               user.set("numVisits", 1);
               user.signUp(null, {
                    success: function (user) {                        
                         // Welcome the user and close the modal window
                         $rootScope.currentUser = Parse.User.current();
                         alert("Welcome " + user.getUsername() + "!");
                         $('#registerModal').modal('hide');
                         $window.location.reload()
                         getTable(user);
                    },
                    error: function(user, error) {
                         // Show the error message somewhere and let the user try again.
                         alert("Error: " + error.code + " " + error.message);
                    }
               })
          };

          //Called when user wants to continue as guest
          $scope.guestLogin = function () {
 
              //First thing to do is Check if guest is true
              //Next it to check if they login or not
              //If guest true and login is false we get a list of object
              //in this case it a list of table
              var user = new Parse.User();
              var query = new Parse.Query(Parse.User);
              query.equalTo("isGuest", true);
              query.equalTo("GuestLogin", false);
              console.log(query);
              query.first({
                  success: function (guest) {
                      //This is first open guest we have
                      console.log(guest);
                      var username = guest.get('username');
                      var password = guest.get('username');
                      Parse.User.logIn(username, password, {
                          success: loginSuccessful,
                          error: loginUnsuccessful
                      });
                  }
              })



          };

          //Welcome user and redirect them to the main page
          function loginSuccessful(user) {
               $rootScope.$apply(function () {
                    //Set the currentUser, welcome the user, and get them a table
                    $rootScope.currentUser = Parse.User.current();
                    alert("Login Successful! Welcome " + user.getUsername() + "!");
                    $location.path("/");
                    getTable(user);

               });
          }

          //Gives an error if the login is unsuccessfull 
          function loginUnsuccessful(user, error) {
               switch (error.code) {
                    case Parse.Error.INVALID_SESSION_TOKEN:
                         Parse.User.logOut();
                         break;
                    default:
                         alert("Error: " + error.message + " (" + error.code + ")");
                         break;
               }//end switch
          }

          //Log out function
          $rootScope.logOut = function () {
               $rootScope.currentUser = null;
               Parse.User.logOut();
               $location.path("/");
          };

          //Function to get the user a table
          function getTable(user) {
               var Defered = $q.defer();
               var Table = Parse.Object.extend("Table");
               var tableQuery = new Parse.Query(Table);
               tableQuery.equalTo("Available", true);
               //Looks for and assigns the first free table to the user
               tableQuery.first({
                    success: function (data) {
                         $rootScope.table = data;
                         $rootScope.table.set("Available", false);
                         $rootScope.table.set("Customer", user);
                         $rootScope.$apply;
                    },
                    error: function (error) {
                         alert("Error: " + error.code + " " + error.message);
                    }
               })
               .then(function (orders) {
                    Defered.resolve(orders);
               },
               function (error) {
                    Defered.reject(orders);
               });
               Defered.promise
                    .then(function (orders) {
                         $rootScope.table.save();
                    })
                    .catch(function (error) {
                         //Catch errors
                        // alert("Error: " + error.code + " " + error.message);
                        // alert("An error has occured. Staff has been notified and will be with you shortly.");
                    });
               
          };

}]);


/*

     EOF

*/