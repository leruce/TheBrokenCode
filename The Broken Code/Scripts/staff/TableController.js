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
                         Status: result.get("Status"),
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





             .then(function (data) {

             MenuDfd5.resolve(data);
           
         },
         function (error) {
             MenuDfd5.reject(data);

         });
         MenuDfd5.promise
         .then(function (All) {
           
             //revenue list that contains revenue, taxes and gratuity
             var revenue = 0;
             var taxes = 0;

             //Loop through all the items and multiply their price by amount sold
             for (i = 0; i < 37; i++) {
                 
                 revenue +=menuItem5[i].Price * menuItem5[i].Amount;
             }

            var result = Math.round(revenue * 100) / 100;  //Get rid of everything past second decimal
             
             taxes = Math.round(result * (0.0825) * 100) / 100; //Get taxes and round to two decimal places

             
             var gratuity = 0;

             for (i = 0; i < gratList.length; i++) {

                 gratuity += gratList[i].Gratuity;
             }

             revenueList.push({  //push revenue and taxes to list
                 Revenue: result,
                 Tax: taxes,
                 Tip: gratuity
             });

             $scope.MenuAll = menuItem5;
             $scope.Revenue = revenueList;
                         
         })
         .catch(function (error) {
             
         });



         //pull help class
         var helpList = [];
         var HelpDfd = $q.defer();
         var Help = Parse.Object.extend("Help");
         var queryHelp = new Parse.Query(Help);
         queryHelp.find({
             success: function (data) {
                 angular.forEach(data, function (result) {
                     helpList.push({
                         Request: result.get("HelpRequest"),
                         Status: result.get("helpStatus")
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
         .then(function (All) {

             $scope.Help = helpList;
         })
         .catch(function (error) {

         });


        
         //$scope.addToOrder = function (foodObject) {
         //    //Goal is to do the following things
         //    //Check the Customer via currentUser
         //    //We check the order class if we have the following details
         //    //If the customer have an order created
         //    //If so, we check if Ordered is true or False
         //    //If it false then we append the _foodID to the ItemsOrdered
         //    //If not, we create a new order object
         //    //If not, we then create a new order Object.
         //    //That should resolve this problem and add orders into the system easily
         //    console.log($rootScope.currentUser);
         //    var Order = Parse.Object.extend("Order");
         //    var checkOrderQuery = new Parse.Query(Order);
         //    checkOrderQuery.equalTo("Customer", $rootScope.currentUser);
         //    checkOrderQuery.equalTo("Ordered", false);
         //    checkOrderQuery.first({
         //        success: function (orders) {
         //            if (orders == null) {
         //                console.log("We got no orders for this person sucka");
         //                createOrder(foodObject);
         //            }
         //            else {
         //                console.log("we get into the query first order " + orders.id);
         //                //We need to check if order exist or not. since it can return a 0.
         //                addItem(orders, foodObject);
         //            }
         //        }
         //    })
         //    //If either one of those are false, we just create a new object.
         //    //Being said, we need to create a new order if we have no customer. We need to create a new order if there no open OrderList
         //    //Now we get the first one, since we will ONLY have 1 of them open at the time we just append
         //    //Note, IT DOES NOT RETURN ERROR IF WE HAVE 0, SO WE NEED TO MAKE A CASE FOR THE 0 ITEMS

         //}
         //function createOrder(_foodObject) {
         //    //What we do is create a object and save it here
         //    //We want to set customer, FoodID, Price, The Booleans
         //    var Order = Parse.Object.extend("Order");
         //    var order = new Order();
         //    //console.log("food Name " + _foodObject.FoodName);
         //    //order.set("ItemsOrdered", [__foodID]);
         //    order.set("Customer", $rootScope.currentUser);
         //    order.set("ItemsOrdered", [_foodObject.FoodID]);
         //    order.set("Cost", _foodObject.Price);
         //    order.set("Ordered", false);
         //    order.set("Completed", false);
         //    order.set("InProgress", false);
         //    order.set("Paid", false);
         //    //order.set("TableID", findTable($rootScope.currentUser))
         //    //We need to create a function for this later Right now we get this shit to work
         //    order.save(null, {
         //        success: function (order) {
         //            console.log("SAVED");
         //        },
         //        error: function (order, error) {
         //            console.log("Failed " + error.code + error.message);
         //        }
         //    });

         //}
         //function addItem(orderObject, _foodObject) {
         //    //We need to add price value
         //    //Append the  itemsOrdered
         //    var cost = orderObject.get("Cost") + _foodObject.Price;
         //    var ItemsOrdered = orderObject.get("ItemsOrdered");
         //    ItemsOrdered.push(_foodObject.FoodID);
         //    console.log(cost);
         //    console.log(ItemsOrdered);
         //    orderObject.set("Cost", cost);
         //    orderObject.set("ItemsOrdered", ItemsOrdered);
         //    orderObject.save(null, {
         //        success: function (orderObject) {
         //            console.log("Saved");
         //        },
         //        error: function (orderObject, error) {
         //            console.log("FAILED");
         //        }

         //    });
         //}
     }]);