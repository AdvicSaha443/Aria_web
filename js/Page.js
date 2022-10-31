import {player} from "./Player.js";

class Page{
    constructor(){
        this.addEventListeners();
    }

    async addEventListeners(){
        //search event listeners
        var searchInput = document.getElementById("musicSearchInput");
        searchInput.addEventListener('keydown', async (ev) => {
            if(ev.key == "Enter"){

                var val = searchInput.value;
                if(val == " " || val == "" || val == null || val == undefined || val == player.prevSearchQuery) return;

                await player.searchTracks(val).then((response) => {
                    console.log(response);

                    //tracks
                    Array.from(response.tracks.hits).forEach((elem) => {
                        this.appendMusicTiles("track", elem);
                    });
                });
            };
        });

        document.getElementById("musicSearchButton").addEventListener('click', async () => {
            var val = searchInput.value;
            if(val == " " || val == "" || val == null || val == undefined || val == player.prevSearchQuery) return;

            const response = player.searchTracks(val);
        });
    };

    // SEARCH PAGE APPENDING TILES

    //for appending resutls tiles in search page
    appendMusicTiles(type, data){
        const page = document.getElementById("searchPageSubContent");

        const child = document.createElement("li");
        child.innerHTML = data.track.title;

        page.appendChild(child);
    };
};

export const page = new Page()