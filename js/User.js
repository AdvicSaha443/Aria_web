import {player} from "./Player.js";

class UserBase{
    constructor(){
        this.addEventListener();
    };

    static name = "Someone";
    static id = 0;
    static mail = "";

    static logged = true;

    /**
     * @param {String} args - User's Name.
     */
    set setName(args){
        this.name = args;
    };

    get getName(){
        return this.name;
    };

    addEventListener(){
        document.getElementById("loginButton").addEventListener('click', () => {
            this.logged = true;
            player.changeBottomPlayerState(false);
        });
    };
};

export const user = new UserBase();