let sessionData = getLs("session")
let comments = []

const commentContainer = document.querySelector("#comment-container")
const userNameText = document.querySelector("#user-name")
const commentBody = document.querySelector("#opinion")

const apiUrl = "https://63c6de614ebaa802854f84bd.mockapi.io/comments"
const loadComments = async () => {
    let response = await fetch(apiUrl)
    if (!response.ok) {
        chapterOne.style.display = "none"
        errorMessage.style.display = "flex"
    }
    comments = await response.json()
    comments.forEach(comment => {
        let commentElement = document.createElement("div")
        commentElement.innerHTML =
            `
            <div class="comments">
            <h3>${comment.userName}</h3>
            <p>${comment.body}</p>
            </div>
            `
        commentContainer.appendChild(commentElement)
        userNameText.innerHTML = sessionData.userName
    });
}
const postComment = async () => {
    let body = commentBody.value
    let comment = { userName: sessionData.userName, body: body }
    sendComment(comment)
    swal({
        title: "¡Tu comentario ha sido agregado a la Comunidad!",
        icon: "/img/dialogue open2.png",
        buttons: "¡Genial!"
    }).then(() => location.reload())
}

const sendComment = async (comment) => {
    let response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
}
