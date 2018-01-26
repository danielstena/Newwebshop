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


//Detta händer när man kommer till sidan
function visaStart(){
    $(".undermeny").empty();
    $(".main").empty();
    $(".main").append('<div><h1>Hej där!</h1><h2>Logga in för att komma till adminsidan</h2><div>')
    $(".memberlogin").hide();
    $(".meny").hide();
}

function inloggad(){
    $(".main").html("<h1>Welcome to Admin</h1>");
    $(".memberlogin").show();
    $(".headerlogin").hide();
    $(".meny").show();
}


//ADMIN MENY 
function addMainList() {
    $(".meny").append("<button class='menybutton' onclick='inloggad()'>Start</button>");
    $(".meny").append("<button class='menybutton' onclick='visaKundlista()'>Kundlista</button>");
    $(".meny").append("<button class='menybutton' onclick='visaOrderlista()'>Orderlista</button>");
    $(".meny").append("<button class='menybutton' onclick='visaepostlista()'>Epostlista</button>");
      
}

// Visa Kundlista
function visaKundlista(){
    $(".main").empty();

    $(".main").append("<div id='kundlistaAdmin'><ul><li><h1>Kundlista</h1></li></ul></div>");

    for(var i = 0; i < kunder.length; i++) {
        $("#kundlistaAdmin").append("<ul><li>"+kunder[i].id+"</li><li>"+kunder[i].email+"</li><li>"+kunder[i].password+"</li></ul><br>");
    /*     var html = '<div id="kundlistaAdmin"><ul>';
        html += '<li>'+ kunder[i].id + '</li>';
        html += '<li> '+ kunder[i].email + ' </li>';
        html += '<li> '+ kunder[i].password + '</li>';
        html += '</ul></div>'; 
        console.log(i) */
    }
}

function visaOrderlista(){
    $(".main").empty();
    $(".main").append('<div><h1>Hej där! </h1><h2>Här finns ingen Orderlista än så länge</h2></div>')
}
function visaepostlista(){
    $(".main").empty();
    $(".main").append('<div><h1>Hej där! </h1><h2>Här finns ingen E-postlista än så länge</h2></div>')
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