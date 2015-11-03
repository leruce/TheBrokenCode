function PageRController() 
{
            var Refill = Parse.Object.extend("Refill");
            var refill = new Refill();
            var String = document.getElementById('refilltext').value;
                                            
            refill.set("RefillID", String);
            refill.set("RefillID", String);
            refill.set("RefillID", String);
            refill.set("RefillID", String);
            refill.set("RefillID", String);
            refill.save(null, {
                success: function (refill) {
                    alert("Thank you! Your request has been sent!");
                },
                error: function (refill, error) {
                   // alert("Failed to create!");
                }
            });
}
