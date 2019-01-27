
var input = "hello retard could you please lyrics for this song"

console.log(fetchSongArtist(input));
console.log(fetchSongLyrics(input));

function fetchSongArtist(input) {

    var wordIndex;

    if (input.includes("-")) {
        wordIndex = input.trim().split("-");
    } else if (input.includes("by")) {
        wordIndex = input.trim().split("by");
    } else {
        return "";
    }

    return wordIndex[wordIndex.length-1];
}

function fetchSongLyrics (input) {
var songName = "";
var formattedInput;
var tempArray;

    if (input.includes("-")) {
        tempArray = input.trim().split("-");
        formattedInput = tempArray[0];
    } else if (input.includes("by")) {
        wordIndex = input.trim().split("by");
        formattedInput = tempArray[0];

    } else {
        formattedInput = input;
    }

let wordIndex = formattedInput.trim().split(" ");



var lyricFoundFlag = false;
  i = 0;

while(i < wordIndex.length ){

    if(wordIndex[i++].includes("lyric")) {
        lyricFoundFlag = true;

        if(wordIndex[i] == "for" || wordIndex[i] == "of") {
            i++;
        }
    }


    if(lyricFoundFlag && wordIndex[i] != null) {
        songName += " " + wordIndex[i];
    }
}

console.log(songName);

return songName;





    console.log();

}