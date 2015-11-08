restaurantApp.controller('Table8Controller',
     ['$rootScope', '$scope', '$http', 'ParseService', '$location', '$q',
     function ($rootScope, $scope, $http, $location, ParseService, $q) {
         var list = [];
         var TableDfd2 = $q.defer();
         var Table2 = Parse.Object.extend("Table");
             
         var queryList = new Parse.Query(Table2);
             
         queryList.equalTo("TableID", 8);
            
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

                 $scope.Table2 = list;

                 console.log(list[0].Customer.id);
                 var id = list[0].Customer.id;
                 $scope.addToOrder = function (foodObject) {
                     //Goal is to do the following things
                     //Check the Customer via currentUser
                     //We check the order class if we have the following details
                     //If the customer have an order created
                     //If so, we check if Ordered is true or False
                     //If it false then we append the _foodID to the ItemsOrdered
                     //If not, we create a new order object
                     //If not, we then create a new order Object.
                     //That should resolve this problem and add orders into the system easily


                     console.log($rootScope.currentUser);
                     console.log("le" + id);
                     console.log("I'm in this stupid function");
                     var Order = Parse.Object.extend("_User");
                     var OrderC = new Order();
                     var OrderID = id;
                     OrderC.id = OrderID;
                     var Order2 = Parse.Object.extend("Order")
                     var checkOrderQuery = new Parse.Query(Order2);
                     // checkOrderQuery.include("_User");
                     checkOrderQuery.equalTo("Customer", OrderC);
                     checkOrderQuery.equalTo("Ordered", false);
                     checkOrderQuery.first({
                         success: function (orders) {
                             if (orders == null) {
                                 console.log("We got no orders for this person sucka");
                                 createOrder(foodObject);
                             }
                             else {
                                 console.log("we get into the query first order " + orders.id);
                                 //We need to check if order exist or not. since it can return a 0.
                                 addItem(orders, foodObject);
                             }
                         }
                     })
                     //If either one of those are false, we just create a new object.
                     //Being said, we need to create a new order if we have no customer. We need to create a new order if there no open OrderList
                     //Now we get the first one, since we will ONLY have 1 of them open at the time we just append
                     //Note, IT DOES NOT RETURN ERROR IF WE HAVE 0, SO WE NEED TO MAKE A CASE FOR THE 0 ITEMS

                 }
                 function createOrder(_foodObject) {
                     console.log("in createOrder");
                     //What we do is create a object and save it here
                     //We want to set customer, FoodID, Price, The Booleans
                     var Order = Parse.Object.extend("Order");
                     var order = new Order();
                     var Order = Parse.Object.extend("_User");
                     var OrderC = new Order();
                     var OrderID = id;
                     OrderC.id = OrderID;
                     //console.log("food Name " + _foodObject.FoodName);
                     //order.set("ItemsOrdered", [__foodID]);
                     order.set("Customer", OrderC);
                     order.set("ItemsOrdered", [_foodObject.FoodID]);
                     order.set("Cost", _foodObject.Price);
                     order.set("Ordered", false);
                     order.set("Completed", false);
                     order.set("InProgress", false);
                     order.set("Paid", false);
                     //order.set("TableID", list[0].Object);
                     //console.log(list[0].Customer.id + list[0].Object)
                     //order.set("TableID", findTable($rootScope.currentUser))
                     //We need to create a function for this later Right now we get this shit to work
                     order.save(null, {
                         success: function (order) {
                             console.log("SAVED");
                             alert("You added " + _foodObject.FoodName);
                         },
                         error: function (order, error) {
                             console.log("Failed " + error.code + error.message);
                         }
                     });

                 }
                 function addItem(orderObject, _foodObject) {
                     //We need to add price value
                     //Append the  itemsOrdered
                     var cost = orderObject.get("Cost") + _foodObject.Price;
                     var ItemsOrdered = orderObject.get("ItemsOrdered");
                     ItemsOrdered.push(_foodObject.FoodID);
                     console.log(cost);
                     console.log(ItemsOrdered);
                     orderObject.set("Cost", cost);
                     orderObject.set("ItemsOrdered", ItemsOrdered);
                     orderObject.save(null, {
                         success: function (orderObject) {
                             console.log("Saved");
                             alert("You added " + _foodObject.FoodName);
                         },
                         error: function (orderObject, error) {
                             console.log("FAILED");
                         }
                     });
                 }

                 var nameList = [];
                 var cust = Parse.Object.extend("User");
                 var TableDfd3 = $q.defer();
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

                     TableDfd3.resolve(data);



                 },
             function (error) {
                 TableDfd3.reject(data);

             });

                 TableDfd3.promise
                 .then(function (List) {
                     $scope.Name = nameList;

                     $scope.Table2 = list;

                 })

             })





                 .catch(function (error) {

                 });



         //pull appetizers
         var menuItem = [];
         var MenuDfd = $q.defer();
         var Menu = Parse.Object.extend("Menu");
         var MenuA = new Menu();
         var MenuID = "XHFUmxcRYv";
         MenuA.id = MenuID;
         var MenuAppetizer = Parse.Object.extend("MenuItem");
         var queryAppetizer = new Parse.Query(MenuAppetizer);
         queryAppetizer.equalTo("CategoryPointer", MenuA);
         queryAppetizer.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     menuItem.push({
                         FoodName: result.get("Name"),
                         Description: result.get("Description"),
                         NutritionInfo: result.get("NutritionInfo"),
                         Price: result.get("Price"),
                         FoodID: result.get("FoodID"),
                         FoodImg: result.get("ItemPhoto").url(),
                         Amount: result.get("AmountSold")
                     });
                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             MenuDfd.resolve(data);
         },
         function (error) {
             MenuDfd.reject(data);

         });
         MenuDfd.promise
         .then(function (Appetizer) {

             $scope.MenuAppetizers = menuItem;
         })
         .catch(function (error) {

         });


         //pull drinks
         var menuItem2 = [];
         var MenuDfd2 = $q.defer();
         var Menu2 = Parse.Object.extend("Menu");
         var MenuB = new Menu2();
         var MenuID2 = "6Qsej6wC2a";
         MenuB.id = MenuID2;
         var MenuDrink = Parse.Object.extend("MenuItem");
         var queryDrink = new Parse.Query(MenuDrink);
         queryDrink.equalTo("CategoryPointer", MenuB);
         queryDrink.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     menuItem2.push({
                         FoodName: result.get("Name"),
                         Description: result.get("Description"),
                         NutritionInfo: result.get("NutritionInfo"),
                         Price: result.get("Price"),
                         FoodID: result.get("FoodID"),
                         FoodImg: result.get("ItemPhoto").url(),
                         Amount: result.get("AmountSold")
                     });

                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             MenuDfd2.resolve(data);

         },
         function (error) {
             MenuDfd2.reject(data);

         });
         MenuDfd2.promise
         .then(function (Drink) {

             $scope.MenuDrinks = menuItem2;
         })
         .catch(function (error) {

         });


         //pull entrees
         var menuItem3 = [];
         var MenuDfd3 = $q.defer();
         var Menu3 = Parse.Object.extend("Menu");
         var MenuC = new Menu3();
         var MenuID3 = "zABMJ6tOXx";
         MenuC.id = MenuID3;
         var MenuEntree = Parse.Object.extend("MenuItem");
         var queryEntree = new Parse.Query(MenuEntree);
         queryEntree.equalTo("CategoryPointer", MenuC);
         queryEntree.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     menuItem3.push({
                         FoodName: result.get("Name"),
                         Description: result.get("Description"),
                         NutritionInfo: result.get("NutritionInfo"),
                         Price: result.get("Price"),
                         FoodID: result.get("FoodID"),
                         FoodImg: result.get("ItemPhoto").url(),
                         Amount: result.get("AmountSold")
                     });

                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             MenuDfd3.resolve(data);

         },
         function (error) {
             MenuDfd3.reject(data);

         });
         MenuDfd3.promise
         .then(function (Entree) {

             $scope.MenuEntree = menuItem3;
         })
         .catch(function (error) {

         });

         //pull deserts
         var menuItem4 = [];
         var MenuDfd4 = $q.defer();
         var Menu4 = Parse.Object.extend("Menu");
         var MenuD = new Menu4();
         var MenuID4 = "BD9lPMwuxS";
         MenuD.id = MenuID4;
         var MenuDesert = Parse.Object.extend("MenuItem");
         var queryDesert = new Parse.Query(MenuDesert);
         queryDesert.equalTo("CategoryPointer", MenuD);
         queryDesert.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     menuItem4.push({
                         FoodName: result.get("Name"),
                         Description: result.get("Description"),
                         NutritionInfo: result.get("NutritionInfo"),
                         Price: result.get("Price"),
                         FoodID: result.get("FoodID"),
                         FoodImg: result.get("ItemPhoto").url(),
                         Amount: result.get("AmountSold")
                     });

                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         }).then(function (data) {

             MenuDfd4.resolve(data);

         },
         function (error) {
             MenuDfd4.reject(data);

         });
         MenuDfd4.promise
         .then(function (Desert) {

             $scope.MenuDesert = menuItem4;
         })
         .catch(function (error) {

         });


         //pull whole menu
         var menuItem5 = [];
         var revenueList = [];
         var MenuDfd5 = $q.defer();
         var MenuAll = Parse.Object.extend("MenuItem");
         var queryAll = new Parse.Query(MenuAll);
         queryAll.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     menuItem5.push({
                         FoodName: result.get("Name"),
                         Amount: result.get("AmountSold"),
                         Price: result.get("Price"),
                     });

                 });
             },
             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         })

         var gratList = []; //get Tip amount from Order class
         var Gratuity = Parse.Object.extend("Order");
         var GratuityAll = new Parse.Query(Gratuity);
         GratuityAll.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     gratList.push({
                         Gratuity: result.get("Tip"),
                     });

                 });
             },

             error: function (error) {
                 alert("Error: " + error.code + " " + error.message);
             }
         })
     }]);