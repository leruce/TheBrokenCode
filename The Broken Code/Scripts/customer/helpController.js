function HelpF() 
{
            var Help = Parse.Object.extend("Help");
            var help = new Help();
            var String = document.getElementById('helptext').value;
            console.log("Hello;"+String);
            help.set("HelpRequest", String);
            help.save(null, {
                success: function (help) {
                    alert("Thank you! Your request has been sent!");
                },
                error: function (help, error) {
                  //  alert("Failed to create!");
                }
            });
}
  