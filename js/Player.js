import {database} from "./Data.js";
import {settings} from "./Settings.js";
import {rapidApiKey} from "./Keys.js";
import {Modal} from "./Tools.js";

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
    async searchTracks(query, lim = 5){
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
        };

        console.log(lim);

        var data;
        
        await fetch(`https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US&offset=0&limit=${lim}`, options)
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

            Modal.new(true);
            Modal.setHeaderMessage("Choose a playlist to append this track");
            Modal.createDropDownList(false, playlistsJson);
            Modal.createDoneButton("Append", "modalDropDownList", "You haven't selected a playlist to append this track!", true, (selectedValue) => {
                database.appendTrackIntoPlaylist(data, selectedValue);
            });
            Modal.createCloseButton();
        });
    };

    async stop(){
        console.log("stop function has been called!");
    };

    async pause(){
        console.log("pause function has been called!");
    };

    async continue(){
        console.log("continue function has been called!");
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
        document.addEventListener("keydown", async (ev) => {
            //some hierarchy methods
            if(ev.key == "Escape"){
                if(Modal.active) Modal.remove();
                console.log("settings pop up and other commands as well");
            };

            if(ev.target.nodeName === "INPUT") return;
            ev.preventDefault();

            switch(ev.key){
                case " ":
                    console.log("pause");
                    break;
                
                //volume
                case "ArrowUp":
                    if(this.currentVolume !== 100) this.changeVolume(this.currentVolume+1);

                    console.log("volume up");
                    break;

                case "ArrowDown":
                    if(this.currentVolume !== 0) this.changeVolume(this.currentVolume-1);

                    console.log("volume down");
                    break;
                
                case "m":
                    if(this.currentVolume !== 0) this.changeVolume(0);
                    else this.changeVolume(this.prevVolume);

                    console.log("mute");
                    break;
                
                case "s":
                    //why though?
                    //could replace this to search song and play the first query which it gets
                    if(settings.currentPage !== "searchPage"){
                        Modal.new(true);

                        Modal.setHeaderMessage("Search for a song!");
                        Modal.createInputBox();

                        Modal.createDoneButton("Search", "modalInputBox", "Please Enter a search query to search for it", true, (selectedValue) => {
                            console.log(selectedValue + " the callback function has been called!!");
                        });
                        Modal.createCloseButton();
                    }else{
                        document.getElementById("musicSearchInput").focus();
                    };

                    break;
                
                //play list related options
                case "a":

                    await database.loadAllPlaylist().then((playlistsJson) => {
                        if(!Object.keys(playlistsJson).length) return alert("You don't have any playlist created!");

                        Modal.new(true);
                        Modal.setHeaderMessage("Choose a playlist to append this track");
                        Modal.createDropDownList(false, playlistsJson);
                        Modal.createDoneButton("Append", "modalDropDownList", "You haven't selected a playlist to append this track!", true, (selectedValue) => {
                            database.appendTrackIntoPlaylist(this.currentTrack, selectedValue);
                        });
                        Modal.createCloseButton();
                    });

                    break;
            };
        });

        document.getElementById("heartButton").addEventListener("click", async () => {await this.heartTrack(this.currentTrack)});
        document.getElementById("playlistButton").addEventListener("click", async () => {await this.AddTrackToPlaylist(this.currentTrack)});

        var loopButton = document.getElementById("loopButton");
        Array.from(document.getElementsByClassName("loopBUTTON")).forEach(elem => {
            elem.addEventListener("click", () => {
            //handling loop button click
                if(this.repeatTrack){

                    //changing button state
                    document.getElementById("loopButtonOnce").style.display = "none";
                    loopButton.style.display = "block";

                    //changing data members:
                    this.repeatTrack = false;
                }else{

                    //changing button state
                    document.getElementById("loopButtonOnce").style.display = "block";
                    document.getElementById("loopButton").style.display = "none";

                    this.repeatTrack = true;
                };
            });
        });
    };
};

export const player = new PlayerBase();