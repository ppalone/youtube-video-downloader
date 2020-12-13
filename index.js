const express = require('express');
const app = express();
const fs = require('fs');
const ytdl = require('ytdl-core');
// const request = require('request');
const ytlist = require('youtube-playlist');

app.use(express.static('views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/download', (req, res) => {
    let reqURL = req.query.URL;
    /*
    If the url is of a video fetch the details of the video
    else
    If the url is of a playlist get all the videos from the playlist and fetch each video's detail
    */
    if (reqURL.indexOf('watch') === -1) {
        // This means its a playlist
        ytlist(reqURL)
            .then(response => res.json(response.data.playlist))
            .catch(err => console.log(err));
    } else {
        res.status(400).send({
            message: "Something went wrong"
        });
    }
    // console.log(reqURL);
    // res.set('Content-disposition', "attachment; filename=video.mp4");
    // ytdl(reqURL, { filter : (format) => format.container === "mp4" }).pipe(res);
});

app.get('/download/video',(req, res) => {
    let dlURL = req.query.URL;
    res.set('Content-disposition', "attachment; filename=video.mp4");
    ytdl(dlURL, { filter : (format) => format.container === "mp4" }).pipe(res);
});

app.listen(8000, () => console.log("Server Started"));
