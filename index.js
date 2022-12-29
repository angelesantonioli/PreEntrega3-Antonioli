

const intro = document.querySelector("#intro")
const iconMusic = document.querySelector("#musicIcon")
const satiIcon = document.querySelector("#satiIcon")
const cero = document.querySelector("#cero")
const welcome = document.querySelector("#welcome")
const nament = document.querySelector("#nament")
const correct = document.querySelector("#validado")
const setName = document.querySelector("#login")
const nameInput = document.querySelector("#name")
const button = document.querySelector("#boton")
const buttonStart = document.querySelector("#botonEmpezar")

function validateUserName(userName) {
    userName = userName.trim()
    if (userName && userName.length <= 12 ) {
        return true
    } 
    return false
}

iconMusic.onclick = () => {
    if (intro.paused) {
    intro.play()
    iconMusic.src = "img/pause.png"
    } else {
        intro.pause()
        iconMusic.src = "img/play.png"
    }
}

cero.onmouseover = () => {
    satiIcon.src = "img/monster card1C.jpg"
}

cero.onmouseout = () => {
    satiIcon.src = "img/monster card1.jpg"
}

const loadLs = ( clave, valor ) => {
    localStorage.setItem(clave, JSON.stringify(valor))
}

buttonStart.onclick = (event) => {
    welcome.style.display = "none"
}

setName.onsubmit = (event) => {
    event.preventDefault()
    let nombreUsuario = nameInput.value
    if (validateUserName(nombreUsuario)) {
        correct.style.display = "block"
        loadLs("name", nombreUsuario)
    } else {
        nament.style.display = "block"
    }
}