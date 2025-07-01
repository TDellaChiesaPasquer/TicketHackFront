function getCookie(cname) { //Fonction pour récuperer la valeur d'un cookie, faire getCookie('token')
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
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

function addCookie(cname, value, time = 60*60*24*1000) { //Ajoute un cookie au nom de cname, de valeur value, avec une durée de vie time en ms (par defaut 24h)
    document.cookie = `${cname}=${value}; expires=${new Date(new Date().valueOf() + time).toUTCString()}; path=/;`
}

// Lors du login, tu récupères un token dans data.token, tu le sauvegarde en faisant 
// addCookie('token', data.token)
