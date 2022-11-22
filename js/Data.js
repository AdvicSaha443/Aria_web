import {initializeApp} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {firebaseConfig} from "./Keys.js";

class Data{
    constructor(){
        this.firebaseApp = initializeApp(firebaseConfig);
    };

    //PLAYLIST RELATED FUNCTIONS

    async loadAllPlaylist(){

        /*this.firebaseApp.auth().signInWithEmailAndPassword("test@gmail.com", "test@123");*/

        var playlistJson;

        await fetch("./data/createdPlaylist.json")
        .then(response  => response.json())
        .then(data => playlistJson = data)
        .catch(err => console.log(err));

        return playlistJson;
    };

    async appendTrackIntoPlaylist(track, playlist){
        const playlists = await this.loadAllPlaylist();

        console.log(playlists);
    };

    async createNewPlaylist(playlistArr){
        console.log(playlistArr);
    };
};

export const database = new Data();