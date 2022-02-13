var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Module Imports
import { BuildSite } from "./modules/buildSite.js";
import { FormCheck } from "./modules/formCheck.js";
import { ServerCommunication } from "./modules/serverCommunication.js";
// Grab HTML-Elements
const submitButton = document.getElementById("submit");
const loginForm = document.getElementById("form");
const responseDiv = document.getElementById("response");
export class Main {
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    // Add Event Listener
    addEventListener() {
        submitButton.addEventListener("click", this.tryLogin);
    }
    // Login Check --> If sucessful --> start building HTML Page
    tryLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            // get User Input
            const formData = new FormData(loginForm);
            const formParams = new URLSearchParams(formData);
            // parse User Input into Object
            const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
            // check for filled Form fields and valid login information
            if (FormCheck.checkIfFormIsFilled(formData, 2) == true) {
                usableData.serverId = "Login";
                if ((yield ServerCommunication.checkLoginOrAdminComm(usableData)) == true) {
                    BuildSite.startBuilding(usableData);
                }
                else
                    responseDiv.innerText = "Login failed. Please try again!";
            }
            else
                responseDiv.innerText = "Please fill out all required fields";
        });
    }
}
const main = new Main();
main.addEventListener();
//# sourceMappingURL=main.js.map