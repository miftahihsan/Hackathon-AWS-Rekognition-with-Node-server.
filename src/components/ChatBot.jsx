import React, { Component } from 'react';
import fire from 'firebase';
import Webcam from "react-webcam";
import Songs from './songs.json';
import './styles.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, Button } from 'mdbreact';
import SpeechRecognition from 'react-speech-recognition';
import YouTube from 'react-youtube';


var myRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();


myRecognition.continous = true;
myRecognition.interimResults = true;
myRecognition.lang = 'en-US';


class ChatBot extends Component {

    state = {
        response: '',
        post: '',
        responseToPost: ''
    };

    toggleListen() {
        this.setState({
            listening: !this.state.listening
        }, this.handleListen)
    }


    handleListen(){
        try{
            if (this.state.listening) {
                myRecognition.start();
                this.setState({isListening: "Listening..."})
                this.setState({myText: ""})
            }
        }
        catch(err){
            console.log("ERROR");
        }

        let final = '';
        myRecognition.onresult = event => {
            let interim = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) final += transcript + ' ';
                else interim += transcript;
            }
            // document.getElementById('interim').innerHTML = interim
            // document.getElementById('final').innerHTML = final
            document.getElementById('defaultFormLoginPasswordEx').value = interim
            this.setState({myText: final})
        }

        myRecognition.onend = event => {
            this.dataPreProcess(event);
            this.setState({isListening: ""})
        }
        // handle speech recognition here
    }

    dataPreProcess(e){
        var wordArray = this.state.myText.trim().split(" ");
        var count = 0;
        var found = false;
        var lyrics = 0;

        for(let i = 0; i<wordArray.length; i++){
            const currrWord = wordArray[i].toLowerCase();
            if (currrWord== "lyrics" || currrWord== "lyric"){
                lyrics++;
            }

            if(currrWord == "play"){
                count = count + 1;
            }
            else if(currrWord == "song" || currrWord == "songs"){
                count = count + 1
            }

            if(count==2){
                found = true;
                this.handleSubmit();
                break;
            }
        }

        if(found){
            console.log("PLAY SONG NOW!!!!!!");
            this.capture();
            return;
        }

        if (lyrics==0){
            this.setState({responseToPost: "Command Not found"});
            return;
        }



        var songName = "";
        let wordIndex = this.state.myText.trim().split(" ");


        var lyricFoundFlag = false;
        var  i = 0;

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
/*
        var artist = this.fetchSongArtist(this.state.myText);
        var title = this.fetchSongTitle(this.state.myText);
*/
        this.setState({searchSong: songName}, function () {
            this.handleLyricsSearch();
        });


    }
     fetchSongArtist(input) {

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

     fetchSongTitle (input) {
        var songName = "";
        var formattedInput;
        var tempArray;

        if (input.includes("-")) {
            tempArray = input.trim().split("-");
            formattedInput = tempArray[0];
        } else if (input.includes("by")) {
            tempArray = input.trim().split("by");
            formattedInput = tempArray[0];

        } else {
            formattedInput = input;
        }

        let wordIndex = formattedInput.trim().split(" ");



        var lyricFoundFlag = false;
        var i = 0;

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

    handleChange(e){
        e.preventDefault();
        this.setState({myText: e.target.value})
    }




    handleSubmit = async () => {
        this.setState({responseToPost: "Loading..."});
        const response = await fetch('http://localhost:4000/api/play', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
        });


        const body = await response.text();

        this.setState({ responseToPost: "Here is a "+ body + " music " });
        let song=0;
        if (body=="HAPPY"){
            song = Songs.HappySongs[Math.floor(Math.random()*5)];
        }
        else{
            song = Songs.SadSongs[Math.floor(Math.random()*7)];
        }
        console.log(song)
        this.setState({ song: song.Name}, function () {
            this.setState({ url: song.URL}, function () {
                this.setState({ artist: song.artist}, function () {
                    this.setState({ artist: song.artist}, function () {
                        this.setState({ songResponse: "Now playing " + this.state.song + " By " + this.state.artist });


                    });
                })
            });
        });


    };

    handleLyricsSearch = async() =>{
        this.setState({responseToPost: "Loading..."});
        console.log(this.state.searchSong);
        const response = await fetch('http://localhost:4000/api/lyrics',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.searchSong}),
        });
        var body = await response.text();
        console.log(body);
        this.setState({ responseToPost: body});

    };

  constructor(){
    super();
      this.logOut = this.logOut.bind(this);
      this.state = {
        response: "",
        songResponse: "",
        song: "",
        artist: "",
          url: "",
          searchSong:"",
          myText: "",
          isListening: ""

      }
      this.logOut = this.logOut.bind(this);
      this.toggleListen = this.toggleListen.bind(this);
      this.handleListen = this.handleListen.bind(this);
      this.dataPreProcess = this.dataPreProcess.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.fetchSongArtist = this.fetchSongArtist.bind(this);
      this.fetchSongTitle = this.fetchSongTitle.bind(this);
      this.onKeyPressed = this.onKeyPressed.bind(this);
      this._onReady = this._onReady.bind(this);



  }


  logOut(){
    fire.auth().signOut();
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture =  () => {
      const imageSrc = this.webcam.getScreenshot();

      this.setState({post: imageSrc}, function () {
          this.handleSubmit();
      });
     // f();


  };

  onKeyPressed(event){
      if (event.keyCode == 13){
          event.preventDefault();
          this.dataPreProcess(event);
      }
  }
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }






  render() {
   return (

    <div >
    <Webcam className="webcam"
        audio={false}
        height={350}
        ref={this.setRef}
        screenshotFormat="image/jpeg"
        width={350}
    />
        <form onKeyDown={this.onKeyPressed}>
            <p className="h4 text-center mb-4">CHAT BOT</p>
            <input id="defaultFormLoginPasswordEx"
                   className="form-control" type="text" name="myText" placeholder="Enter Text Here" value={this.state.myText} onChange={this.handleChange} />
            <Button type="button" onClick={this.dataPreProcess}>submit</Button>
        </form>

        <Button id='microphone-btn' onClick={this.toggleListen} >Turn on mic</Button>
        <Button id='sign-out-btn' onClick={this.logOut} >Sign Out</Button>

        {this.state.response}


        <p >{this.state.responseToPost} </p>
        <a href={this.state.url}>
        <p className='lyrics'>{this.state.songResponse}</p>
            <p>  </p>
        </a>
        <p>{this.state.isListening}</p>
        <YouTube
            id = 'youtube-id'
            videoId="2g811Eo7K8U"
            onReady={this._onReady}
        />
    </div>
  );
}
}

export default ChatBot;
