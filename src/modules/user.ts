// Module Imports
import { BuildSite } from "./buildSite.js";
import { FormCheck } from "./formCheck.js";
import { addUserPage, tableBodyUser, tableHeaderUser } from "./htmlCodeStrings.js";
import { AdminData, LoginData } from "./interfaces.js";
import { ServerCommunication } from "./serverCommunication.js";

export class User {
  username: string;
  password: string;
  admin: string;
  serverId: string;

  constructor (username: string, password: string, admin: string, serverId: string) {
    this.username = username;
    this.password = password;
    this.admin = admin;
    this.serverId = serverId;
  }

  // Add new User
  static addUser (): void {
    // Grab HTML Elements before HMTL insertion
    const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");

    // Insert HTML
    changeSite.innerHTML = addUserPage;

    // Grab HTML Elements after HTML insertion
    const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");

    // Add Event Listener to submit Button
    submit.addEventListener("click", async function (): Promise<void> {
      // Get User Input
      const formData: FormData = new FormData(form);
      // Ceck for filled Form and Regex --> if true add User
      if (FormCheck.checkIfFormIsFilled(formData, 3) == true && FormCheck.checkForRegex(formData.get("username").toString(), "username") == true && FormCheck.checkForRegex(formData.get("password").toString(), "password") == true) {
        const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        const usableData: User = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

        if (await ServerCommunication.addUserComm(usableData) == true) {
          response.innerText = "User added";
        }
        else response.innerText = "Username already in use. Retry with different Username";
      }
      else if (FormCheck.checkIfFormIsFilled(formData, 3) == true && FormCheck.checkForRegex(formData.get("username").toString(), "username") == false && FormCheck.checkForRegex(formData.get("password").toString(), "password") == false) {
        response.innerText = "Invalid Username or Password. Username can only consist of alphabetical letters. Password must be between 4 and 8 digits long and include at least one numeric digit.";
      }
    });
  }

  // Change Admin Privileges
  static async changeAdmin (reloadUsableData: LoginData): Promise<void> {
    // Grab HTML Elements before HMTL insertion
    const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");

    // Insert HMTL
    changeSite.innerHTML = tableHeaderUser;

    // Grab HTML Elements after HMTL insertion
    const table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");
    const username: HTMLCollection = document.getElementsByClassName("username");
    const privileges: HTMLCollection = document.getElementsByClassName("privileges");
    const changeButton: HTMLCollection = document.getElementsByClassName("changeButton");

    // Retrieve all Admin Data
    const adminData: AdminData[] = JSON.parse((await ServerCommunication.allAdminDataComm()).replace(/%2B/g, " "));

    // Build table entry for every User
    for (let x: number = 0; x < adminData.length; x++) {
      table.innerHTML += tableBodyUser;

      username[x].textContent = adminData[x].username;
      privileges[x].textContent = adminData[x].admin;
    }

    // Add Event Listener to every Button
    for (let x: number = 0; x < adminData.length; x++) {
      changeButton[x].addEventListener("click", async function (): Promise<void> {
        // change the Privileges --> If changed from true to false --> Reload the Buttons to disable Admin privileges
        if (await ServerCommunication.changeAdminPrivilegesComm(adminData[x].username) == "true") {
          User.changeAdmin(reloadUsableData);
          BuildSite.startBuilding(reloadUsableData, "reload");
        }
        else BuildSite.startBuilding(reloadUsableData);
      });
    }
  }
};
