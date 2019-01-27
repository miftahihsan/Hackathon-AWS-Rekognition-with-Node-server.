var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var URL = require('url-parse');


var targetWebsiteUrl = new URL("https://www.lyrics.com/")
var START_URL_BEGIN_FOR_NO_ARTIST_NAME = "https://www.lyrics.com/serp.php?st=";
var START_URL_END_FOR_NO_ARTIST_NAME = "&stype=1" ;
var lyricsfinal;

var pagesVisited = {};
var numPagesVisited = 0;
var artistPages = [];
var artistPagesVisited = {};


var lyricsPages = [];

var baseUrl = targetWebsiteUrl.protocol + "//" + targetWebsiteUrl.hostname;

//pagesToVisit.push(START_URL);

//callbackset

//var finalResult =  searchSongWithoutArtist("fdgfh ehrjrt", writeToFile );
//console.log(finalResult);


module.exports = {
    findLyrics: function (title, LyricsFetchedCallback) {
        console.log(title);
        var formattedTitle = title.trim();
        formattedTitle = formattedTitle.replace(/ /g, '+');
        console.log(formattedTitle);

        var urlString = START_URL_BEGIN_FOR_NO_ARTIST_NAME + formattedTitle + START_URL_END_FOR_NO_ARTIST_NAME;
        console.log(urlString);

        var url = new URL(urlString);

        console.log("Visiting page " + url);


        request(urlString, async function(error, response, body) {
            //request Check status code (200 is HTTP OK)
            // console.log("Status code: " + response.statusCode);
            if(error ||  response.statusCode !== 200) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode)
                return;
            }
            // Parse the document body
            var $ = cheerio.load(body);
            //callbackset..
            lyricsfinal = await collectInternalLinks($, LyricsFetchedCallback);
            // var isWordFound = searchForWord($, SEARCH_WORD);

        });





        //fetchLyrics(lyricsPages.pop());




    }

}



async function fetchLyrics(lyricsUrl, LyricsFetchedCallback) {

    var lyricsContent;

    request(lyricsUrl, function(error, response, body) {
        //request Check status code (200 is HTTP OK)
        // console.log("Status code: " + response.statusCode);
        if(error ||  response.statusCode !== 200) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode)
            return;
        }

        console.log("Opening lyrics for " + lyricsUrl);

        // Parse the document body
        var $ = cheerio.load(body);
        var lyricsContent = $('pre').text();

        console.log(lyricsContent);

        LyricsFetchedCallback(lyricsContent);
        return lyricsContent;


        // var isWordFound = searchForWord($, SEARCH_WORD);

    });
}





async function collectInternalLinks($, LyricsFetchedCallback) {
    var relativeLinks = $("a[href^='/']");
    console.log("Found " + relativeLinks.length + " relative links on page");
    var count = 0;

    var lyricsdatafinal;
    var alreadyLoadedLyricsFlag = false;

    var deadchecker = $('[class="lyric-no-data clearfix"]');


    console.log(deadchecker.length);

    if(deadchecker.length > 0) {
        lyricsdatafinal = "Lyrics could not be found for this song. Please try another!"
        LyricsFetchedCallback(lyricsdatafinal);
        console.log(lyricsdatafinal);

        return lyricsdatafinal;
    }




    relativeLinks.each( function () {
        var relativeLink = $(this).attr('href');

        if(!alreadyLoadedLyricsFlag && relativeLink.includes("/lyric/") )
        {
            var fulLink = baseUrl + relativeLink;
            console.log(fulLink);
            lyricsPages.push(fulLink);
            lyricsdatafinal =  fetchLyrics(fulLink, LyricsFetchedCallback);
            alreadyLoadedLyricsFlag = true;
            console.log(alreadyLoadedLyricsFlag);

        }


        //pagesToVisit.push(baseUrl + $(this).attr('href'));
    });


    if(!alreadyLoadedLyricsFlag) {
        LyricsFetchedCallback("Could not find song in database");
    }

    return lyricsfinal;

}

function writeToFile(lyricsString) {

    fs.writeFile('lyrics.txt', lyricsString, function (err) {
        if (err) return console.log(err);
        console.log('Printed lyrics to file..');
    });

}
