var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Module Imports
import { startBuilding } from "./modules/buildSite.js";
import { checkIfFormIsFilled } from "./modules/formCheck.js";
import * as ServerCommunication from "./modules/serverCommunication.js";
//Grab HTML-Elements
let submitButton = document.getElementById("submit");
let loginForm = document.getElementById("form");
let responseDiv = document.getElementById("response");
//Add EventListeners
submitButton.addEventListener("click", tryLogin);
//Code
function tryLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        let formData = new FormData(loginForm);
        let formParams = new URLSearchParams(formData);
        let usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
        if (checkIfFormIsFilled(formData, 2) == true) {
            usableData.ServerId = "Login";
            if ((yield ServerCommunication.checkLoginOrAdminComm(usableData)) == true) {
                startBuilding(usableData);
            }
            else
                responseDiv.innerText = "Login failed. Please try again!";
        }
        else
            responseDiv.innerText = "Please fill out all required fields";
    });
}
//# sourceMappingURL=app.js.map