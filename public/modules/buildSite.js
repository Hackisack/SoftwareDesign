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
import { checkIfFormIsFilled, checkIfOrderIsValid } from "./formCheck.js";
import * as htmlCodeStrings from "./htmlCodeStrings.js";
import { addCustomerComm, addProductComm, addUserComm, allAdminDataComm, allProductDataComm, changeAdminPrivilegesComm, checkLoginOrAdminComm, searchCustomerComm, searchOrderComm, searchProductComm } from "./serverCommunication.js";
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
    let bttnAddOrder = document.getElementById("createOrder");
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
    if (site == "searchProduct") {
        searchProduct();
    } //generate Form to search for Product !!option to edit product
    if (site == "addCustomer") {
        addCustomer();
    } //generate Form to fill with Customerinformation !!check for unique ID
    if (site == "searchCustomer") {
        searchCustomer();
    } //generate Form to search for Customer !!option to edit customer
    if (site == "addOrder") {
        createOrder("one");
    } //generate Form to add Order !!check for unique ID
    if (site == "searchOrder") {
        searchOrder(); //generate Form to search for Order !! option to edit order
    }
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
        changeSite.innerHTML = htmlCodeStrings.tableHeaderUser;
        //Grab HTML Elements after insertion
        let table = document.getElementById("table");
        let username = document.getElementsByClassName("username");
        let privileges = document.getElementsByClassName("privileges");
        let changeButton = document.getElementsByClassName("changeButton");
        //Grab HTML Elements after insertion
        let adminData = JSON.parse(JSON.stringify((yield allAdminDataComm()).replace(/%2B/g, " ")));
        for (let x = 0; x < adminData.length; x++) { //Build all Table Entrys
            table.innerHTML += htmlCodeStrings.tableBodyUser;
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
    changeSite.innerHTML = htmlCodeStrings.createProduct;
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
function searchProduct() {
    //Grab HTML Elements before insertion
    let changeSite = document.getElementById("changeSite");
    //Grab HTML Elements before insertion
    changeSite.innerHTML = htmlCodeStrings.searchProductForm;
    //Grab HTML Elements after insertion
    let form = document.getElementById("form");
    let submit = document.getElementById("submit");
    let response = document.getElementById("response");
    //Grab HTML Elements after insertion  
    submit.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let formData = new FormData(form);
            if (checkIfFormIsFilled(formData, 1) == true) {
                let formParams = new URLSearchParams(formData);
                let usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                let foundProduct = JSON.parse((yield searchProductComm(usableData)).replace(/%2B/g, " "));
                if (foundProduct == null) {
                    response.innerText = "No product found";
                }
                else {
                    changeSite.innerHTML = htmlCodeStrings.tableHeaderProduct;
                    //Grab HTML Elements after insertion
                    let table = document.getElementById("table");
                    //Grab HTML Elements after insertion
                    //Build one table entry
                    table.innerHTML += htmlCodeStrings.tableBodyProduct;
                    //Grab HTML Elements after insertion
                    let id = document.getElementsByClassName("id");
                    let description = document.getElementsByClassName("description");
                    let meDate = document.getElementsByClassName("medate");
                    let price = document.getElementsByClassName("price");
                    let standardDeliveryTime = document.getElementsByClassName("standarddeliverytime");
                    let minBG = document.getElementsByClassName("minbg");
                    let maxBG = document.getElementsByClassName("maxbg");
                    let discountBG = document.getElementsByClassName("discountbg");
                    let discount = document.getElementsByClassName("discount");
                    //Grab HTML Elements after insertion
                    id[0].textContent = foundProduct.ID;
                    description[0].textContent = foundProduct.Description;
                    meDate[0].textContent = foundProduct.MEDate.toString();
                    price[0].textContent = foundProduct.Price.toString() + " €";
                    standardDeliveryTime[0].textContent = foundProduct.StandardDeliveryTime.toString() + " days";
                    minBG[0].textContent = foundProduct.MinBG.toString() + " pieces";
                    maxBG[0].textContent = foundProduct.MaxBG.toString() + " pieces";
                    discountBG[0].textContent = foundProduct.DiscountBG.toString() + " pieces";
                    discount[0].textContent = foundProduct.Discount.toString() + " €";
                }
            }
        });
    });
}
function addCustomer() {
    //Grab HTML Elements before insertion
    let changeSite = document.getElementById("changeSite");
    //Grab HTML Elements before insertion
    changeSite.innerHTML = htmlCodeStrings.createCustomer;
    //Grab HTML Elements after insertion
    let form = document.getElementById("form");
    let submit = document.getElementById("submit");
    let response = document.getElementById("response");
    //Grab HTML Elements after insertion  
    submit.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let formData = new FormData(form);
            if (checkIfFormIsFilled(formData, 4) == true) {
                let formParams = new URLSearchParams(formData);
                let usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                if ((yield addCustomerComm(usableData)) == true) {
                    response.innerText = "Customer added";
                }
                else
                    response.innerText = "ID already in use. Retry with different ID";
            }
        });
    });
}
function searchCustomer() {
    //Grab HTML Elements before insertion
    let changeSite = document.getElementById("changeSite");
    //Grab HTML Elements before insertion
    changeSite.innerHTML = htmlCodeStrings.searchCustomerForm;
    //Grab HTML Elements after insertion
    let form = document.getElementById("form");
    let submit = document.getElementById("submit");
    let response = document.getElementById("response");
    //Grab HTML Elements after insertion  
    submit.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let formData = new FormData(form);
            if (checkIfFormIsFilled(formData, 1) == true) {
                let formParams = new URLSearchParams(formData);
                let usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                let foundCustomer = JSON.parse((yield searchCustomerComm(usableData)).replace(/%2B/g, " "));
                if (foundCustomer == null) {
                    response.innerText = "No Customer found";
                }
                else {
                    changeSite.innerHTML = htmlCodeStrings.tableHeaderCustomer;
                    //Grab HTML Elements after insertion
                    let table = document.getElementById("table");
                    //Grab HTML Elements after insertion
                    //Build one table entry
                    table.innerHTML += htmlCodeStrings.tableBodyCustomer;
                    //Grab HTML Elements after insertion
                    let id = document.getElementsByClassName("id");
                    let name = document.getElementsByClassName("name");
                    let adress = document.getElementsByClassName("adress");
                    let discount = document.getElementsByClassName("discount");
                    //Grab HTML Elements after insertion
                    console.log(foundCustomer.Name);
                    id[0].textContent = foundCustomer.ID;
                    name[0].textContent = foundCustomer.Name;
                    adress[0].textContent = foundCustomer.Adress;
                    discount[0].textContent = foundCustomer.Discount.toString() + " %";
                }
            }
        });
    });
}
function searchOrder() {
    //Grab HTML Elements before insertion
    let changeSite = document.getElementById("changeSite");
    //Grab HTML Elements before insertion
    changeSite.innerHTML = htmlCodeStrings.searchOrderForm;
    //Grab HTML Elements after insertion
    let form = document.getElementById("form");
    let submit = document.getElementById("submit");
    let response = document.getElementById("response");
    //Grab HTML Elements after insertion  
    submit.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let formData = new FormData(form);
            if (checkIfFormIsFilled(formData, 1) == true) {
                let formParams = new URLSearchParams(formData);
                let usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                let foundOrder = JSON.parse((yield searchOrderComm(usableData)).replace(/%2B/g, " "));
                if (foundOrder == null) {
                    response.innerText = "No Order found";
                }
                else {
                    changeSite.innerHTML = htmlCodeStrings.tableHeaderCustomer;
                    //Grab HTML Elements after insertion
                    let table = document.getElementById("table");
                    //Grab HTML Elements after insertion
                    //Build one table entry
                    table.innerHTML += htmlCodeStrings.tableBodyCustomer;
                    //Grab HTML Elements after insertion
                    let id = document.getElementsByClassName("id");
                    let description = document.getElementsByClassName("description");
                    let orderDate = document.getElementsByClassName("orderdate");
                    let deliveryDate = document.getElementsByClassName("deliverydate");
                    let price = document.getElementsByClassName("price");
                    let orderPositions = document.getElementsByClassName("orderpositions");
                    //Grab HTML Elements after insertion
                    id[0].textContent = foundOrder.ID;
                    description[0].textContent = foundOrder.Description;
                    orderDate[0].textContent = foundOrder.OrderDate.toString();
                    deliveryDate[0].textContent = foundOrder.DeliveryDate.toString() + " days";
                    price[0].textContent = foundOrder.Price.toString() + " €";
                    for (let x = 0; foundOrder.OrderPositions.length < x; x++) {
                        orderPositions[0].textContent += "Order Position" + x + ": ";
                        Object.entries(foundOrder.OrderPositions).forEach(([key, value]) => console.log(key, value));
                    }
                }
            }
        });
    });
}
function createOrder(step) {
    return __awaiter(this, void 0, void 0, function* () {
        //Grab HTML Elements before insertion
        let changeSite = document.getElementById("changeSite");
        //Grab HTML Elements before insertion
        if (step == "one") {
            changeSite.innerHTML = htmlCodeStrings.createOrderForm;
            //Grab HTML Elements after insertion
            let form = document.getElementById("form");
            let submit = document.getElementById("submit");
            //Grab HTML Elements after insertion  
            submit.addEventListener("click", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let formData = new FormData(form);
                    if (checkIfFormIsFilled(formData, 3) == true) {
                        let formParams = new URLSearchParams(formData);
                        let usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                        sessionStorage.setItem("savedData", JSON.stringify(usableData));
                        createOrder("two");
                    }
                });
            });
        }
        else if (step == "two") {
            changeSite.innerHTML = htmlCodeStrings.tableHeaderCreateOrder;
            let productData = JSON.parse(JSON.stringify((yield allProductDataComm())).replace(/%2B/g, " "));
            //Grab HTML Elements after insertion
            let table = document.getElementById("table");
            //Grab HTML Elements after insertion
            //Build table entrys
            for (let x = 0; x < productData.length; x++) { //Build all Table Entrys
                table.innerHTML += htmlCodeStrings.tableBodyCreateOrder;
                //Grab HTML Elements after insertion
                let id = document.getElementsByClassName("id");
                let description = document.getElementsByClassName("description");
                let meDate = document.getElementsByClassName("medate");
                let price = document.getElementsByClassName("price");
                let standardDeliveryTime = document.getElementsByClassName("standarddeliverytime");
                let minBG = document.getElementsByClassName("minbg");
                let maxBG = document.getElementsByClassName("maxbg");
                let discountBG = document.getElementsByClassName("discountbg");
                let discount = document.getElementsByClassName("discount");
                //Grab HTML Elements after insertion
                id[x].textContent = productData[x].ID;
                description[x].textContent = productData[x].Description;
                meDate[x].textContent = productData[x].MEDate.toString();
                price[x].textContent = productData[x].Price.toString() + " €";
                standardDeliveryTime[x].textContent = productData[x].StandardDeliveryTime.toString() + " days";
                minBG[x].textContent = productData[x].MinBG.toString() + " pieces";
                maxBG[x].textContent = productData[x].MaxBG.toString() + " pieces";
                discountBG[x].textContent = productData[x].DiscountBG.toString() + " pieces";
                discount[x].textContent = productData[x].Discount.toString() + " €";
            }
            for (let x = 0; x < productData.length; x++) {
                let amount = document.getElementsByClassName("amount");
                let button = document.getElementsByClassName("addButton");
                button[x].addEventListener("click", function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        let formData = new FormData(amount[x]);
                        let formParams = new URLSearchParams(formData);
                        let usableformData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                        if (checkIfFormIsFilled(formData, 1) == true) {
                            if (checkIfOrderIsValid(usableformData, productData, x) == true) {
                                addAmountToOrder(formData);
                            }
                        }
                    });
                });
            }
        }
    });
}
function addAmountToOrder(formData) {
    let savedData = JSON.parse(sessionStorage.getItem("savedData")); //return to Object
}
//# sourceMappingURL=buildSite.js.map