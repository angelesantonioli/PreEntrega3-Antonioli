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

let dialogosSelectors = ["#uno-chapterA", "#uno-chapterB", "#uno-chapterC", "#uno-chapterD", "#uno-chapterE", "#uno-chapterF"].map(x => document.querySelector(x))

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

const getLs = (clave) => {
    return JSON.parse(localStorage.getItem(clave))
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
}

const answer = (event) => {
    let name = getLs("name")
    let nameM = "Sati"
    if (answerTexbox.value === acertijos[currentQuestion].rta) {
        statusText.innerText = `¡Correcto!
        ${name} ha atacado a ${nameM}. Vida actual de ${nameM}: ${vidaRestanteMonstruo1 - traveler.heroeDanio1}`
        vidaRestanteMonstruo1 = vidaRestanteMonstruo1 - traveler.heroeDanio1
    } else {
        statusText.innerText = `¡Incorrecto!
        ${nameM} ha atacado al viajero. Vida actual de ${name}: ${vidaRestanteHeroe1 - monstruo1.monstruo1Danio}`
        vidaRestanteHeroe1 = vidaRestanteHeroe1 - monstruo1.monstruo1Danio
    }
    
    currentQuestion++
    questionText.innerText = acertijos[currentQuestion].pregunta
    answerTexbox.value = ""
    if (vidaRestanteHeroe1 == 0) {
        statusText.innerText = `El viajero ha caído derrotado. ¡${nameM} se ha devorado al viajero!`
        questionText.style.display = "none"
        answerTexbox.style.display = "none"
        submitClicker.style.display = "none"
    } else if (vidaRestanteMonstruo1 == 0) {
        statusText.innerText = `${nameM} ha caído derrotado. ¡El viajero es el ganador!`
        questionText.style.display = "none"
        answerTexbox.style.display = "none"
        submitClicker.style.display = "none"
    }
}
