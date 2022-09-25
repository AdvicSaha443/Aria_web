class Player{
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

        //music details
        this.name = "";
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
};

const Settings = {
    currentPage: "",
    currentPageHeader: "",
};

const User = {
    signed_in: true,

    //details
    name: "Advic",
    id: 0,
    mail: "",
};

const player = new Player();

//executing this function once the page has loaded
function onDocLoad(){
    if(!User.signed_in){
        console.log("User is not signed in");
        changePage("userPage");
        checkUserPageType();

        //redirect the user to the 'userpage' and ask the user to login there
        //i've not added the code for this right now because i've to check with other pages too lol 
    }else{
        changePage("playerPage");
        changeUserName();
    };
};

//functions related for changing the page
function changePage(page){
    if(Settings.currentPage !== page){
        const pageHeader = page.replace("Page", "Nav");
        Settings.currentPage!==""?document.getElementById(Settings.currentPage).style.display = "none":null;
        Settings.currentPageHeader!==""?document.getElementById(Settings.currentPageHeader).style.color = "#fff":null;

        document.getElementById(page).style.display = "block";
        document.getElementById(pageHeader).style.color = "#00B2FF";

        Settings.currentPage = page;
        Settings.currentPageHeader = pageHeader;
    }else{return};
};

function changePageMan(page){
    if(Settings.currentPage == page){
        return
    }else{
        if(!User.signed_in){
            alert("You're not logged in, to log in/sign up just follow the steps given on this page, in order to access the website.");
        }else{
            const pageHeader = page.replace("Page", "Nav");

            Settings.currentPage!==""?document.getElementById(Settings.currentPage).style.display = "none":null;
            Settings.currentPageHeader!==""?document.getElementById(Settings.currentPageHeader).style.color = "#fff":null;

            document.getElementById(page).style.display = "block";
            document.getElementById(pageHeader).style.color = "#00B2FF";

            Settings.currentPage = page;
            Settings.currentPageHeader = pageHeader;
        };
    };
};

function checkUserPageType(){
    if(User.signed_in){
        //making the div visible
        document.getElementById("loginedUser").style.display = "block";
    }else{
        //making the div visible
        document.getElementById("nonLoginedUser").style.display = "block";
    };
};

function changeUserName(){
    if(User.signed_in){
        console.log("why isn't this working");
        document.getElementById("userNav").innerHTML = User.name;
    };
};