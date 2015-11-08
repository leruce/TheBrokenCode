//View Order
//We need to do the following things:
//We need to pull out a list of query to show in the front page
//Note, we need to also create a function call ReturnFoodNameById
//This is just a function ReturnFoodNameById(foodid) and it return a string consist of a food name
//In fact, let just make it return the Object itself so we can access the Price but let also do this as well where
//If we have more than 1 of same food item, we just refer that as a text box where it have the total number of food item
//So the scope of the food object will consist of the following things:
//Food Name, Number of Food Name, Food Price, and that it
//Order Object:
//The Total Cost, List of foodid, Customer, OrderComment, Table Number and maybe Booleans We will see
//The overall Controller flow would be
//Collect the current Order from the Current Customer
//Reason for this is due to the fact, the customer can only modifiy the order they have not sumbitted yet
//We check if the current Order is Null meanign NO CURRENT ORDERS
//-> We then display no order open and only show current table/Customr name and maybe a return button to menu?
//If the current Order IS NOT NULL
//->We then display in the following order
//->-->Order Number
//->-->Number of Food Name, Food Name, Comments, Button call SaveComment, Button call Delete Item BY THE FOLLOWING LOGIC(Total Num - New total Num)
//->-->Submit button called Complete Order which goes to a function call CompleteOrder(orderid)

'use strict';

restaurantApp.controller('ViewOrderController',
    ['$rootScope', '$scope', '$http', '$location', '$window', '$q', 'ParseService',
        function ($rootScope, $scope, $http, $location, $window, $q, ParseService) {
            //console.log("We have enter the controller");
            //$scope.CommentArea = "";
            var Defered = $q.defer();
            var Order = Parse.Object.extend("Order");
            var viewOrderQuery = new Parse.Query(Order);
            viewOrderQuery.equalTo("Customer", $rootScope.currentUser);
            viewOrderQuery.equalTo("Ordered", false);
            var FoodItem = [];
            viewOrderQuery.first({
                success: function (orders) {
                    if (orders == null) {
                        //console.log("We get into no orders in view");
                    }
                    else {
                        //console.log("We got an order to list");
                        angular.forEach(orders, function (result) {
                            FoodItem.push({
                                OrderComment: orders.get("OrderComment"),
                                Cost: orders.get("Cost"),
                                ItemOrdered: orders.get("ItemOrdered"),
                                ID: orders.id
                            })
                        })
                    }
                },
                error: function (orders, error) {
                    alert("We got an error son!");
                }
            }).then(function (orders) {
                Defered.resolve(orders);
                ///$scope.CrudeOrder = FoodItem;
                //console.log($scope.orderStuff);
                //console.log("First Resolve give us this: "+orders.get("ItemsOrdered"));
            },
            function (error) {
                Defered.reject(orders);
            });
            Defered.promise
            .then(function (orders) {
                console.log("Which then be promised to hold value :" + orders.get("ItemsOrdered"));
                $scope.CrudeOrder = FoodItem;
                $scope.Cost = FoodItem[0].Cost;
                //console.log(FoodItem.legnth);
                CheckOrder(orders);
                //Here where i will  call my function
            })
            .catch(function (error) {
                //Catch errors
                console.log("We get an ERROR here");
            });
            function CheckOrder(Ordered) {
                //console.log("We get into the CheckOrdered");
                var SecondDeffered = $q.defer();
                var OrderExpanded = [];
                var menuItem = Parse.Object.extend("MenuItem");
                var menuQuery = new Parse.Query(menuItem);
                var FoodIDArray = Ordered.get("ItemsOrdered")

                menuQuery.find({
                    success: function (OrderExpand) {
                        angular.forEach(OrderExpand, function (result) {
                            for (var x = 0; x < FoodIDArray.length; x++) {
                                if (FoodIDArray[x] == result.get("FoodID")) {
                                    //console.log("We got into the Check order Success!");
                                    OrderExpanded.push({
                                        FoodName: result.get("Name"),
                                        Price: result.get("Price"),
                                        FoodID: result.get("FoodID"),
                                        OrderID: Ordered.id,
                                        OrderComment: Ordered.get("OrderComment"),
                                        FoodIDarray: Ordered.get("ItemsOrdered"),
                                        Cost: Ordered.get("Cost")
                                    });
                                }
                            }
                        });
                    },
                    error: function (error) {
                        alert("Error DUDE");
                    }

                }).then(function (OrderExpand) {
                    SecondDeffered.resolve(OrderExpand);
                    //console.log("We resvolved the 2nd promise we have " + OrderExpand);
                },
                function (error) {
                    SecondDeffered.reject(OrderExpand);
                });
                SecondDeffered.promise
                .then(function (OrderStuff) {
                    $rootScope.OrderThings = OrderExpanded;
                    //console.log("In the 2nd Promise! " + $rootScope.OrderThings);
                    //return OrderExpanded;
                })
                .catch(function (error) {
                    alert("WEEEE");
                });
            }
            $scope.DeleteItem = function (ItemToDelete) {
                console.log("We clicked DeleteItemFunction");
                //Goal: Get the Order ID stuff
                console.log(ItemToDelete);
                //Query for that item
                //Remove that Item
                //We first need to find the index value
                for (var x = 0; x < ItemToDelete.FoodIDarray.length; x++) {
                    if (ItemToDelete.FoodID == ItemToDelete.FoodIDarray[x]) {
                        //console.log("We show up ONE TIME");
                        //Now we delete 
                        console.log(ItemToDelete.FoodIDarray);
                        ItemToDelete.FoodIDarray.splice(x, 1);
                        console.log(ItemToDelete.FoodIDarray);
                        var NewOrder = Parse.Object.extend("Order");
                        var OrderQuery = new Parse.Query(NewOrder);
                        OrderQuery.get(ItemToDelete.OrderID, {
                            success: function (TempOrder) {
                                console.log(TempOrder);
                                TempOrder.set("ItemsOrdered", ItemToDelete.FoodIDarray);
                                console.log(ItemToDelete.Cost);
                                console.log(ItemToDelete.Price);
                                TempOrder.set("Cost", (ItemToDelete.Cost - ItemToDelete.Price));
                                TempOrder.save(null, {
                                    success: function (Stuff) {
                                        console.log("We saved it?");
                                    }
                                });
                            }
                        });

                        //  OrderQuery.equalTo("objectId", OrderIdAdded);
                        //OrderQuery.find({
                        //  success: function (DeletedOrder) {
                        //    console.log(DeletedOrder);
                        //  DeletedOrder.set("ItemOrdered", ItemToDelete.FoodIDarray);
                        //DeletedOrder.save();
                        // }

                        //                        })
                        break;
                    }
                }


            }
            $scope.SaveComment = function (OrderSend, TextBoxComments) {
                //We take in the Textbox save the value in the fucking textbox then store the shit in the god damn database and we done
                //IN order to do this shit we need to Pull the fucking thing
                console.log("We got into SaveComment");
                console.log(TextBoxComments);
                for (var x = 0; x < OrderSend.FoodIDarray.length; x++) {
                    if (OrderSend.FoodIDarray[x] == OrderSend.FoodID) {
                        //console.log("We EDIT THIS SHIT BROTHER");
                        //var CommentStuff = $scope.CommentArea;

                        OrderSend.OrderComment.splice(x, 0, TextBoxComments);
                        ///console.log(OrderSend.OrderComment);
                        var NewOrder = Parse.Object.extend("Order");
                        var OrderQuery = new Parse.Query(NewOrder);
                        OrderQuery.get(OrderSend.OrderID, {
                            success: function (TempOrder) {
                           ///     console.log(TempOrder);
                                TempOrder.set("OrderComment", OrderSend.OrderComment);
                                TempOrder.save(null, {
                                    success: function (Stuff) {
                              //          console.log("We saved it?");
                                    }
                                });
                            }
                        });

                    }
                }
            }
            $scope.Submit = function (OrderSubmit) {
                //Goal is to get the Order then flip the True/False value
                //Flip Ordered
                //Flip InProgress
                console.log("We get into Submit");
                console.log(OrderSubmit);
                var NewOrder = Parse.Object.extend("Order");
                var OrderQuery = new Parse.Query(NewOrder);
                console.log(OrderSubmit[0].OrderID);
                OrderQuery.get(OrderSubmit[0].OrderID, {
                    success: function (OrderS) {
                        OrderS.set("Ordered", true);
                        OrderS.set("InProgress", true);
                        OrderS.save(null, {
                            success: function (Stuff) {
                                console.log("We saved it?");
                            }
                        });
                    }
                });
            }

        }
    ])

