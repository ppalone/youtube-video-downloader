// alert("Hello");
const ytURL = document.getElementById('yt-url');
const dlBtn = document.getElementById('dl-btn');
const message = document.getElementById('message');

// Events
dlBtn.addEventListener('click', () => {
    let url = ytURL.value;
    if (url === "") {
        message.textContent = "Please Enter a URL!!";
    } else {
        // Send it to the Backend
        getContent(url);
    }
    // console.log(url);
});

function getContent(url) {
    fetch(`http://localhost:8000/download?URL=${url}`, {
        method:'GET'
    })
    .then(res => res.json())
    .then(json => console.log(json));
    // console.log(url);
}