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
                else{
                    await player.searchTracks(val).then((response) => {
                        console.log(response);

                        //tracks
                        Array.from(document.getElementsByClassName("searchPageTrackTile")).forEach(elem => elem.remove());
                        Array.from(response.tracks.hits).forEach((elem) => {
                            this.appendMusicTiles("track", elem);
                        });
                    });
                };
            };
        });

        document.getElementById("musicSearchButton").addEventListener('click', async () => {
            var val = searchInput.value;
            if(val == " " || val == "" || val == null || val == undefined || val == player.prevSearchQuery) return;

            const response = player.searchTracks(val);
        });
    };

    // SEARCH PAGE - APPENDING TILES

    //for appending resutls tiles in search page
    appendMusicTiles(type, data){
        const page = document.getElementById("searchPageSubContent");

        const child = document.createElement("li");
        const leftDiv = document.createElement("div");
        const rightDiv = document.createElement("div");

        child.className = "searchPageTrackTile";

        // LEFT CONTENT
        leftDiv.className = "leftContent";
        rightDiv.className = "rightContent";

        const textDiv = document.createElement("div");
        textDiv.className = "subLeftContentDiv";

        const image = document.createElement("img");
        image.src = data.track.images.coverart;
        image.style.borderRadius = "100%";

        const leftDivTitle = document.createElement("h2");
        leftDivTitle.innerHTML = data.track.title;

        const leftDivAuthor = document.createElement("h3");
        leftDivAuthor.innerHTML = data.track.subtitle;

        //RIGHT CONTENT
        const icons = ["ph-play", "ph-microphone-stage", "ph-heart", "ph-list-plus"];
        const map = {
            "ph-play": player.playTrack,
            "ph-microphone-stage": player.appendToQueue,
            "ph-heart": player.heartTrack,
            "ph-list-plus": player.AddTrackToPlaylist,
        };

        function parseFunction(icon){
            return map[icon](data.track);
        }

        icons.forEach((icon) => {
            const i = document.createElement("i");
            const h2 = document.createElement("h2");
            const button = document.createElement("button");

            i.className = icon;
            button.className = "searchPageMusicButton";
            button.addEventListener("click", () => {parseFunction(icon)});

            h2.appendChild(i);
            button.appendChild(h2);
            rightDiv.appendChild(button);
        });

        //appending childs
        textDiv.appendChild(leftDivTitle);
        textDiv.appendChild(leftDivAuthor);

        leftDiv.appendChild(image);
        leftDiv.appendChild(textDiv);

        child.appendChild(leftDiv);
        child.appendChild(rightDiv);

        page.appendChild(child);
    };
};

export const page = new Page();