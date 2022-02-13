// Module Imports
import { BuildSite } from "./modules/buildSite.js";
import { FormCheck } from "./modules/formCheck.js";
import { LoginData } from "./modules/interfaces.js";
import { ServerCommunication } from "./modules/serverCommunication.js";

// Grab HTML-Elements
const submitButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("submit");
const loginForm: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
const responseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("response");

export class Main {
  private static instance: Main;

  public static getInstance (): Main {
    return this.instance || (this.instance = new this());
  }

  // Add Event Listener
  addEventListener (): void {
    submitButton.addEventListener("click", this.tryLogin);
  }

  // Login Check --> If sucessful --> start building HTML Page
  async tryLogin (): Promise<void> {
  // get User Input
    const formData: FormData = new FormData(loginForm);
    const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
    // parse User Input into Object
    const usableData: LoginData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
    // check for filled Form fields and valid login information
    if (FormCheck.checkIfFormIsFilled(formData, 2) == true) {
      usableData.serverId = "Login";

      if (await ServerCommunication.checkLoginOrAdminComm(usableData) == true) {
        BuildSite.startBuilding(usableData);
      }
      else responseDiv.innerText = "Login failed. Please try again!";
    }
    else responseDiv.innerText = "Please fill out all required fields";
  }
}
const main: Main = new Main();
main.addEventListener();
