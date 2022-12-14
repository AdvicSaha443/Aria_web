import {player} from "./Player.js";
import {user} from "./User.js";
import {settings} from "./Settings.js";
import {page} from "./Page.js";
import {database} from "./Data.js";

/*console.log(page.test);
await data.loadAllPlaylist().then(json => console.log(json));*/
page.appendPlaylistTiles();

window.onload = () => {
    if(!user.logged){
        settings.changePage("userPage");
        settings.checkUserPageType(false);
        player.changeBottomPlayerState(true, true);
    }else{
        settings.changePage("playlistPage");
        settings.checkUserPageType(true);
        //page.appendPlaylistTiles();
    };
};

export const hello = function() {
    console.log("this method has been called!");
};