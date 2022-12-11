const $apodForm = document.getElementById('apod-form')
const $apodGetButton = document.getElementById('apod-get-button')
const $apodDate = document.getElementById('apod-date')
const $apodImage = document.getElementById('apod-image')
const $favourites = document.getElementById('favourites')

let favArray = []

async function populate (e) {

    e.preventDefault()

    const selectedDate = $apodDate.value

    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=YBgprdrJDt8xdzOcXmNvJ8e1yV6LKEDtb17FR4kJ&date=${selectedDate}
    `)

    let data = await response.json()

    $apodImage.innerHTML = `
        <img src="${data.url}" id="apod-img">
        <div>
            <h3>${data.title}</h3>
            <p>${data.date}</p>
            <p>${data.explanation}</p>
            <button type="button" id="fav-button">Add to Favorites</button>
        </div>
        <div class="modal" id="modal">
            <img src="${data.hdurl}" alt="${data.title}" class="modal-img" id="modal-img">
        </div>
    `

    $apodForm.reset()

    const $modal = document.getElementById('modal')
    const $apodImg = document.getElementById('apod-img')
    const $favButton = document.getElementById('fav-button')

    $apodImg.addEventListener('click', function () {
        $modal.classList.add('show')
    })

    $modal.addEventListener('click', function () {
        $modal.classList.remove('show')
    })

    $favButton.addEventListener('click', function () {

        favArray.push({
            title: data.title,
            date: data.date,
            explanation: data.explanation,
            hdurl: data.hdurl,
            url: data.url
        })

        addToFavourites()

        localStorage.setItem('favArray', JSON.stringify(favArray))

    })

    localStorage.setItem('data', JSON.stringify(data))

}

$apodForm.addEventListener('submit', populate)

function addToFavourites () {

    const favHtml = []

    for (let i = 0; i < favArray.length; i++) {

        favHtml.push(`
            <li class="fav-item">
                <img src="${favArray[i].url}" id="apod-img">
                <div>
                    <h3>${favArray[i].title}</h3>
                    <p>${favArray[i].date}</p>
                    <button type="button" id="delete-button" data-id="${i}">Delete</button>
                </div>
            </li>
        `)

    }

    $favourites.innerHTML = favHtml.join('')

}

function deleteFavourite (e) {

    const deleteButton = e.target.closest('[data-id]')

    if (deleteButton) {

        const deleteNumber = deleteButton.dataset.id
        favArray.splice(deleteNumber, 1)

        addToFavourites()

        localStorage.setItem('favArray', JSON.stringify(favArray))

    }

}

$favourites.addEventListener('click', deleteFavourite)

const lsFavArray = localStorage.getItem('favArray')

if (lsFavArray) {

    favArray = JSON.parse(lsFavArray)

    addToFavourites()

}

const lsData = localStorage.getItem('data')

if (lsData) {

    data = JSON.parse(lsData)

    $apodImage.innerHTML = `
        <img src="${data.url}" id="apod-img">
        <div>
            <h3>${data.title}</h3>
            <p>${data.date}</p>
            <p>${data.explanation}</p>
            <button type="button" id="fav-button">Add to Favorites</button>
        </div>
        <div class="modal" id="modal">
            <img src="${data.hdurl}" alt="${data.title}" class="modal-img" id="modal-img">
        </div>
    `

    const $modal = document.getElementById('modal')
    const $apodImg = document.getElementById('apod-img')
    const $favButton = document.getElementById('fav-button')

    $apodImg.addEventListener('click', function () {
        $modal.classList.add('show')
    })

    $modal.addEventListener('click', function () {
        $modal.classList.remove('show')
    })

    $favButton.addEventListener('click', function () {

        favArray.push({
            title: data.title,
            date: data.date,
            explanation: data.explanation,
            hdurl: data.hdurl,
            url: data.url
        })

        addToFavourites()

        localStorage.setItem('favArray', JSON.stringify(favArray))

    })

}