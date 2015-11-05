//Garrett Comment guide
//First off, you can to set up the ID on the html page so they all unique. ie refillText1 and etc
//Once that is done, what you will do is create a new variable call RefillList which is an array of drinks needed for refill
//Now we need to create a loop to collect the refill amount for every drink if they do't need a refill denote that as 0
//
//You do this by appending that number to the end of the array called RefillList or the like
//Once you finish pulling all the data from the html side you will set it into the database then save the object

//That should resolve this problem. You will need to create a another function on waitstaff side to break the array down and list out the drink by name.
//Another method you can do is create a data structue directory if javascript doesn't have it, but we running low on time. 
//If you need help i will be on the chat

function PageRController()
{
            var Refill = Parse.Object.extend("Refill");
            var refill = new Refill();
            var refillList = [];
<<<<<<< Updated upstream
            //var String = document.getElementById('refilltext').value;
            var String;
            for (var i = 0; i < 12; i++) {
                String = document.getElementById('refilltext' + i).value;
                refillList.push(String);
                console.log(String);
            }
            console.log(refillList);
            refill.save(null, {
=======
            var String;
    
    for (var x = 0; x < 12; x++)
    {
        String = document.getElementById('refilltext'+ x).value;
        refillList.push(String);
        console.log(String);
    }
        refill.set("RefillID", refillList);
        refill.save(null, {
>>>>>>> Stashed changes
                success: function (refill) {
                    alert("Thank you! Your request has been sent!");

                },
                error: function (refill, error) {
                   // alert("Failed to create!");
                }
            });
    
};
