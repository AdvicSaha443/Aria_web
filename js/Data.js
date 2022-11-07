class Data{

    //PLAYLIST RELATED FUNCTIONS

    async loadAllPlaylist(){
        var playlistJson;

        await fetch("./data/createdPlaylist.json")
        .then(response  => response.json())
        .then(data => playlistJson = data)
        .catch(err => console.log(err));

        return playlistJson;
    };
};

export const database = new Data();