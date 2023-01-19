let sessionData = getLs("session")

let monstruo1 = {
    monstruo1Vida: 150,
    monstruo1Danio: 1,
}

let traveler = {
    heroeVidaa: 6,
    heroeDanio1: 50,
    heroeDanio2: 70,
}

const apiUrl = "https://63c6de614ebaa802854f84bd.mockapi.io/riddles"
let acertijos = []
let vidaRestanteMonstruo1 = monstruo1.monstruo1Vida
let vidaRestanteHeroe1 = traveler.heroeVidaa
let currentDialogue = 0
let currentQuestion = 0
let currentRight = 0
let currentWrong = 0
let currentScore = 5
const iconMusic = document.querySelector("#musicIcon")
const dialogueClicker = document.querySelector("#dialogue-clicker")
const containerClicker = document.querySelector("#container-clicker")
const submitAnswer = document.querySelector("#riddle")
const answerTexbox = document.querySelector("#answers")
const questionText = document.querySelector("#question")
const statusText = document.querySelector("#status")
const submitClicker = document.querySelector("#submit-clicker")
const errorMessage = document.querySelector("#error-message")
const chapterOne = document.querySelector("#chapter-one")
const sati = document.querySelector("#uno-chapterD")

let dialogosSelectors = ["#uno-chapterA", "#uno-chapterB", "#uno-chapterC", "#uno-chapterD", "#uno-chapterE", "#uno-chapterF"].map(x => document.querySelector(x))


const statusSati = (nameM) => {
    if (vidaRestanteHeroe1 === 0) {
        statusText.innerText = `El viajero ha caído derrotado. ¡${nameM} se ha devorado al viajero!`
        questionText.style.display = "none"
        answerTexbox.style.display = "none"
        submitClicker.style.display = "none"
        return "/img/monstruo end.png"
    } if (vidaRestanteMonstruo1 === 0) {
        sessionData.isSatiDefeated = true
        loadLs("session",sessionData)
        statusText.innerText = `${nameM} ha caído derrotado. ¡El viajero es el ganador!`
        questionText.style.display = "none"
        answerTexbox.style.display = "none"
        submitClicker.style.display = "none"
        return "/img/monstruo1saved.png"
    } 
    let porcentajeVidaMonstruo = vidaRestanteMonstruo1 / monstruo1.monstruo1Vida 
    let porcentajeVidaHeroe = vidaRestanteHeroe1 / traveler.heroeVidaa
    let difVidas = porcentajeVidaHeroe / porcentajeVidaMonstruo
    if (difVidas == 1) {
        return "/img/monstruo 1 png.png"
    } 
    if (difVidas > 2) {
        return "/img/monstruo 3r.png"
    } 
    if (difVidas > 1.5) {
        return "/img/monstruo 2r.png"
    } 
    if (difVidas > 1) {
        return "/img/monstruo 1r.png"
    } 
    if (difVidas < 0.5) {
        return "/img/monstruo 2w.png"
    } 
    if (difVidas < 1) {
        return "/img/monstruo 1w.png"
    } 
}

const loadRiddles = async () => {
    let response = await fetch(apiUrl)
    if (!response.ok) {
        chapterOne.style.display = "none"
        errorMessage.style.display = "flex"
        console.log("There was an error")
    }
    acertijos = await response.json()
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

const blinkIn = (target) => {
    target.src = "/img/dialogue close.png"
}

const blinkOut = (target) => {
    target.src = "/img/dialogue open.png"
}

dialogueClicker.onclick = (event) => {
    if (currentDialogue !== 0) {
        dialogosSelectors[currentDialogue - 1].style.display = "none"
    }
    dialogosSelectors[currentDialogue].style.display = "flex"
    if (currentDialogue === dialogosSelectors.length - 1) {
        dialogosSelectors[currentDialogue].style.display = "none"
        dialogosSelectors[3].style.display = "flex"
        dialogueClicker.style.display = "none"
        submitAnswer.style.display = "flex"
        questionText.innerText = acertijos[currentQuestion].pregunta
    }
    currentDialogue++
    if (currentDialogue === 6) {
        swal({
            title: "¡Breve explicación!",
            text: "En este juego debes responder bien los acertijos. Si lo haces salvas a Sati y al mundo. Sino, ¡Ella te comerá!",
            icon: "/img/dialogue open2.png",
            buttons: "¡Entendido!"
        })
    }
}

const answer = (event) => {
    let name = sessionData.userName
    let nameM = "Sati"
    if (answerTexbox.value === acertijos[currentQuestion].rta) {
        statusText.innerText = `¡Correcto!
        ${name} ha atacado a ${nameM}. Vida actual de ${nameM}: ${vidaRestanteMonstruo1 - traveler.heroeDanio1}`
        vidaRestanteMonstruo1 = vidaRestanteMonstruo1 - traveler.heroeDanio1
        currentRight++
    } else {
        statusText.innerText = `¡Incorrecto!
        ${nameM} ha atacado al viajero. Vida actual de ${name}: ${vidaRestanteHeroe1 - monstruo1.monstruo1Danio}`
        vidaRestanteHeroe1 = vidaRestanteHeroe1 - monstruo1.monstruo1Danio
        currentWrong++
    }
    currentQuestion++
    questionText.innerText = acertijos[currentQuestion].pregunta
    answerTexbox.value = ""
    sati.src = statusSati(nameM)

}


