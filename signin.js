document.querySelector('#btn-signin').addEventListener('click', function (event) {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    fetch('http://localhost:3000/users/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(data => {
        if (!data.result) {
            console.log(data.error);
            document.querySelector('#error').innerHTML = data.error;
            return;
        }
        addCookie('token', data.token);
        window.location.href = './index.html';
    })
    .catch(error => {
        console.log(error);
        document.querySelector('#error').innerHTML = data.error;
    })
})

function addCookie(cname, value, time = 60 * 60 * 24 * 1000) { //Ajoute un cookie au nom de cname, de valeur value, avec une durée de vie time en ms (par defaut 24h)
  document.cookie = `${cname}=${value}; expires=${new Date(new Date().valueOf() + time).toUTCString()}; path=/;`
}