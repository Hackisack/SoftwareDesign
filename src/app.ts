//Module Imports
import { startBuilding } from "./modules/buildSite.js";
import { checkIfFormIsFilled } from "./modules/formCheck.js";
import { LoginData } from "./modules/interfaces.js";
import * as ServerCommunication from "./modules/serverCommunication.js";

//Grab HTML-Elements
let submitButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("submit");
let loginForm: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
let responseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("response");

//Add EventListeners
submitButton.addEventListener("click", tryLogin );

//Code
async function tryLogin(): Promise<void> {

let formData: FormData = new FormData(loginForm);
let formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
let usableData: LoginData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

if (checkIfFormIsFilled(formData, 2) == true) {
       
       usableData.ServerId = "Login";

       if (await ServerCommunication.checkLoginOrAdminComm(usableData) == true) {
              
               startBuilding(usableData);

        }
       else responseDiv.innerText = "Login failed. Please try again!";

   }
else responseDiv.innerText = "Please fill out all required fields";
}



