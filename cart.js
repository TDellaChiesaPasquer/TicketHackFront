let listPanier = []

function getCookie(cname) { //Fonction pour récuperer la valeur d'un cookie, faire getCookie('token')
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function updatePrice() {
    let total = 0
    for (let i = 0; i < listPanier.length; i++) {
        total += listPanier[i].price
    }
    return total;
}


url = "http://localhost:3000/trips/cart"
fetch(url, {
    method: 'GET',
    headers: {
        authorization: getCookie('token'),
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {

        listPanier = data.panierList.panierList

        if (listPanier.length === 0) {
            document.querySelector('#container').innerHTML = `
            <div id="empty">
                <p>No tickets in your cart.</p>
                <p>Why not plan a trip?</p>
            </div>
            `
        } else {
            document.querySelector('#container').innerHTML = `
        <div id="not-empty">
        <div id="cart">
            <div id="cart-title">My cart</div>
            <div id="cart-list" class="trip-list">
            </div>
        </div>
        <div id="bottom-cart">
            <div id="total-div">
                Total: <span id="total">${updatePrice()}</span>€
            </div>
            <button id="purchase">
                Purchase
            </button>
        </div>
        </div>
        `
            for (let i = 0; i < listPanier.length; i++) {
                const dateDepart = new Date(listPanier[i].date);
                const heures = dateDepart.getHours()
                let minutes = dateDepart.getMinutes()

                if (minutes < 10) {
                    minutes = "0" + minutes
                } else {
                    minutes
                }

                document.querySelector('#cart-list').innerHTML += `
                    <div class="trip-container">
                        <div> ${listPanier[i].departure} > ${listPanier[i].arrival} </div>
                        <div> ${heures}:${minutes} </div>
                        <div> ${listPanier[i].price}€ </div>
                        <button class="delete" id="${listPanier[i]._id}">X</button>
                    </div>
					`;
                updateDeleteTravelEventListener()
            }
        }
    })

function updateDeleteTravelEventListener() {
    for (let i = 0; i < document.querySelectorAll('.delete').length; i++) {
        document.querySelectorAll('.delete')[i].addEventListener('click', function () {
            url = 'http://localhost:3000/trips/cart'
            fetch(url, {
                method: 'DELETE',
                headers: {
                    authorization: getCookie('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tripId: this.getAttribute('id') })

            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.parentNode.remove()
                    listPanier = listPanier.filter((e) => e._id != this.getAttribute('id'))

                    if (listPanier.length === 0) {
                        document.querySelector('#container').innerHTML = `
                        <div id="empty">
                            <p>No tickets in your cart.</p>
                            <p>Why not plan a trip?</p>
                        </div>
                        `
                    } else {
                        const price = updatePrice()
                        document.querySelector('#total').innerHTML = price
                    }
                });
        });
    }
}