var huvudprodukter
var underkategorier

$(document).ready(function(){
   loadData();

   var memberInformation = [];

   if(localStorage.memberInformation == null){
        var json_str = JSON.stringify(memberInformation);
        sessionStorage.memberInformation = json_str;
        console.log("Nu är local storage tom")
    }

   submitMember = function(val){
    console.log(val);
   }

    // Login
    function start(){
        $(".memberlogin").hide();
        $(".member").hide();
        $(".kontakt").hide();
        $(".cart").hide();
        $(".info").hide();
        $(".becomeMember").hide();
        console.log("start")
    }
    function inloggad(){
        $(".main").hide();
        $(".member").show();
        $(".memberlogin").show();
        $(".headerlogin").hide();
        console.log("inloggad")
    }
    

    var ourUser = "test";
    var ourPassword = "test";

    if (sessionStorage.ourUser != null){
        inloggad();
    }   
        else {
            start();
            // Klicka på logga in
            $(".login").submit(function(e){
                e.preventDefault();

                if (ourUser == $(".usrnm").val() && ourPassword == $(".pswrd").val()) {
                    // Dölj inlogg Visa welcome + user
                    sessionStorage.ourUser = $(".userEmail").val();
                    inloggad();
                }   else {
                        fellosen();
                    }
            });
        }
    $(".logout").click(function(){
        sessionStorage.clear();
        location.reload();
    });


    });


    $(".footer1").append("<div class='footer1left'>Supernutrition INC <br> All rights reserved</div>")
    $(".footer1").append("<div class='footer1middle'>Supernutrition INC <br> All rights reserved</div>")
    $(".footer1").append("<div class='footer1right'>Supernutrition INC <br> All rights reserved</div>")
    $(".footer2").append("<div><img src='bilder/footer-logos-se.png' class='betalning'></div>")
    
//Mina fetcher
    function loadData(){ 

    $.getJSON('json/huvudkategorier.json', function(data){
        huvudkategorier = data;
        addMainList(huvudkategorier);
    });
    
    $.getJSON('json/underkategorier.json', function(data){
        underkategorier = data;
    });
    
    $.getJSON('json/produkter.json', function(data){
        produkter = data;
        
    });    
}