var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//module imports
import { checkIfFormIsFilled } from "./formCheck.js";
import * as htmlCodeStrings from "./htmlCodeStrings.js";
import { addProductComm, addUserComm, allAdminDataComm, changeAdminPrivilegesComm, checkLoginOrAdminComm } from "./serverCommunication.js";
//Grab HTML-Elements
let body = document.getElementById("body");
//variables
let adminPrivileges = false;
let reloadUsableData;
export function startBuilding(usableData, reload) {
    return __awaiter(this, void 0, void 0, function* () {
        reloadUsableData = usableData;
        usableData.ServerId = "BuildSite";
        if ((yield checkLoginOrAdminComm(usableData)) == true) {
            adminPrivileges = true;
        }
        else
            adminPrivileges = false;
        if (reload != undefined) {
            insertHtml(usableData, reload);
        }
        else
            insertHtml(usableData);
    });
}
function insertHtml(usableData, reload) {
    body.innerHTML = htmlCodeStrings.loggedInPage;
    if (reload != undefined) {
        changeAdmin();
    }
    //Grab HTML Elements after insertion
    let userName = document.getElementById("userName");
    //Grab HTML Elements after insertion
    userName.innerText += " " + usableData.Username;
    adminButtons();
}
function adminButtons() {
    //Grab HTML Elements after insertion
    let bttnChangeAdmin = document.getElementById("changeAdmin");
    let bttnAddUser = document.getElementById("addUser");
    let bttnAddProduct = document.getElementById("addProduct");
    //Grab HTML Elements after insertion
    if (adminPrivileges == false) {
        bttnChangeAdmin.outerHTML = "";
        bttnAddProduct.outerHTML = "";
        bttnAddUser.outerHTML = "";
    }
    addEventListeners();
}
function addEventListeners() {
    //Grab HTML Elements after insertion
    let bttnChangeAdmin = document.getElementById("changeAdmin");
    let bttnAddUser = document.getElementById("addUser");
    let bttnAddProduct = document.getElementById("addProduct");
    let bttnSearchProduct = document.getElementById("searchProduct");
    let bttnAddCustomer = document.getElementById("addCustomer");
    let bttnSearchOrder = document.getElementById("searchOrder");
    let bttnAddOrder = document.getElementById("addOrder");
    let bttnSearchCustomer = document.getElementById("searchCustomer");
    //Grab HTML Elements after insertion
    if (adminPrivileges == true) {
        bttnChangeAdmin.addEventListener("click", function () { changeHtml("changeAdmin"); });
        bttnAddUser.addEventListener("click", function () { changeHtml("addUser"); });
        bttnAddProduct.addEventListener("click", function () { changeHtml("addProduct"); });
    }
    bttnSearchProduct.addEventListener("click", function () { changeHtml("searchProduct"); });
    bttnAddCustomer.addEventListener("click", function () { changeHtml("addCustomer"); });
    bttnSearchOrder.addEventListener("click", function () { changeHtml("searchOrder"); });
    bttnAddOrder.addEventListener("click", function () { changeHtml("addOrder"); });
    bttnSearchCustomer.addEventListener("click", function () { changeHtml("searchCustomer"); });
}
function changeHtml(site) {
    if (site == "addUser") {
        addUser();
    } //generate Form to add new User !!check for already existing Username
    if (site == "changeAdmin") {
        changeAdmin();
    } //retrieve all User and generate Buttons to set them as Admin
    if (site == "addProduct") {
        newProduct();
    } //generate Form to add new Product !!check for duplicate ID and mandatory fields to fill
    if (site == "searchProduct") { } //generate Form to search for Product !!option to edit product
    if (site == "addCustomer") { } //generate Form to fill with Customerinformation !!check for unique ID
    if (site == "searchCustomer") { } //generate Form to search for Customer !!option to edit customer
    if (site == "addOrder") { } //generate Form to add Order !!check for unique ID
    if (site == "searchOrder") { } //generate Form to search for Order !! option to edit order
}
function addUser() {
    //Grab HTML Elements before insertion
    let changeSite = document.getElementById("changeSite");
    //Grab HTML Elements before insertion
    changeSite.innerHTML = htmlCodeStrings.addUserPage;
    //Grab HTML Elements after insertion
    let form = document.getElementById("form");
    let submit = document.getElementById("submit");
    let response = document.getElementById("response");
    //Grab HTML Elements after insertion  
    submit.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let formData = new FormData(form);
            if (checkIfFormIsFilled(formData, 3) == true) {
                let formParams = new URLSearchParams(formData);
                let usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                if ((yield addUserComm(usableData)) == true) {
                    response.innerText = "User added";
                }
                else
                    response.innerText = "Username already in use. Retry with different Username";
            }
        });
    });
}
function changeAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        //Grab HTML Elements before insertion
        let changeSite = document.getElementById("changeSite");
        //Grab HTML Elements before insertion
        changeSite.innerHTML = htmlCodeStrings.tableHeader;
        //Grab HTML Elements after insertion
        let table = document.getElementById("table");
        let username = document.getElementsByClassName("username");
        let privileges = document.getElementsByClassName("privileges");
        let changeButton = document.getElementsByClassName("changeButton");
        //Grab HTML Elements after insertion
        let adminData = JSON.parse(JSON.stringify(yield allAdminDataComm()));
        for (let x = 0; x < adminData.length; x++) { //Build all Table Entrys
            table.innerHTML += htmlCodeStrings.tableBody;
            username[x].textContent = adminData[x].Username;
            privileges[x].textContent = adminData[x].Admin;
        }
        for (let x = 0; x < adminData.length; x++) {
            changeButton[x].addEventListener("click", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    if ((yield changeAdminPrivilegesComm(adminData[x].Username)) == "true") {
                        changeAdmin();
                        startBuilding(reloadUsableData, "reload");
                    }
                    else
                        startBuilding(reloadUsableData);
                });
            });
        }
    });
}
function newProduct() {
    //Grab HTML Elements before insertion
    let changeSite = document.getElementById("changeSite");
    //Grab HTML Elements before insertion
    changeSite.innerHTML = htmlCodeStrings.product;
    //Grab HTML Elements after insertion
    let form = document.getElementById("form");
    let submit = document.getElementById("submit");
    let response = document.getElementById("response");
    //Grab HTML Elements after insertion  
    submit.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let formData = new FormData(form);
            if (checkIfFormIsFilled(formData, 9) == true) {
                let formParams = new URLSearchParams(formData);
                let usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                if ((yield addProductComm(usableData)) == true) {
                    response.innerText = "Product added";
                }
                else
                    response.innerText = "ID already in use. Retry with different ID";
            }
        });
    });
}
//# sourceMappingURL=buildSite.js.map