var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { communication } from "../app.js";
import { BuildSite } from "./buildSite.js";
import { FormCheck } from "./formCheck.js";
import { addUserPage, tableBodyUser, tableHeaderUser } from "./htmlCodeStrings.js";
export class User {
    constructor(username, password, admin, serverId) {
        this.username = username;
        this.password = password;
        this.admin = admin;
        this.serverId = serverId;
    }
    // Add new User
    static addUser() {
        // Grab HTML Elements before HMTL insertion
        const changeSite = document.getElementById("changeSite");
        // Insert HTML
        changeSite.innerHTML = addUserPage;
        // Grab HTML Elements after HTML insertion
        const form = document.getElementById("form");
        const submit = document.getElementById("submit");
        const response = document.getElementById("response");
        // Add Event Listener to submit Button
        submit.addEventListener("click", function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Get User Input
                const formData = new FormData(form);
                // Ceck for filled Form and Regex --> if true add User
                if (FormCheck.checkIfFormIsFilled(formData, 3) == true && FormCheck.checkForRegex(formData, "usernameAndPassword") == true) {
                    const formParams = new URLSearchParams(formData);
                    const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                    if ((yield communication.addUserComm(usableData)) == true) {
                        response.innerText = "User added";
                    }
                    else
                        response.innerText = "Username already in use. Retry with different Username";
                }
                else if (FormCheck.checkIfFormIsFilled(formData, 3) == true && FormCheck.checkForRegex(formData, "usernameAndPassword") == false) {
                    response.innerText = "Invalid Username or Password. Username can only consist of alphabetical letters. Password must be between 4 and 8 digits long and include at least one numeric digit.";
                }
            });
        });
    }
    // Change Admin Privileges
    static changeAdmin(reloadUsableData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Grab HTML Elements before HMTL insertion
            const changeSite = document.getElementById("changeSite");
            // Insert HMTL
            changeSite.innerHTML = tableHeaderUser;
            // Grab HTML Elements after HMTL insertion
            const table = document.getElementById("table");
            const username = document.getElementsByClassName("username");
            const privileges = document.getElementsByClassName("privileges");
            const changeButton = document.getElementsByClassName("changeButton");
            // Retrieve all Admin Data
            const adminData = JSON.parse((yield communication.allAdminDataComm()).replace(/%2B/g, " "));
            // Build table entry for every User
            for (let x = 0; x < adminData.length; x++) {
                table.innerHTML += tableBodyUser;
                username[x].textContent = adminData[x].username;
                privileges[x].textContent = adminData[x].admin;
            }
            // Add Event Listener to every Button
            for (let x = 0; x < adminData.length; x++) {
                changeButton[x].addEventListener("click", function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        // change the Privileges --> If changed from true to false --> Reload the Buttons to disable Admin privileges
                        if ((yield communication.changeAdminPrivilegesComm(adminData[x].username)) == "true") {
                            User.changeAdmin(reloadUsableData);
                            BuildSite.startBuilding(reloadUsableData, "reload");
                        }
                        else
                            BuildSite.startBuilding(reloadUsableData);
                    });
                });
            }
        });
    }
}
;
//# sourceMappingURL=user.js.map