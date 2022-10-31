class PlayerBase{
    constructor(){
        //volume Settings
        this.volumeState = "low";
        this.currentVolume = 50;
        this.prevVolume = 50;

        //search related values
        this.prevSearchQuery = "";

        //current playing music related data members

        //booleans
        this.isPlaying = false;
        this.isPaused = false;
        this.repeat = false;

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
                'X-RapidAPI-Key': '',
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

    //event listeners 
    addEventListeners(){
        //page even listeners
        //Array.from(document.getElementsByClassName("controls"))

        //volume range even listener
        document.getElementById("volumeRange").addEventListener("input", () => {this.changeVolume()});
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
                
                //play list related options
                case "a":
                    console.log("something related for adding it to a playlist ");
                    break;
            };
        });
    };
};

export const player = new PlayerBase();