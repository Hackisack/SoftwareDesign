//module imports
import { checkIfFormIsFilled } from "./formCheck.js";
import * as htmlCodeStrings from "./htmlCodeStrings.js";
import { AdminData, LoginData, Product, UserData } from "./interfaces.js";
import { addProductComm, addUserComm, allAdminDataComm, changeAdminPrivilegesComm, checkLoginOrAdminComm} from "./serverCommunication.js";

//Grab HTML-Elements
let body: HTMLElement = <HTMLElement>document.getElementById("body");

//variables
let adminPrivileges: boolean = false;
let reloadUsableData: LoginData;

export async function startBuilding(usableData: LoginData, reload?: string): Promise<void> {
reloadUsableData = usableData;
usableData.ServerId = "BuildSite";

if (await checkLoginOrAdminComm(usableData) == true) {adminPrivileges = true; }
else adminPrivileges = false;

if (reload != undefined) {insertHtml(usableData, reload); } 
else insertHtml(usableData);

}


function insertHtml(usableData: LoginData, reload?: string): void {

body.innerHTML = htmlCodeStrings.loggedInPage;

if (reload != undefined) { changeAdmin(); }

//Grab HTML Elements after insertion
let userName: HTMLElement = <HTMLElement>document.getElementById("userName");
//Grab HTML Elements after insertion

userName.innerText += " " + usableData.Username;

adminButtons();

}


function adminButtons(): void {

//Grab HTML Elements after insertion
let bttnChangeAdmin: HTMLButtonElement = <HTMLButtonElement>document.getElementById("changeAdmin");
let bttnAddUser: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addUser");
let bttnAddProduct: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addProduct");
//Grab HTML Elements after insertion


if (adminPrivileges == false) {

bttnChangeAdmin.outerHTML = "";
bttnAddProduct.outerHTML = "";
bttnAddUser.outerHTML = "";

}

addEventListeners();

}


function addEventListeners(): void {

//Grab HTML Elements after insertion
let bttnChangeAdmin: HTMLButtonElement = <HTMLButtonElement>document.getElementById("changeAdmin");
let bttnAddUser: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addUser");
let bttnAddProduct: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addProduct");
let bttnSearchProduct: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchProduct");
let bttnAddCustomer: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addCustomer");
let bttnSearchOrder: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchOrder");
let bttnAddOrder: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addOrder");
let bttnSearchCustomer: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchCustomer");
//Grab HTML Elements after insertion

if (adminPrivileges == true) {
bttnChangeAdmin.addEventListener("click", function (): void {changeHtml("changeAdmin"); });
bttnAddUser.addEventListener("click", function (): void {changeHtml("addUser"); });
bttnAddProduct.addEventListener("click", function (): void {changeHtml("addProduct"); });
}

bttnSearchProduct.addEventListener("click", function (): void {changeHtml("searchProduct"); });
bttnAddCustomer.addEventListener("click", function (): void {changeHtml("addCustomer"); });
bttnSearchOrder.addEventListener("click", function (): void {changeHtml("searchOrder"); });
bttnAddOrder.addEventListener("click", function (): void {changeHtml("addOrder"); });
bttnSearchCustomer.addEventListener("click", function (): void {changeHtml("searchCustomer"); });


}


function changeHtml(site: string): void {

if (site == "addUser") {addUser(); } //generate Form to add new User !!check for already existing Username
if (site == "changeAdmin") {changeAdmin(); } //retrieve all User and generate Buttons to set them as Admin
if (site == "addProduct") {newProduct(); } //generate Form to add new Product !!check for duplicate ID and mandatory fields to fill
if (site == "searchProduct") {} //generate Form to search for Product !!option to edit product
if (site == "addCustomer") {} //generate Form to fill with Customerinformation !!check for unique ID
if (site == "searchCustomer") {} //generate Form to search for Customer !!option to edit customer
if (site == "addOrder") {} //generate Form to add Order !!check for unique ID
if (site == "searchOrder") {} //generate Form to search for Order !! option to edit order

}


function addUser(): void {
//Grab HTML Elements before insertion
let changeSite: HTMLDivElement = <HTMLDivElement> document.getElementById("changeSite");
//Grab HTML Elements before insertion

changeSite.innerHTML = htmlCodeStrings.addUserPage;

//Grab HTML Elements after insertion
let form: HTMLFormElement = <HTMLFormElement> document.getElementById("form");
let submit: HTMLButtonElement = <HTMLButtonElement> document.getElementById("submit");
let response: HTMLButtonElement = <HTMLButtonElement> document.getElementById("response");
//Grab HTML Elements after insertion  

submit.addEventListener("click" , async function (): Promise<void> {
    
                                                        let formData: FormData = new FormData(form);   
                                                        if (checkIfFormIsFilled(formData, 3) == true) {
                                                            let formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
                                                            let usableData: UserData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                                                            
                                                            if (await addUserComm(usableData) == true) {

                                                                response.innerText = "User added";

                                                            }
                                                            else response.innerText = "Username already in use. Retry with different Username";
                                                            
                                                        }


});

}

async function changeAdmin(): Promise<void> {
//Grab HTML Elements before insertion
let changeSite: HTMLDivElement = <HTMLDivElement> document.getElementById("changeSite");
//Grab HTML Elements before insertion

changeSite.innerHTML = htmlCodeStrings.tableHeader;

//Grab HTML Elements after insertion
let table: HTMLDivElement = <HTMLDivElement> document.getElementById("table");
let username: HTMLCollection = document.getElementsByClassName("username");
let privileges: HTMLCollection = document.getElementsByClassName("privileges");
let changeButton: HTMLCollection = document.getElementsByClassName("changeButton");
//Grab HTML Elements after insertion
    
let adminData: AdminData[] = JSON.parse(JSON.stringify(await allAdminDataComm()));

for (let x: number = 0; x < adminData.length; x++) { //Build all Table Entrys

    table.innerHTML += htmlCodeStrings.tableBody;

    username[x].textContent = adminData[x].Username;
    privileges[x].textContent = adminData[x].Admin;
   
    

}

for (let x: number = 0; x < adminData.length; x++) {

changeButton[x].addEventListener("click", async function (): Promise<void> { 
        
    if (await changeAdminPrivilegesComm(adminData[x].Username)  == "true") {

     changeAdmin();
     startBuilding(reloadUsableData, "reload");

    }
    else startBuilding(reloadUsableData);
 
 
 
 });
}
}


function newProduct(): void {
    //Grab HTML Elements before insertion
    let changeSite: HTMLDivElement = <HTMLDivElement> document.getElementById("changeSite");
    //Grab HTML Elements before insertion
        
    changeSite.innerHTML = htmlCodeStrings.product;
        
    //Grab HTML Elements after insertion
    let form: HTMLFormElement = <HTMLFormElement> document.getElementById("form");
    let submit: HTMLButtonElement = <HTMLButtonElement> document.getElementById("submit");
    let response: HTMLButtonElement = <HTMLButtonElement> document.getElementById("response");
    //Grab HTML Elements after insertion  
        
    submit.addEventListener("click" , async function (): Promise<void> {
            
                                                                let formData: FormData = new FormData(form);
                                                               
                                                                if (checkIfFormIsFilled(formData, 9) == true) {
                                                                   
                                                                    let formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
                                                                    let usableData: Product = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                                                                    
                                                                    if (await addProductComm(usableData) == true) {
        
                                                                        response.innerText = "Product added";
        
                                                                    }
                                                                    else response.innerText = "ID already in use. Retry with different ID";
                                                                    
                                                                }
        
        
        });
        
        }
