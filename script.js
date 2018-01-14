var produkter;
var underkategorier;
var huvudkategorier;
var cartList = [];
var ourUser = "test";
var ourPassword = "test";
totalProductsInCart = 0
totalPrice = 0

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

function visaOmOss() {
    $(".main").empty();
    $(".undermeny").empty();
    var html = '<br><h1>Oss finner du här</h1><br>';
    html += "<div class='kartDiv' width:500px; >";
    html += '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2131.0483140255587!2d12.05361045095419!3d57.715637046285416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464ff404c2147afb%3A0xc07741ba0375c5a3!2zU23DtnJzbG90dHNnYXRhbiwgR8O2dGVib3Jn!5e0!3m2!1ssv!2sse!4v1515890675822" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>';
    html += 'Smörslottsgatan 6<br/>416 77 Göteborg'
    html += "</div>";
    $(".main").html(html)
}

function visaKontakt() {
    $(".main").empty();
    $(".undermeny").empty();

}
addToBasket = function(val) {

    //Vilket nummer har vi klickat på
    cartList.push(val);

    //spara vår nya array i localstorage
    localStorage.cartList = JSON.stringify(cartList);
    $(".headerproductscountdiv").html("")
    $(".headerproductscountdiv").append("<a href='#' id='summeringsLink' onclick='visaCart()'>Produkter i varukorgen: "+cartList.length+"</a>")
    
}

function inloggad(){
    $(".main").html("<h1>Welcome Member</h1>");
    $(".memberlogin").show();
    $(".headerlogin").hide();
}

// Visa startsidan
function visaStart(){
    $(".undermeny").empty();
    $(".main").html('<h1>Welcome to</h1>');
    $(".main").append('<img id="mainlogga" src="bilder/sportsnutrition.png"/>')
    $(".memberlogin").hide();
}

// ------- VARUKORGEN ---------------


function visaCart() {

     ///TEST MED JANNES KOD START

    $(".cartSummeringAntalOchPris").html("");

    for (i = 0; i < cartList.length; i++) {
        totalProductsInCart++;
    }
         

    //TEST MED JANNES KOD SLUT  

    
    var html = "<div class='cartDiv'>";
    html += '<h1 class="carth1">Kundvagn</h1>';
    html += "<div class='cartSummeringAntalOchPris'></div>";
    html += '<div><button class="clearlist">Slutför beställningen</button></div>';
    html += "<div><hr/></div>";
    html += "<div class='cartCardsDiv'>";
    
    $(".undermeny").empty();
    
    for(var i = 0; i < cartList.length; i++) {
        for(var k = 0; k < produkter.length; k++){
            if(cartList[i] == produkter[k].id) {
                html += "<div class='cartCardDiv'>";
                
                html += "<div class='cartCardProdNameDiv'>";
                html += "<p class='cartCardProdname'>"+produkter[k].prodName+"</p>";
                html += "</div>";

                html += "<div class='cartCardImageDiv'>";
                html += "<img src="+produkter[k].prodBild+" class='cartProdbild'/>";
                html += "</div>";

                html += "<div class='cartCardPrisDiv'>";
                html += "<h2 class='cartCardpris'>"+produkter[k].prodPrice+" kr</h2>";
                html += "</div>";

                html += "</div>";
                totalPrice += produkter[k].prodPrice
            }
        }    
    }
    html += '</div>';
    html += '</div>';
     $(".main").html(html);
     $(".cartSummeringAntalOchPris").append("<p>Antal produkter i varukorgen: " + totalProductsInCart + "</p>");
     $(".cartSummeringAntalOchPris").append("<p>Totalt pris på varukorgen: " + totalPrice + " kr</p>");
     
}

//Huvudmeny början
function addMainList() {
    $(".meny").append("<button class='menybutton' onclick='visaStart()'>Start</button>");

    for(var i = 0; i < huvudkategorier.length; i++) {
        $(".meny").append("<button class='menybutton' onclick='visaSubMenu("+huvudkategorier[i].id+")'>"+huvudkategorier[i].kategoriname+"</button>");
    }

    $(".meny").append("<button class='menybutton' onclick='visaOmOss()'>Om oss</button>");
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