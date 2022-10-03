export default class Player{
    constructor(){
        //volume Settings
        this.volumeState = "low";
        this.currentVolume = 50;
        this.prevVolume = 50;

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

    addEventListeners(){
        //page even listeners
        Array.from(document.getElementsByClassName("controls"))

        //volume range even listener
        document.getElementById("volumeRange").addEventListener("input", () => {this.changeVolume()});
        document.getElementById("volumeButton").addEventListener("click", () => {this.changeVolumeState()});


    }
};