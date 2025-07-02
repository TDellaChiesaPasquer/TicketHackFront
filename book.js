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

url = "https://ticket-hack-back.vercel.app/trips/book"
fetch(url, {
    method: 'GET',
    headers: {
        authorization: getCookie('token'),
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        const listBooking = data.bookingList.bookingList

        if (listBooking.length === 0) {
            document.querySelector('#container').innerHTML = `
            <div id="empty">
                <p>No booking yet.</p>
                <p>Why not plan a trip?</p>
            </div>
            `
        } else {
            document.querySelector('#container').innerHTML = `
            <div id="not-empty">
                <div id="top-book">
                    <div id="book-title">My bookings</div>
                    <div id='book-list' class="trip-list"></div>
                </div>
                <div id="bottom-book"><hr>
                    <p>Enjoy your travels with Tickethack!</p>
                </div>
            </div>`

            for (let i = 0; i < listBooking.length; i++) {
                const dateDepart = new Date(listBooking[i].date);
                const heures = dateDepart.getHours()
                let minutes = dateDepart.getMinutes()

                const dateNow = new Date();
                let delay = dateDepart - dateNow
                let minuteDelay = new Date(delay).getMinutes()
                let heureDelay = new Date(delay).getHours()
                let jourDelay = Math.floor(delay/(1000*60*60*24)) // millisecondes * secondes * heures * jour
                console.log('jour', jourDelay, 'heures', heureDelay, 'minutes', minuteDelay)

                if (minutes < 10) {
                    minutes = "0" + minutes
                }

                let temps;
                if (jourDelay < 0) {
                    continue;
                } else if (jourDelay > 0) {
                    temps = `Departure in ${jourDelay} days`
                } else if (jourDelay === 0 && heureDelay > 0) {
                    temps = `Departure in ${heureDelay} hours`
                } else if (jourDelay === 0 && heureDelay === 0 && minuteDelay > 0) {
                    temps = `Departure in ${minuteDelay} minutes`
                } else {
                    temps = `Departure now!`
                }

                document.querySelector('#book-list').innerHTML += `
                    <div class="trip-container">
                        <div> ${listBooking[i].departure} > ${listBooking[i].arrival} </div>
                        <div> ${heures}:${minutes} </div>
                        <div> ${listBooking[i].price}€ </div>
                        <div id="temps"> ${temps} </div>
                    </div>
                `
            }
        }
    })