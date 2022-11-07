import {database} from "./Data.js";

class PlayerBase{
    constructor(){
        //volume Settings
        this.volumeState = "low";
        this.currentVolume = 50;
        this.prevVolume = 50;

        //search related values
        this.prevSearchQuery = "";

        //current playing music related data members
        this.currentTrack = {
            title: "Can't take my eyes off you",
        };

        //queue related data members
        this.queue = [];
        this.history = [];
        this.position = 0;

        //booleans
        this.isPlaying = false;
        this.isPaused = false;
        this.repeatTrack = false;
        this.repeatPlaylist = false;

        this.changeVolume();
        this.addEventListeners();
    };

    //volume related functions
    changeVolume(to){
        const volumeSlider = document.getElementById("volumeRange");
        const prevVolumeState = this.volumeState;
        const sliderVal = volumeSlider.valueAsNumber;
        const currVolumeState = to||to===0?(to === 0? "none": (to>=50 && to<=100? "high":"low")):(sliderVal === 0? "none": (sliderVal>=50 && sliderVal<=100? "high":"low"));

        //checking if the value of to is undefined, if undefined which means the html page is calling the function.
        to||to===0?volumeSlider.value = to: to = sliderVal;

        this.volumeState = currVolumeState;
        this.prevVolume = this.currentVolume;
        this.currentVolume = to;

        //updating the slider value
        volumeSlider.style.background = `linear-gradient(to right, #00B2FF ${(to/volumeSlider.max)*100}%, #fff ${(to/volumeSlider.max)*100}%)`;

        //changing the icon after the volume has changed
        if(prevVolumeState !== currVolumeState){
            Array.from(document.getElementsByClassName("volumeIcon")).forEach((element) => {element.style.display = "none"});
            document.getElementById(`volumeIcon-${currVolumeState}`).style.display = "block";
        };
    };
    
    changeVolumeState(){
        const state = this.volumeState;
        
        (state==="low")||(state==="high")?
            this.changeVolume(0):
            this.changeVolume(this.prevVolume);
    };

    //hiding bottom player
    changeBottomPlayerState(hide, comp){
        if(hide){
            if(comp){
                document.getElementById("player").style.display = "none";
            }else{
                //make it like kinda like they can make it visible again
            };
        }else{
            document.getElementById("player").style.display = "block";
        };
    };

    //api search command
    async searchTracks(query){
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '02eef9a4a7msh525f4f469486b12p1553eajsn21901f45d9cd',
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
        };

        var data;
        
        await fetch(`https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US&offset=0&limit=5`, options)
        .then((response) => {
            data = response.json();
            console.log(data);
        })
        .catch((err) => {
            console.error(err);
            return false;
        });

        return data;
    };

    //MUSIC PLAYERS RELATED COMMANDS
    async playTrack(data){
        console.log(data);
        console.log(data.title + " PLAY FUNCTION");
    };

    appendToQueue(data){
        console.log(data.title + " QUEUE FUNCTION");
    };

    async heartTrack(data){
        console.log(data.title + " HEART FUNCTION");
    };

    async AddTrackToPlaylist(data){
        await database.loadAllPlaylist().then((playlistsJson) => {
            if(JSON.stringify(playlistsJson) == "{}") return alert("You don't have any playlist created");

            //creating modal
            let popUpBox = document.getElementById('popUpBox');
            popUpBox.style.display = "block";

            var text = document.createElement("h1");
            text.innerHTML = "Choose a playlist to append this track";
            
            //middle Content
            var middleDiv = document.createElement("div");
            middleDiv.className = "middleModalContentDiv";
            
            //exit button
            var closeModalDiv = document.createElement("div");
            closeModalDiv.className = "closeModal";
            
            var exitButton = document.createElement("button");
            exitButton.className = "closeModalButton";
            exitButton.innerHTML = "X";
            
            exitButton.addEventListener("click", () => {
                document.getElementById('popUpBox').style.display = "none";
                document.getElementById('popUpOverlay').style.display = "none";

                document.getElementById("box").remove();
            });
            
            closeModalDiv.appendChild(exitButton);

            //making select options

            var playlistSelect = document.createElement("select");
            playlistSelect.name = "playlist_selection";
            playlistSelect.size = Object.keys(playlistsJson).length;

            for(var elem in playlistsJson){
                var playlistOption = document.createElement("option");
                playlistOption.value = playlistsJson[elem];

                playlistSelect.appendChild(playlistOption);
            };

            middleDiv.appendChild(playlistSelect);

            var box = document.createElement("div");
            box.className = "box";
            box.id = "box";
            
            box.appendChild(text); //POPUP BOX
            box.appendChild(middleDiv);
            box.appendChild(closeModalDiv); //POPUP BOX

            popUpBox.appendChild(box);
        });
    };

    //event listeners 
    addEventListeners(){
        //page even listeners
        //Array.from(document.getElementsByClassName("controls"))

        //volume range even listener
        var volumeRange = document.getElementById("volumeRange");
        volumeRange.addEventListener("input", () => {this.changeVolume()});

        //doesn't seem to work
        volumeRange.addEventListener("scroll", (ev) => {
            console.log(ev.type);
        });
        
        document.getElementById("volumeButton").addEventListener("click", () => {this.changeVolumeState()});

        //keyboard event listeners
        document.addEventListener("keydown", (ev) => {
            if(ev.target.nodeName === "INPUT") return;

            switch(ev.key){
                case " ":
                    console.log("pause");
                    break;
                
                //volume
                case "ArrowUp":
                    console.log("volume up");
                    break;

                case "ArrowDown":
                    console.log("volume down");
                    break;
                
                case "m":
                    console.log("mute");
                    break;
                
                case "s":
                    console.log("search pop up");
                    break;

                case "Escape":
                    console.log("settings pop up and other commands as well");
                    break;
                
                //play list related options
                case "a":
                    console.log("something related for adding it to a playlist ");
                    break;
            };
        });

        document.getElementById("heartButton").addEventListener("click", async () => {await this.heartTrack(this.currentTrack)});
        document.getElementById("playlistButton").addEventListener("click", async () => {await this.AddTrackToPlaylist(this.currentTrack)});

        var loopButton = document.getElementById("loopButton");
        Array.from(document.getElementsByClassName("loopBUTTON")).forEach(elem => {
            elem.addEventListener("click", () => {
                console.log("hello");
            //handling loop button click
                if(this.repeatTrack){

                    //changing button state
                    document.getElementById("loopButton-once").style.display = "none";
                    loopButton.style.display = "block";

                    //changing data members:
                    this.repeatTrack = true;
                }else{

                    //changing button state
                    document.getElementById("loopButtonOnce").style.display = "block";
                    document.getElementById("loopButton").style.display = "none";

                    this.repeatTrack = false;
                };
            });
        });
    };
};

export const player = new PlayerBase();