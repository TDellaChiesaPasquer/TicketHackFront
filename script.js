document.querySelector('#search-info').addEventListener('click', () => {
  const cityDeparture = document.querySelector('#btn-departure').value
  const cityArrival = document.querySelector('#btn-arrival').value
  const SearchDate = document.querySelector('#btn-date').value
  if (!cityArrival || !cityDeparture || !SearchDate) {
    document.querySelector('#error').innerHTML = 'Please select a date, a departure and an arrival.';
    return;
  }
  const url = `https://ticket-hack-back.vercel.app/trips/${cityDeparture}/${cityArrival}/${SearchDate}`
  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.result === true && data.trips.length > 0) {
        document.querySelector('.resultat').innerHTML = '<div id="search-result"></div>'
        for (let i = 0; i < data.trips.length; i++) {
          const dateDepart = new Date(data.trips[i].date);
          console.log(data.trips[i].date)
          if (dateDepart <= date) {
            continue;
          }
          const heures = dateDepart.getHours()
          let minutes = dateDepart.getMinutes()

          if (minutes < 10) {
            minutes = "0" + minutes
          } else {
            minutes
          }
          let button;
          if (!window.connected || (!window.cartList.some(e => e === data.trips[i]._id) && !window.bookList.some(e => e === data.trips[i]._id))) {
            button = `<input type="button" value="Book" class="btn-book" id="${data.trips[i]._id}"></input>`;
          } else {
            button = `<div  class="btn-book-block" id="${data.trips[i]._id}"><i class="fa-solid fa-check"></i></div>`;
          }
          console.log(window.cartList);

          document.querySelector('#search-result').innerHTML += `
            <div class="voyage">
              <div>${data.trips[i].departure} > ${data.trips[i].arrival} </div>
              <div>${heures}h${minutes}</div>
              <div class="euro">${data.trips[i].price}€</div>
              ${button}
            </div>
					`;
        }
        updateBookEventListener();
      } else if (data.result === true && data.trips.length == 0) {
        document.querySelector('.resultat').innerHTML = `
        <div id='no-result'>
        <img src="./images/notfound.png" alt="Logo not found">
                <hr>
                <p id="phrase">No trip found.</p> </div>
        `
      }
    })
})

function updateBookEventListener() {
    for (let i = 0; i < document.querySelectorAll('.btn-book').length; i++) {
        document.querySelectorAll('.btn-book')[i].addEventListener('click', async function (event) {
            try {
                if (window.connected) {
                    const response = await fetch('https://ticket-hack-back.vercel.app/trips/cart', {
                        method: 'PUT',
                        headers: {
                            authorization: getCookie('token'),
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ tripId: this.getAttribute('id') })
                    })
                    const data = await response.json();
                    if (!data.result) {
                        console.log(data.error);
                        document.querySelector('#error').innerHTML = data.error;
                        return;
                    }
                    window.location.href = './cart.html';
                    return;
                }
                window.location.href = './signin.html';
            } catch (error) {
                console.error("Erreur :", error)
                document.querySelector('#error').innerHTML = error;
            }
        })
    }
}

const date = new Date();

let month = date.getMonth() + 1;
let day = date.getDate();
const year = date.getFullYear();
if(month < 10)
    month = '0' + month.toString();
if(day < 10)
    day = '0' + day.toString();

const dateInput = year + '-' + month + '-' + day;
document.querySelector('#btn-date').setAttribute('min', dateInput);

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

// exemple de fetch avec token :
// fetch(url, {
//     headers:{
//         authorization: getCookie('token')
//     }
// })

function removeCookie(cname) { //Supprime le cookie cname, ainsi removeCookie('token') deconnecte l'utilisateur
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

function addCookie(cname, value, time = 60 * 60 * 24 * 1000) { //Ajoute un cookie au nom de cname, de valeur value, avec une durée de vie time en ms (par defaut 24h)
  document.cookie = `${cname}=${value}; expires=${new Date(new Date().valueOf() + time).toUTCString()}; path=/;`
}

// Lors du login, tu récupères un token dans data.token, tu le sauvegarde en faisant 
// addCookie('token', data.token)
