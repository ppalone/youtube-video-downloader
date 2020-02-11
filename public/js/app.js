// alert("Hello");
const ytURL = document.getElementById('yt-url');
const dlBtn = document.getElementById('dl-btn');
const message = document.getElementById('message');

// Events
dlBtn.addEventListener('click', () => {
    // Clear table every time I hit download
    document.getElementById('yt-vid-content').innerHTML = "";
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
    .then(json => addContent(json))
    .catch(err => {
        message.textContent = res.data.message;
    });
    // console.log(url);

}

function addContent(data) {
    // console.log(data);
    // Grab the the table
    let ytVidContent = document.getElementById('yt-vid-content');
    let i = 1;
    data.forEach(dataVid => {
        let newRow = document.createElement('tr');
        let srNo = document.createElement('td');
        let vidName = document.createElement('td');
        let vidLink = document.createElement('td');
        srNo.textContent = i;
        console.log(dataVid.name);
        vidName.textContent = dataVid.name;
        vidLink.innerHTML = `<a href="/download/video?URL=${dataVid.url}">Download<a>`;
        newRow.appendChild(srNo);
        newRow.appendChild(vidName);
        newRow.appendChild(vidLink);
        ytVidContent.appendChild(newRow)
        i++;
    });
    
}