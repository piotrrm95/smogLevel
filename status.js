window.onload = function () {
    fetch("https://api.openaq.org/v1/measurements")
        .then(resp => {
            if (resp.ok) {
                return resp.json()
            } else {
                return Promise.reject(resp)
            }
        })
        .then(resp => {
            resp.results.forEach(result => {
                $('body').html($('<div>', {
                    class: 'card weather-card'
                }));
                $('<div/>', {
                    class: 'card-body pb-3'
                }).appendTo('.weather-card');
                $('<h4/>', {
                    text: `${result.city}, ${result.country}`,
                    class: 'card-title font-weight-bold'
                }).appendTo('.card-body');
                $('<div>', {
                    class: 'd-flex justify-content-between'
                }).appendTo('.card-body');
                $('<p/>', {
                    text: `${result.value} ${result.unit}`,
                    class: 'display-4 degree'
                }).appendTo('.d-flex');
            })
        })
        .catch(error => {
            if (error.status == 404) {
                console.log("Chyba zabladziles? Nie ma takiej strony")
            }
        })
}