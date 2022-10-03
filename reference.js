export default function onLoad(user){
    console.log("ok");
    /*if(!user.signed_in){
        console.log("User is not signed in");
        changePage("userPage");
        checkUserPageType();

        //redirect the user to the 'userpage' and ask the user to login there
        //i've not added the code for this right now because i've to check with other pages too lol 
    }else{
        changePage("playerPage");
        changeUserName();
    };*/
};

function changePage(page){
    if(Settings.currentPage !== page){
        const pageHeader = page.replace("Page", "Nav");
        Settings.currentPage!==""?document.getElementById(Settings.currentPage).style.display = "none":null;
        Settings.currentPageHeader!==""?document.getElementById(Settings.currentPageHeader).style.color = "#fff":null;

        document.getElementById(page).style.display = "block";
        document.getElementById(pageHeader).style.color = "#00B2FF";

        Settings.currentPage = page;
        Settings.currentPageHeader = pageHeader;
    }else{return};
};

function changePageMan(page){
    if(Settings.currentPage == page){
        return
    }else{
        if(!User.signed_in){
            alert("You're not logged in, to log in/sign up just follow the steps given on this page, in order to access the website.");
        }else{
            const pageHeader = page.replace("Page", "Nav");

            Settings.currentPage!==""?document.getElementById(Settings.currentPage).style.display = "none":null;
            Settings.currentPageHeader!==""?document.getElementById(Settings.currentPageHeader).style.color = "#fff":null;

            document.getElementById(page).style.display = "block";
            document.getElementById(pageHeader).style.color = "#00B2FF";

            Settings.currentPage = page;
            Settings.currentPageHeader = pageHeader;
        };
    };
};

function checkUserPageType(){
    if(User.signed_in){
        //making the div visible
        document.getElementById("loginedUser").style.display = "block";
    }else{
        //making the div visible
        document.getElementById("nonLoginedUser").style.display = "block";
    };
};

function changeUserName(){
    if(User.signed_in){
        console.log("why isn't this working");
        document.getElementById("userNav").innerHTML = User.name;
    };
};