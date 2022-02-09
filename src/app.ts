/* eslint-disable eqeqeq */
// Module Imports
import { startBuilding } from "./modules/buildSite.js";
import { checkIfFormIsFilled } from "./modules/formCheck.js";
import { LoginData } from "./modules/interfaces.js";
import * as ServerCommunication from "./modules/serverCommunication.js";

// Grab HTML-Elements
const submitButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("submit");
const loginForm: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
const responseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("response");

// Add EventListeners
submitButton.addEventListener("click", tryLogin);

// Code
async function tryLogin (): Promise<void> {
  const formData: FormData = new FormData(loginForm);
  const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
  const usableData: LoginData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

  if (checkIfFormIsFilled(formData, 2) == true) {
    usableData.ServerId = "Login";

    if (await ServerCommunication.checkLoginOrAdminComm(usableData) == true) {
      startBuilding(usableData);
    }
    else responseDiv.innerText = "Login failed. Please try again!";
  }
  else responseDiv.innerText = "Please fill out all required fields";
}
