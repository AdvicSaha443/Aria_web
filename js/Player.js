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
    playTrack(data){
        console.log(data);
        console.log(data.title + " PLAY FUNCTION");
    };

    appendToQueue(data){
        console.log(data.title + " QUEUE FUNCTION");
    };

    heartTrack(data){
        console.log(data.title + " HEART FUNCTION");
    };

    AddTrackToPlaylist(data){
        console.log(data.title + " ADD TO PLAYLIST FUNCTION");
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

        document.getElementById("heartButton").addEventListener("click", () => {this.heartTrack(this.currentTrack)});
        document.getElementById("playlistButton").addEventListener("click", () => {this.AddTrackToPlaylist(this.currentTrack)});

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