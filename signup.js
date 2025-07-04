document.querySelector('#btn-signup').addEventListener('click', function (event) {
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;
    if (password !== confirmPassword) {
        document.querySelector('#error').innerHTML = 'The passwords are not the same.';
        return;
    }
    console.log(firstName, lastName)
    fetch('https://ticket-hack-back.vercel.app/users/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({firstName, lastName, email, password})
    })
    .then(response => response.json())
    .then(data => {
        if (!data.result) {
            console.log(data.error)
            document.querySelector('#error').innerHTML = data.error;
            return;
        }
        window.location.href = './index.html';
    })
    .catch(error => {
        console.log(error);
        document.querySelector('#error').innerHTML = data.error;
    });
})