/*
restaurantApp.controller('ViewOrderController',
    ['$rootScope', '$scope', '$http', '$location', '$window', '$q', 'ParseService',
        function ($rootScope, $scope, $http, $location, $window, $q, ParseService) {
            console.log("We gt into the view oRDER cONTROLLER");
            var Order = Parse.Object.extend("Order");
            var deferred = $q.defer();
            var viewOrderQuery = new Parse.Query(Order);
            $rootScope.FoodArray = [];
            viewOrderQuery.equalTo("Customer", $rootScope.currentUser);
            viewOrderQuery.equalTo("Ordered", false);
            viewOrderQuery.first({
                success: function (orders) {
                    if (orders == null) {
                        console.log("We coming in fast and dry!");
                        //This mean NO DAMN ORDER THERE BROTHERS
                    }
                    else {
                        console.log("We coming in slow and wet!");
                        //We got some shit to view. SHOW ME NOW
                        //var food = CollectFoodObject(orders);
                        //console.log(CollectFoodObject(orders));
                        //That goes to the scope in question
                        $rootScope.FoodArray = CollectFoodObject(orders);
                        console.log("FoodStuff " + $rootScope.FoodArray);
                    }
                }
            })
            console.log("We are outside the Success " + $rootScope.FoodArray);
            //This return an array of food.


            function CollectFoodObject(order) {
                var FoodIDArray = order.get("ItemsOrdered");
                //This is an array of Items
                console.log(FoodIDArray);
                var FoodItem = [];
                var food = Parse.Object.extend("MenuItem");
                var foodQuery = new Parse.Query(food);
                //Basically We need to put each food Object into the FoodItem Array
                //But we only want the food object in ItemOrdered
                foodQuery.find({
                    success: function (food) {
                        console.log("The Food length is " + food.length);
                        angular.forEach(food, function (foodstuff) {
                            for (var x = 0; x < FoodIDArray.length; x++) {
                                if (foodstuff.get("FoodID") == FoodIDArray[x]) {
                                    console.log("IT FUCKING WORKS");
                                    //So here we push
                                    FoodItem.push({
                                        FoodName: foodstuff.get("Name"),
                                        Price: foodstuff.get("Price")
                                    });

                                    //console.log("Report on Food Name " + FoodItem[x].FoodName);
                                }
                            }
                        });

                        console.log(FoodItem);
                        return FoodItem;
                    }
                })
            }
        }]);*/