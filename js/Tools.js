export class Modal{
    static create(){
        let popUpBox = document.getElementById('popUpBox');
        let boxDiv = document.createElement("div");

        popUpBox.style.display = "block";
        boxDiv.id = "box";

        popUpBox.appendChild(boxDiv);
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
    };

    static createDropDownList(){
        //gonna work on this tomorrow
        //freaking tired right now
    };

    static createDoneButton(buttonMessage = "Done", valueCheckId, altMessage = "Please Select your value!!", callbackFunction){
        var submitDiv = document.createElement("div");
        submitDiv.className = "submitButtonModalDiv";

        var submitButton = document.createElement("button");
        submitButton.className = "ModalButton";
        submitButton.innerHTML = buttonMessage;

        submitButton.addEventListener("click", () => {
            //getting values
            const selectListValue = document.getElementById(valueCheckId).value;
            
            if(selectListValue !== ""){
                //closing the modal!!
                this.remove();

                //calling the callback function defined by the user
                callbackFunction(selectListValue);
            }else{
                return alert(altMessage);
            };
        });
        submitDiv.appendChild(submitButton);
        document.getElementById("box").appendChild(submitDiv);
    };

    static remove(){
        document.getElementById("popUpBox").style.display = "none";
        document.getElementById("box").remove();
    };
};