import Player from "./Player.js";
import User from "./User.js";
import Settings from "./Settings.js";

const player = new Player();
const settings = new Settings();
const user = new User();

//adding event listeners
settings.addEventListeners(user.logged);

window.onload = () => {
    if(!user.logged){
        settings.changePage("userPage");
        settings.checkUserPageType(false);
    }else{
        settings.changePage("playerPage");
        settings.checkUserPageType(true);
    }
}