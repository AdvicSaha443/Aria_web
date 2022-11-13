import {database} from "./Data.js";
import {player} from "./Player.js";

class Page{
    constructor(){
        this.addEventListeners();
    };

    async addEventListeners(){
        //search event listeners
        var searchInput = document.getElementById("musicSearchInput");
        
        searchInput.addEventListener('keydown', async (ev) => {
            if(ev.key == "Enter"){
                var val = searchInput.value;
                if(val == " " || val == "" || val == null || val == undefined || val == player.prevSearchQuery) return;
                else{
                    await player.searchTracks(val, 10).then((response) => {
                        console.log(response);

                        //removing previous tiles
                        Array.from(document.getElementsByClassName("searchPageTrackTile")).forEach(elem => elem.remove());
                        Array.from(document.getElementsByClassName("searchPageAuthorTile")).forEach(elem => elem.remove());

                        //tracks
                        Array.from(response.tracks.hits).forEach((elem) => {
                            this.appendTrackTiles(elem);
                        });

                        //authors
                        Array.from(response.artists.hits).forEach((elem) => {
                            this.appendAuthorTiles(elem.artist);
                        });
                    });
                };
            };
        });

        document.getElementById("musicSearchButton").addEventListener('click', async () => {
            var val = searchInput.value;
            if(val == " " || val == "" || val == null || val == undefined || val == player.prevSearchQuery) return;

            await player.searchTracks(val, 10).then((response) => {
                console.log(response);

                //removing previous tiles
                Array.from(document.getElementsByClassName("searchPageTrackTile")).forEach(elem => elem.remove());
                Array.from(document.getElementsByClassName("searchPageAuthorTile")).forEach(elem => elem.remove());

                //tracks
                Array.from(response.tracks.hits).forEach((elem) => {
                    this.appendMusicTiles("track", elem);
                });

                //authors
                Array.from(response.artists.hits).forEach((elem) => {
                    this.appendAuthorTiles(elem.artist);
                });
            });
        });

        document.getElementById("playlistNav").addEventListener("click", () => {this.appendPlaylistTiles()});

        //navigation event listeners
        /*const buttonsMap = {
            ""
        }*/
    };

    // SEARCH PAGE - APPENDING TILES

    //for appending resutls tiles in search page
    appendTrackTiles(data){
        const page = document.getElementById("searchPageSubTracksContent");

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

    appendAuthorTiles(author){
        const page = document.getElementById("searchPageSubArtistsContent");

        const child = document.createElement("li");
        child.className = "searchPageAuthorTile";

        const image = document.createElement("img");
        image.src = author.avatar;
        image.style.borderRadius = "100%";

        const text = document.createElement("h3");
        text.innerHTML = author.name;
        
        const authorDiv = document.createElement("div");
        authorDiv.appendChild(image);
        authorDiv.appendChild(text);

        child.appendChild(authorDiv);
        page.appendChild(child);
    };

    //PLAYLIST PAGE
    async appendPlaylistTiles(){
        const pageContent = document.getElementById("playlistPageContent");
        Array.from(document.getElementsByClassName("playlistPage-playlist")).forEach((elem) => {
            elem.remove();
        });

        await database.loadAllPlaylist().then(async (playlistsJson) => {
            for(const elem in playlistsJson){
                const liTag = document.createElement("li");
                liTag.className = "playlistPage-playlist";

                const leftDiv = document.createElement("div");
                leftDiv.className = "playlistPageLeftContent";

                const rightDiv = document.createElement("div");
                rightDiv.className = "playlistPageRightContent";

                //left div sub divisions 
                const imageDiv = document.createElement("div");
                imageDiv.className = "playlistPageLeftContentImageDiv";
                
                const image = document.createElement("img");
                image.src = playlistsJson[elem].coverart;
                imageDiv.appendChild(image);
                
                const subInfoDiv = document.createElement("div");
                subInfoDiv.className = "leftDivSubContentDiv";
                
                const playlistName = document.createElement("div");
                const h2__1 = document.createElement("h2");
                h2__1.innerHTML = playlistsJson[elem].name;

                playlistName.appendChild(h2__1);
                subInfoDiv.appendChild(playlistName);
                
                const authorName = document.createElement("div");
                const h2__2 = document.createElement("h4");
                h2__2.innerHTML = `by ${playlistsJson[elem].author}`;

                authorName.appendChild(h2__2);
                subInfoDiv.appendChild(authorName);
                
                leftDiv.appendChild(imageDiv);
                leftDiv.appendChild(subInfoDiv);

                //right div

                //play Button
                const playButton = document.createElement("button");
                const h2_1 = document.createElement("h2");
                const icon1 = document.createElement("i");

                playButton.className = "playlistPageButton";
                icon1.className = "ph-play";

                h2_1.appendChild(icon1);
                playButton.appendChild(h2_1);

                playButton.addEventListener("click", async () => {
                    await player.stop();

                    for(var item in playlistsJson[elem].tracks){
                        player.appendToQueue(playlistsJson[elem].tracks[item]);
                    };
                });

                //queue button
                
                const queueButton = document.createElement("button");
                const h2_2 = document.createElement("h2");
                const icon2 = document.createElement("i");

                queueButton.className = "playlistPageButton";
                icon2.className = "ph-microphone-stage";

                h2_2.appendChild(icon2);
                queueButton.appendChild(h2_2);

                //extra options button

                const extraButton = document.createElement("button");
                const h2_3 = document.createElement("h2");
                const icon3 = document.createElement("i");

                extraButton.className = "playlistPageButton";
                icon3.className = "ph-dots-three-vertical";

                h2_3.appendChild(icon3);
                extraButton.appendChild(h2_3);

                extraButton.addEventListener("click", () => {

                });

                rightDiv.appendChild(playButton);
                rightDiv.appendChild(queueButton);
                rightDiv.appendChild(extraButton);

                liTag.appendChild(leftDiv);
                liTag.appendChild(rightDiv);

                pageContent.appendChild(liTag);

                liTag.addEventListener("click", (ev) => {

                    if(["ph-play", "ph-microphone-stage", "ph-dots-three-vertical"].includes(ev.target.className) || ev.target.tagName === "BUTTON") return;
                    
                    // do something to change the page and show the tracks of the playlist
                    console.log(playlistsJson[elem]);
                });
            };
        });
    };
};

export const page = new Page();