

    

function addProduct(produkt){


    var i = 0;
    var card = $("<div class='card'></div>");
    
    card.append("<img src="+produkt.prodBild+" class='prodbild'/>")
    card.append("<p class='cardinfo'>"+produkt.prodDesc+"</p>")
    card.append("<h2 class='cardpris'>"+produkt.prodPrice+" kr</h2>")
    card.append("<button class='buy' onclick='addToBasket("+produkt.id+")'>Add to basket</button>")
    
    $(".main").append(card);

    addToBasket = function(val) {
        
        console.log(val)
    }


}

