const User = {
    signed_in: false,
    
};
const Settings = {
    //volume Settings:
    volumeState: "low",
    currentVolume: 50,
    prevVolume: 50,
};

function sliderUpdate(forceChange, val, state){
    if(forceChange){
        const slider = document.getElementById("volumeRange");

        slider.style.background = `linear-gradient(to right, #00B2FF ${(val/slider.max)*100}%, #fff ${(val/slider.max)*100}%)`;
        Array.from(document.getElementsByClassName("volumeIcon")).forEach((element) => {element.style.display = "none"});
        document.getElementById(`volumeIcon-${state}`).style.display = "block";
        slider.value = val;

    }else{
        const slider = document.getElementById("volumeRange");
        slider.style.background = `linear-gradient(to right, #00B2FF ${(slider.value/slider.max)*100}%, #fff ${(slider.value/slider.max)*100}%)`;

        //changing the volume value in Settings
        Settings.prevVolume = Settings.currentVolume;
        Settings.currentVolume = parseInt(slider.value);

        
        const icons = document.getElementsByClassName("volumeIcon");
        Array.from(icons).forEach((element) => {element.style.display = "none"});
        
        if(parseInt(slider.value) === 0){
            const volumeIcon = document.getElementById("volumeIcon-none");
            volumeIcon.style.display = "block";
            Settings.volumeState = "none";
            
        }else if(parseInt(slider.value) <= 50 && parseInt(slider.value) > 0){
            const volumeIcon = document.getElementById("volumeIcon-low");
            volumeIcon.style.display = "block";
            Settings.volumeState = "low";

        }else if(parseInt(slider.value) > 50 && parseInt(slider.value) <=100){
            const volumeIcon = document.getElementById("volumeIcon-high");
            volumeIcon.style.display = "block";
            Settings.volumeState = "high";

        }else{
            console.log("what " + slider.value + ` ${typeof(slider.value)}`);
        };
    }
};

function changeVolumeState(){
    const currVolume = Settings.currentVolume;
    const state = Settings.volumeState;
    const prev = Settings.prevVolume;

    if(state === "low" || state === "high"){
        sliderUpdate(true, 0, "none");

        Settings.volumeState = "none";
        Settings.prevVolume = currVolume;
        Settings.currentVolume = 0;

    }else if(state === "none"){
        sliderUpdate(true, prev, prev === 0? "none": prev>=50 && prev<=100? "high":"low");

        Settings.currentVolume = Settings.prevVolume;
        Settings.volumeState = prev === 0? "none": prev>=50 && prev<=100? "high":"low";
        Settings.prevVolume = 0;

    }
}