"use strict";
const lyrics = require('./lyrics');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var URL = require('url-parse');
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.post('/api/play', async (req, res) => {
    ProcessImage(JSON.stringify(req.body.post), function(mood){
        if (mood==null) res.send('Error Processing');
        else{
            res.send(mood);
        }
    });

});

app.post('/api/lyrics', (req, res) => {

    lyrics.findLyrics(JSON.stringify(req.body.post), function(lyrics){
        res.send(lyrics);
    })

});

app.listen(port, () => console.log(`Listening on port ${port}`));


//AWS FETCH

function fetchMood(imageData, callback) {
    var AWS = require('aws-sdk');
    AWS.config.update({region: 'us-east-1'});
    var uuid = require('uuid');


    var params = {
        Attributes: ["ALL"],
        Image: {
            Bytes: imageData
        }
    };


    var rekognition = new AWS.Rekognition();
    rekognition.detectFaces(params,  function (err, data) {
        if (err){ console.log(err, err.stack);
        return null;} // an error occurred
        else callback(detectMood(data.FaceDetails[0].Emotions));
    });
}

function detectMood(emotions){
    var happyVal=0, sadVal=0;
    console.log(emotions);
    emotions.forEach(function(emo){
        if (emo.Type=="HAPPY"){
            happyVal = emo.Confidence;
        }if (emo.Type=="SAD"){
            sadVal = emo.Confidence;
        }
    });
    if (happyVal<sadVal){
        return 'SAD';
    }
    else{
        return 'HAPPY';
    }

}


function ProcessImage (img, callback) {


    var atob = require('atob');
    // Load base64 encoded image
    var image
    try {
        img = img.split("\"data:image/jpeg;base64,")[1];
        image = atob(img.split("\"")[0]);

    } catch (e){
        console.log("Image is undefined")
        return null;}
    //unencode image bytes for Rekognition DetectFaces API
    var length = image.length;
    var imageBytes = new ArrayBuffer(length);
    var ua = new Uint8Array(imageBytes);
    for (var i = 0; i < length; i++) {
        ua[i] = image.charCodeAt(i);
    }
    //Call Rekognition
    fetchMood(imageBytes, function(val){
        callback(val);
    });

    


}