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
        let header = document.createElement("h1");
        header.innerHTML = msg;

        document.getElementById("box").appendChild(header);
    };

    static createInputBox(){
        let inputBox = document.createElement("input");
        inputBox.id = "modalInputBox";
        inputBox.autocomplete = "off";
        
        document.getElementById("box").appendChild(inputBox);
        inputBox.focus();
    };

    static createMultipleInputBox(...headerMessages){
        for(var i = 0; i<=(headerMessages.length-1); i++){
            let inputBox = document.createElement("input");
            inputBox.id = `modalInputBox${i}`;
            inputBox.className = "modalInputBox";

            let h3_ = document.createElement("h3");
            h3_.id = `modalHeaderMessage${i}`;
            h3_.className = "modalHeaderMessage";
            h3_.innerHTML = headerMessages[i];

            let box = document.getElementById("box");
            box.appendChild(h3_);
            box.appendChild(inputBox);
        };
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
            if(Array.isArray(valueCheckId)){
                //const knownMethods = ["input", "dropDown"];
                const values = [];
                let check = false;

                Array.from(valueCheckId).forEach((elem) => {
                    let count = elem.includes("input")?elem.replace("input*", ""):elem.replace("dropDown*", "");

                    for(var i = 0; i<count; i++){
                        let inputValue = document.getElementById((elem.includes("input")?`modalInputBox${i}`:`modalDropDownList${i}`)).value;
                        
                        if(inputValue !== ""){
                            values.push(inputValue);
                        }else{
                            return alert("Please enter all the values!");
                        };
                    };

                    check = true;
                });

                if(check) callbackFunction(values);
            }else{

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