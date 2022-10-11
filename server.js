const express = require('express');
const ytdl = require('ytdl-core');
const expressAsyncHandler = require('express-async-handler');
const path = require('path');
const app = express();

function requireHTTPS(req, res, next) {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

app.use(requireHTTPS);

app.use(express.static(path.join(__dirname, 'dist/mp3dltube')));

app.get('/downloader', expressAsyncHandler(async (req, res) => {
    let isValidURL = ytdl.validateURL(req.query.url);
    if (isValidURL) {
        let videoID = ytdl.getVideoID(req.query.url);
        let isValidVideoID = ytdl.validateID(videoID);
        if (isValidVideoID) {
            let info = await ytdl.getBasicInfo(videoID);
            let videoData = {
                title: info.videoDetails.title,
                id: info.videoDetails.videoId
            };
            res.send({ message: "Success!", payload: videoData });
        } else {
            res.send({ message: "Something went wrong! Please, Try again." });
        }
    } else {
        res.send({ message: "Link is invalid! Kindly, Check and enter the correct link." });
    }
}));

app.get('/download', expressAsyncHandler(async (req, res) => {
    let videoID = req.query.id;
    let name = req.query.name;
    let isValidVideoID = ytdl.validateID(videoID);
    if (isValidVideoID) {
        res.attachment(name)
        ytdl(videoID, { quality: 'highestaudio' }).pipe(res);
    } else {
        res.send({ message: "Something went wrong!" });
    }
}));

app.use((err, req, res, next) => {
    res.send({ message: err.message });
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/mp3dltube/index.html'));
});

app.listen(process.env.PORT || 8080);