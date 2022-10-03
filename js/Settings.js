export default class Settings{
    constructor(){
        //page settings
        this.currentPage = "";
        this.currentPageHeader = "";
    };

    //functions related for changing page
    changePage(page){
        if(this.currentPage !== page){
            const pageHeader = page.replace("Page", "Nav");
            this.currentPage!==""?document.getElementById(this.currentPage).style.display = "none":null;
            this.currentPageHeader!==""?document.getElementById(this.currentPageHeader).style.color = "#fff":null;
    
            document.getElementById(page).style.display = "block";
            document.getElementById(pageHeader).style.color = "#00B2FF";
    
            this.currentPage = page;
            this.currentPageHeader = pageHeader;
        }else{return};
    };

    changePageMain(page, logged){
        if(this.currentPage == page){
            return
        }else{
            if(!logged){
                alert("You're not logged in, to log in/sign up just follow the steps given on this page, in order to access the website.");
            }else{
                const pageHeader = page.replace("Page", "Nav");
    
                this.currentPage!==""?document.getElementById(this.currentPage).style.display = "none":null;
                this.currentPageHeader!==""?document.getElementById(this.currentPageHeader).style.color = "#fff":null;
    
                document.getElementById(page).style.display = "block";
                document.getElementById(pageHeader).style.color = "#00B2FF";
    
                this.currentPage = page;
                this.currentPageHeader = pageHeader;
            };
        };
    };

    //user page related functions
    checkUserPageType(logged){
        if(logged){
            document.getElementById("loginedUser").style.display = "block";
        }else{
            document.getElementById("nonLoginedUser").style.display = "block";
        };
    };
    
    changeUserName(name){
        document.getElementById("userNav").innerHTML = name;
    };

    addEventListeners(logged){
        //once the user has logged in, remove this event listener and add a new one, from which the user can navigate between the pages
        Array.from(document.getElementsByClassName("navButtons")).forEach((elem) => {
            elem.addEventListener("click", () => {
                this.changePageMain((elem.id.replace("Nav", "Page")), logged);
            });
        });
    };
};