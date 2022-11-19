export class Modal{
    static new(overwrite){
        if(this.active && overwrite) this.remove();
        else if(this.active) return false;

        let popUpBox = document.getElementById('popUpBox');
        let boxDiv = document.createElement("div");
        
        popUpBox.style.display = "block";
        boxDiv.id = "box";
        
        popUpBox.appendChild(boxDiv);
        this.active = true;
    };

    static setHeaderMessage(msg){
        let header = document.createElement("h2");
        header.innerHTML = msg;

        document.getElementById("box").appendChild(header);
    };

    static createInputBox(){
        let inputBox = document.createElement("input");
        inputBox.id = "modalInputBox";
        
        document.getElementById("box").appendChild(inputBox);
        inputBox.focus();
    };

    static createDropDownList(expanded, options){
        let select = document.createElement("select");
        select.id = "modalDropDownList";
        select.class = "modalDropDownList";

        if(!expanded) select.size = Object.keys(options).length;

        //gotta change this later, currently just reading for JSON
        for(var elem in options){
            var option = document.createElement("option");
            option.value = elem;
            option.innerHTML = options[elem].name;

            select.appendChild(option);
        };

        document.getElementById("box").appendChild(select);
    };

    static createDoneButton(buttonMessage = "Done", valueCheckId, altMessage = "Please Select your value!!", keyboardBool = true, callbackFunction){
        var submitDiv = document.createElement("div");
        submitDiv.className = "submitButtonModalDiv";

        var submitButton = document.createElement("button");
        submitButton.className = "ModalButton";
        submitButton.innerHTML = buttonMessage;

        let removeFunction = () => {this.remove()};

        function handleSubmition(){
            //getting values
            const selectListValue = document.getElementById(valueCheckId).value;
            
            if(selectListValue !== ""){
                //closing the modal!!
                removeFunction();

                //calling the callback function defined by the user
                
                callbackFunction(selectListValue);
            }else{
                return alert(altMessage);
            };
        };

        submitButton.addEventListener("click", () => {handleSubmition()});

        submitDiv.appendChild(submitButton);
        document.getElementById("box").appendChild(submitDiv);

        //adding event listener to input box
        if(keyboardBool){
            document.getElementById(valueCheckId).addEventListener("keydown", (ev) => {
                if(ev.key == "Enter") handleSubmition();
            });
        };
    };

    static createCloseButton(){        
        let exitButton = document.createElement("button");
        
        exitButton.className = "ModalButton";
        exitButton.innerHTML = "X";
        exitButton.addEventListener("click", () => {this.remove()});
        
        document.getElementById("box").appendChild(exitButton);
    };

    static remove(){
        document.getElementById("popUpBox").style.display = "none";
        document.getElementById("box").remove();

        this.active = false;
    };
};

/*export class BottomMessage{
    
}*/