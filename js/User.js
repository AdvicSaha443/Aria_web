import {player} from "./Player.js";

class UserBase{
    constructor(){
        //user details
        this.name = "";
        this.id = 0;
        this.mail = "";

        this.logged = true;
        //create some type of functions for letting the user log in

        this.addEventListener();
    };

    addEventListener(){
        document.getElementById("loginButton").addEventListener('click', () => {
            this.logged = true;
            player.changeBottomPlayerState(false);
        });
    };
};

export const user = new UserBase();