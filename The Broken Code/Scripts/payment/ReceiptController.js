restaurantApp.controller('ReceiptController',
    ['$rootScope', '$scope', '$http', '$location', '$window', '$q', 'ParseService',
        function ($rootScope, $scope, $http, $location, $window, $q, ParseService) {
            $scope.PhysicalReceipt = function () {
                //This will get the wait staff to bring the damn receipt!
                //This is just just a help request to the waitstaff! to get them their receipt
                var Request = Parse.Object.extend("Help");
                var RequestNew = new Request();
                var String = $rootScope.currentUser.id + "want his receipt!";
                RequestNew.set("HelpRequest", String);
                RequestNew.set("customer", $rootScope.currentUser.id);
                RequestNew.save(null, {
                    success: function (help) {
                        alert("Thank you! Your request has been sent!");
                    },
                    error: function (help, error) {
                        //  alert("Failed to create!");
                    }
                });

            }
            $scope.EmailReceipt = function (EmailTextbox) {
                //This will send a email to the customer!
                console.log("We get in here the email box");
                console.log(EmailTextbox);
                var mailJSON = {
                    "key": "Q80VI0BUNKGKuIsIHEIP1g",
                    "message": {
                        "html": "<p>Receipt</p>",
                        "text": "Receipt",
                        "subject": "YOUR RECEIPT DETAIL",
                        "from_email": "YourLord@LocalHost.com",
                        "from_name": "Your Lord",
                        "to": [
                             {
                                 "email": EmailTextbox,
                                 "name": "Testing",
                                 "type": "to"
                             }
                        ],
                        "headers": {
                            "Reply-To": "message.reply@example.com"
                        }
                    }
                };
                var apiURL = "https://mandrillapp.com/api/1.0/messages/send.json";
                $http.post(apiURL, mailJSON).
                    success(function (data, status, headers, config) {
                        alert("Email  is  sent out");
                        $scope.form = {};
                        console.log('successful email send.');
                        console.log('status: ' + status);
                        console.log('data: ' + data);
                        console.log('headers: ' + headers);
                        console.log('config: ' + config);
                    }).error(function (data, status, headers, config) {
                        console.log('error sending email.');
                        console.log('status: ' + status);

                    });
            }
                
            

        }]);