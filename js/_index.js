import {player} from "./Player.js";
import {user} from "./User.js";
import {settings} from "./Settings.js";
import {page} from "./Page.js";

//adding event listeners
settings.addEventListeners(user.logged);
console.log(player.volumeState);

window.onload = () => {
    if(!user.logged){
        settings.changePage("userPage");
        settings.checkUserPageType(false);
        player.changeBottomPlayerState(true, true);
    }else{
        settings.changePage("searchPage");
        settings.checkUserPageType(true);
    };
};

export const hello = function() {
    console.log("this method has been called!");
};