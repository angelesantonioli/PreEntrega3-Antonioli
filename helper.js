const intro = document.querySelector("#intro")
const iconMusic = document.querySelector("#musicIcon")

const getLs = (clave) => {
    return JSON.parse(localStorage.getItem(clave))
}

const loadLs = ( clave, valor ) => {
    localStorage.setItem(clave, JSON.stringify(valor))
}

const cleanLs = (clave) => {
    localStorage.removeItem(clave)
}


iconMusic.onclick = () => {
    if (intro.paused) {
        intro.play()
        iconMusic.src = "/img/pause.png"
    } else {
        intro.pause()
        iconMusic.src = "/img/play.png"
    }
}