let comments = []
const commentContainer = document.querySelector("#comment-container")

const apiUrl = "https://63c6de614ebaa802854f84bd.mockapi.io/comments"
const loadComments = async () => {
    let response = await fetch(apiUrl)
    if (!response.ok) {
        chapterOne.style.display = "none"
        errorMessage.style.display = "flex"
    }
    comments = await response.json()
}

comments.forEach(comment => {
    let commentElement = document.createElement("div").innerHTML = 
    `
    <p>${comment.body}</p>
    `
    commentContainer.appendChild(commentElement)
});