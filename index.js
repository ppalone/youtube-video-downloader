const express = require('express');
const app = express();
const fs = require('fs');
const ytdl = require('ytdl-core');
const request = require('request');

app.use(express.static('views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/download', (req, res) => {
    let reqURL = req.query.URL;
    console.log(reqURL);
    // ytdl.getBasicInfo(reqURL, (err, info) => {
    //     if (err) throw err;
    //     console.log(info);
    //     res.status(200).json(info);           
    // });
    // console.log(info);
    // ytdl.getBasicInfo(reqURL, (err, info) => {
    //     if (err) throw err;
    //     let dlURL = info["player_response"]["streamingData"]["formats"][0]["url"];
    //     let dlFile = fs.createWriteStream("test.mp4");
    //     request(dlURL, (err, response, body) => {
    //         if (err) throw err;
    //         dlFile.pipe(response);
    //     });
    //     res.download(dlFile);
    // });
    res.set('Content-disposition', "attachment; filename=video.mp4");
    // res.set('Content-Type', 'text/plain');
    ytdl(reqURL, { filter : (format) => format.container === "mp4" }).pipe(res);
});

// app.get('/download/video', (req, res) => {
// });

app.listen(8000, () => console.log("Server Started")); 