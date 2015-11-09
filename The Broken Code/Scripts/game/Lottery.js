window.name = 0;
//Cheap and lazy method for lottery
function LotteryPlay() {
    var x = 3;
    var currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + x);
    console.log(currentDate);
    if (window.name >= 2) 
    {
        alert("You have already played 2 games! I'm sorry, you are not a winner.");
    }
    else {
        var randomNum = Math.floor(Math.random() * 5) + 1; //This pick between 1 to 5, we will just statically set 3 as the number we want_
        if (randomNum == 3) {
            //alert("You win a coupon!");
            //Here we need to create a Coupon Object
            var Coupon = Parse.Object.extend("Coupon");
            var coupon = new Coupon();
            coupon.set("Amount", 10);
            coupon.set("ExpiryDate", currentDate);
            coupon.save(null, {
                success: function (coupon) {
                    alert("You WON A FREE $10 Dollar COUPON! Use this coupon next time you come! Coupon code is: " + coupon.id);
                },
                error: function (coupon, error) {
                    //alert("Failed to create!");
                }
            });
        }
        else {
            alert("You did NOT win a free Coupon!");
        }
    }
    window.name++;
    console.log(window.name);
}