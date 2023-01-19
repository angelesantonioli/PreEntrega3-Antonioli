let sessionData = getLs("session")

const intro = document.querySelector("#intro")
const iconMusic = document.querySelector("#musicIcon")
const satiIcon = document.querySelector("#satiIcon")
const cero = document.querySelector("#cero")
const uno = document.querySelector("#uno")
const welcome = document.querySelector("#welcome")
const nament = document.querySelector("#nament")
const correct = document.querySelector("#validado")
const setName = document.querySelector("#login")
const nameInput = document.querySelector("#name")
const button = document.querySelector("#boton")
const buttonStart = document.querySelector("#botonEmpezar")
const buttonNewUser = document.querySelector("#boton-new-user")
swal ({
    title: "¡Bienvenido/a a IntrAAbyssuS, viajero/a!",
    text: "Esta es una aventura de acertijos y preguntas. Así que ¡Hora de pelear!",
    icon: "/img/dialogue open2.png",
    buttons: "¡Empecemos!"
})

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

buttonStart.onclick = (event) => {
    welcome.style.display = "none"
}

buttonNewUser.onclick = (event) => {
    welcome.style.display = "flex"
}

setName.onsubmit = async (event) => {
    event.preventDefault()
    let nombreUsuario = nameInput.value
    if (validateUserName(nombreUsuario)) {
        correct.style.display = "block"
        if (!sessionData){
            loadLs("session", {userName: nombreUsuario, isSatiDefeated: false})
            return
        }
        if (nombreUsuario !== sessionData.userName){
            let isConfirm = swal ({
                title: "¡Ingresaste un nuevo usuario!",
                text: "¿Deseas borrar la sesión anterior y crear un nuevo usuario?",
                icon: "/img/dialogue open2.png",
                buttons: ["No", "Sí"],
            })
            if ( await isConfirm) {
                loadLs("session", {userName: nombreUsuario, isSatiDefeated: false})
                location.reload()
            }
        }
    } else {
        nament.style.display = "block"
    }
}

if (sessionData?.isSatiDefeated) {
    uno.style.display = "flex"
    welcome.style.display ="none"
    buttonNewUser.style.display = "flex"
}