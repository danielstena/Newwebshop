/*
//inloggning
var ourUser = "test";
var ourPassword = "test";
if (sessionStorage.ourUser != null){
inloggad();
} else {
    start();
    // Klicka på logga in
    $(".login").submit(function(e){
        e.preventDefault();
    
        if (ourUser == $(".usrnm").val() && ourPassword == $(".pswrd").val()) {
                // Dölj inlogg Visa welcome + user
                sessionStorage.ourUser = $(".userEmail").val();
                inloggad();
        } else {
                fellosen();
                }
    });
    }
$(".logout").click(function(){
    sessionStorage.clear();
    location.reload();
});

*/