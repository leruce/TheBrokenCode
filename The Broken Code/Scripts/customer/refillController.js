function RefillF() 
{
            var Refill = Parse.Object.extend("Refill");
            var refill = new Refill();
            var String = document.getElementById('refilltext').value;
            console.log("Refill"+String);
            refill.set("RefillRequest", String);
            refill.save(null, {
                success: function (refill) {
                    alert("Thank you! Your request has been sent!");
                },
                error: function (refill, error) {
                  //  alert("Failed to create!");
                }
            });
}
  