window.connected = false;

if (getCookie('token')) {
    fetch('https://ticket-hack-back.vercel.app/users/info', {
        headers: {authorization: getCookie('token')}
    })
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            window.connected = true;
            document.querySelector('#not-connected').style.display = 'none';
            document.querySelector('#connected').style.display = 'flex';
            if (data.user.panierList.length > 0) {
                document.querySelector('#cart-count').setAttribute('notEmpty', 'true'); 
                document.querySelector('#cart-count').innerHTML = data.user.panierList.length;
            }
            window.cartList = data.user.panierList;
            window.bookList = data.user.bookingList;
            return;
        }
    })
}

document.querySelector('#disconnect-btn').addEventListener('click', function (event) {
    console.log('test')
    removeCookie('token');
    window.connected = false;
    window.location.reload();
})

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

function removeCookie(cname) { //Supprime le cookie cname, ainsi removeCookie('token') deconnecte l'utilisateur
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}