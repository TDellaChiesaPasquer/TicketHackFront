fetch('https://ticket-hack-back.vercel.app/users/info', {
        headers: {authorization: getCookie('token')}
    })
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            document.querySelector('#firstName').innerHTML = firstLetter(data.user.firstName) + ' ';
            document.querySelector('#lastName').innerHTML = firstLetter(data.user.lastName);
            document.querySelector('#email').innerHTML = data.user.email;
            return;
        }
    })

function firstLetter(name) {
    return name.at(0).toUpperCase() + name.slice(1);
}

fetch('https://ticket-hack-back.vercel.app/trips/book', {
    headers: {authorization: getCookie('token')}
})
.then(response => response.json())
.then(data => {
    if (!data.result) {
        console.log(error);
        return;
    }
    console.log(data)
    for (const element of data.bookingList.bookingList) {
        const elementDate = new Date(element.date);
        if (elementDate> new Date()) {
            continue;
        }
        let day = elementDate.getDate();
        let month = elementDate.getMonth() + 1;
        const year = elementDate.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        document.querySelector('#past-trips-list').innerHTML += `
        <div class="trip-container"><div>${element.departure} > ${element.arrival}</div><div>${day}/${month}/${year}</div></div>`
    }
})