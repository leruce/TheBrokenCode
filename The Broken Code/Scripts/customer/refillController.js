function PageRController()
{
            var Refill = Parse.Object.extend("Refill");
            var refill = new Refill();
            var refillList = [];

            //var String = document.getElementById('refilltext').value;
            var String;
    
    for (var x = 0; x < 12; x++)
    {
        String = document.getElementById('refilltext'+ x).value;
        refillList.push(String);
        console.log(String);
    }
        refill.set("RefillID", refillList);
        refill.save(null, {
                success: function (refill) {
                    alert("Thank you! Your request has been sent!");

                },
                error: function (refill, error) {
                   // alert("Failed to create!");
                }
            });
    
};
