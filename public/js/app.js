const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const $locateMe = document.querySelector('#locate-me')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error)
            return messageOne.textContent = data.error
        
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast;
    })
})
})

$locateMe.addEventListener('click', (e) => {
    e.preventDefault
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);

        fetch(`locate?lat=${position.coords.latitude}&lon=${position.coords.longitude}`).then((response) => {
            response.json().then((data) => {
                    if(data.error)
                        return messageOne.textContent = data.error
                    
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.forecast;
            })
        })
    })
})