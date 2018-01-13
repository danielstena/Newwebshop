var produkter;
var underkategorier;
var huvudkategorier;
var cartList = [];
var ourUser = "test";
var ourPassword = "test";

$(document).ready(function(){
   loadData();
   if(localStorage.cartList) cartList = JSON.parse(localStorage.cartList);

    if(sessionStorage.ourUser) {
        inloggad();
        $(".memberlogin").hide();
        $(".headerlogin").show();
    
    } else {
        visaStart();
        // Klicka på logga in
        $(".login").submit(function(e){
            e.preventDefault();

            if (ourUser == $(".usrnm").val() && ourPassword == $(".pswrd").val()) {
                // Dölj inlogg Visa welcome + user
                sessionStorage.ourUser = $(".userEmail").val();
                //location.reload();
                inloggad();

            } else alert('Fel användarnamn eller lösenord');
        });
    }
    $(".logout").click(function(){
        sessionStorage.clear();
        location.reload();
    });

    $(document).on('click', '.clearlist', function(){
        delete localStorage.cartList;
        location.reload();
    });
});

//Slut på document ready!!

function visaInfo() {
    $(".main").empty();
    $(".undermeny").empty();

}

function visaKontakt() {
    $(".main").empty();
    $(".undermeny").empty();

}

addToBasket = function(val) {
    $(".headerproductscountdiv").html("")
    console.log(cartList.length+1)
    $(".headerproductscountdiv").append(cartList.length)


    //Vilket nummer har vi klickat på
    cartList.push(val);

    //spara vår nya array i sessionstorage
    localStorage.cartList = JSON.stringify(cartList);
}

function inloggad(){
    $(".main").html("<h1>Welcome Member</h1>");
    $(".memberlogin").show();
    $(".headerlogin").hide();
}

// Visa startsidan
function visaStart(){
    $(".undermeny").empty();
    $(".main").html('<h1>Welcome to Sports Nutrition</h1>');
    $(".memberlogin").hide();
}
//VARUKORGEN
function visaCart() {
    $(".undermeny").empty();
    
    var html = '<h1 class="carth1">Kundvagn</h1>';
    html += "<div class='summeringsdiv'>";
    html += "<p>Här ska summeringen stå</p>";
    html += "</div'>";
    html += "<div class='cartDiv'>";
    html += '<button class="clearlist">Töm kundvagn</button>';
    html += "<div class='cartCardsDiv'>";
    
    for(var i = 0; i < cartList.length; i++) {
        for(var k = 0; k < produkter.length; k++){
            if(cartList[i] == produkter[k].id) {
                html += "<div class='cartCardDiv'>";
                
                html += "<div class='CardprodNameDiv'>";
                html += "<p class='cartCardProdname'>"+produkter[k].prodName+"</p>";
                html += "</div>";

                html += "<div class='cardImageDiv'>";
                html += "<img src="+produkter[k].prodBild+" class='cartProdbild'/>";
                html += "</div>";

                html += "<div class='cardprisDiv'>";
                html += "<h2 class='cartCardpris'>"+produkter[k].prodPrice+" kr</h2>";
                html += "</div>";
                
                html += "<div class='cartCardinfo'>";
                html += "<p class='cardinfo'>"+produkter[k].prodDesc+"</p>";
                html += "</div>";


                html += "</div>";
            }
        }    
    }
    html += '</div>';
    html += '</div>';
     $(".main").html(html);
}

//Huvudmeny början
function addMainList() {
    $(".meny").append("<button class='menybutton' onclick='visaStart()'>Start</button>");
    $(".meny").append("<button class='menybutton' onclick='visaInfo()'>Info</button>");

    for(var i = 0; i < huvudkategorier.length; i++) {
        $(".meny").append("<button class='menybutton' onclick='visaSubMenu("+huvudkategorier[i].id+")'>"+huvudkategorier[i].kategoriname+"</button>");
    }

    $(".meny").append("<button class='menybutton' onclick='visaKontakt()'>Kontakt</button>");
    $(".meny").append("<button class='menybutton' onclick='visaCart()'>Kundvagn</button>");
}

function visaProdukter(underID){
    $(".main").empty();
    var html = '';
    for(var i = 0; i < produkter.length; i++) {
        if(produkter[i].underKat == underID) {
            html += "<div class='cardDiv'>";
                
            html += "<div class='CardprodNameDiv'>";
            html += "<p class='cardProdname'>"+produkter[i].prodName+"</p>";
            html += "</div>";

            html += "<div class='cardImageDiv'>";
            html += "<img src="+produkter[i].prodBild+" class='prodbild'/>";
            html += "</div>";

            html += "<div class='cardprisDiv'>";
            html += "<h2 class='cardpris'>"+produkter[i].prodPrice+" kr</h2>";
            html += "</div>";

            html += "<div class='buyDiv'>";
            html += "<button class='buy' onclick='addToBasket("+produkter[i].id+")'>Lägg i kundvagn</button>";
            html += "</div>";
            
            html += "<div>";
            html += "<p class='cardinfo'>"+produkter[i].prodDesc+"</p>";
            html += "</div>";


            html += "</div>";
        }
    }
    
    $(".main").append(html);
 }

function visaSubMenu(huvudID) {
    $(".undermeny").empty();
    for(var i = 0; i < underkategorier.length; i++) {
        if (underkategorier[i].huvudkategori == huvudID){
            $(".undermeny").append("<button class='undermenybutton' onclick='visaProdukter("+underkategorier[i].id+")'>"+underkategorier[i].kategoriNamn+"</button>");
        }
    }
}

//Mina fetcher
function loadData(){
    $.getJSON('json/huvudkategorier.json', function(data){
        huvudkategorier = data;
        $.getJSON('json/underkategorier.json', function(data){
            underkategorier = data;
            addMainList();
        });
    });
    
    $.getJSON('json/produkter.json', function(data){
        produkter = data;
    });    
}