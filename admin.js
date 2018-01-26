var cartList = [];
var ourUser = "admin";
var ourPassword = "admin";

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


function inloggad(){
    $(".main").html("<h1>Welcome Member</h1>");
    $(".memberlogin").show();
    $(".headerlogin").hide();
}

// Visa startsidan
function visaKundlista(){
    $(".main").empty();
    console.log(kunder)
    
    html += "<div class='cartCardsDiv'>";

    for(var i = 0; i < kunder.length; i++) {

        var html = '<div id="kundlistaAdmin"><ul>';
        html += '<li>'+ kunder[i].id + '</li>';
        html += '<li> '+ kunder[i].email + ' </li>';
        html += '<li> '+ kunder[i].password + '</li>';
        html += '</ul></div>';
    }
    html += "</ul></div>"
    $(".main").append(html)


}

function visaStart(){
    // for(var i = 0; i < kunder.length; i++) {
    //     // $(".main").append(<p>kunder[i]);
    // }

}

function visaepostlista(){
    // for(var i = 0; i < kunder.length; i++) {
    //     // $(".main").append(<p>kunder[i]);
    // }

}

// ------- VARUKORGEN --------------- //

//Huvudmeny början
function addMainList() {
    $(".restenMeny").append("<button class='menybutton' onclick='visaStart()'>Start</button>");
    $(".restenMeny").append("<button class='menybutton' onclick='visaKundlista()'>Kundlista</button>");
    $(".restenMeny").append("<button class='menybutton' onclick='visaKontakt()'>Orderlista</button>");
    $(".restenMeny").append("<button class='menybutton' onclick='visaepostlista()'>Epostlista</button>");
      
}



function visaSubMenu(huvudID) {
    $(".undermeny, .mobilProductsSubmenu").empty();
    for(var i = 0; i < underkategorier.length; i++) {
        if (underkategorier[i].huvudkategori == huvudID){
            $(".undermeny, .mobilProductsSubmenu").append("<button class='undermenybutton' onclick='visaProdukter("+underkategorier[i].id+")'>"+underkategorier[i].kategoriNamn+"</button>");
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
    
    $.getJSON('json/kunder.json', function(data){
        kunder = data;
    });    
}