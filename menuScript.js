//Huvudmeny början
function addMainList(huvudkategorier) {
            

    $(".meny").append("<a href='index.html'><button class='menybutton'>Start</button></a>")
    addMenuInfo();
    
    for(var i = 0; i < huvudkategorier.length; i++) {
        addMenuItem(huvudkategorier[i])
    }
    addMenuKontact();
    addMenuCart();
}
//Info button under
function addMenuInfo() {
    var button = document.createElement('button');
    button.innerText = "Info"
    button.className = "menybutton"
    button.onclick = function() {
        $(".main").hide();
        $(".kontakt").show();
    }
    $(".meny").append(button)
}
//Kontaktbutton
function addMenuKontact() {
    var button = document.createElement('button');
    button.innerText = "Kontakt"
    button.className = "menybutton"
    button.onclick = function() {
        $(".main").hide();
        $(".kontakt").show();
        console.log("hej")

    }
    $(".meny").append(button)
}
//Kontaktbutton
function addMenuKontact() {
    $(".meny").append("<button class='menybutton' onclick='bliMedlemKnapp()'>Bli medlem</button>")
    
    
    /*
    var button = document.createElement('button');
    button.innerText = "Bli medlem"
    button.className = "menybutton"
    button.onclick = function() {
        $(".main").hide();
        $(".becomeMember").show();
        console.log("hej")
        */
}
bliMedlemKnapp = function(val) {
    $(".main").hide();
    $(".becomeMember").show();
}

function addMenuCart(huvudkategori) {
    var button = document.createElement('button');
    button.innerText = "Kundvagn"
    button.className = "menybutton"
    button.onclick = function() {
        $(".main").hide();
        $(".cart").show();
        

    }
    $(".meny").append(button)
}


function addMenuItem(huvudkategori) {
    var button = document.createElement('button');
    button.innerText = huvudkategori.kategoriname
    button.className = "menybutton"
    button.onclick = function() {
        $(".undermeny").empty();
        for(var i = 0; i < underkategorier.length; i++) {
            if (underkategorier[i].huvudkategori == huvudkategori.id){
                addSubmenuItem(underkategorier[i])
            }
        }

    }
    $(".meny").append(button)
}
//Produkt
function addSubmenuItem(underkategori){
    var button = document.createElement('button')
    button.innerText = underkategori.kategoriNamn
    button.className = "undermenybutton"
    button.onclick = function() {
        console.log("HEEEEJ!!!")
        $(".main").empty();
        for(var i = 0; i < produkter.length; i++) {
            if (produkter[i].underKat == underkategori.id && produkter[i].huvudKat == underkategori.huvudkategori) {
                addProduct(produkter[i]);
            }
        }
    }

    $(".undermeny").append(button)
}