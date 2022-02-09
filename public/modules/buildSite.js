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
import { addCustomerComm, addProductComm, addUserComm, allAdminDataComm, allCustomerDataComm, allProductDataComm, changeAdminPrivilegesComm, checkLoginOrAdminComm, createOrderComm, searchCustomerComm, searchOrderComm, searchProductComm } from "./serverCommunication.js";
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
        let adminData = JSON.parse(JSON.stringify((yield allAdminDataComm())).replace(/%2B/g, " "));
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
                let foundOrders = JSON.parse((yield searchOrderComm(usableData)).replace(/%2B/g, " "));
                if (foundOrders.length == 0) {
                    response.innerText = "No Order found";
                }
                else {
                    changeSite.innerHTML = htmlCodeStrings.tableHeaderOrder;
                    //Grab HTML Elements after insertion
                    let table = document.getElementById("table");
                    //Grab HTML Elements after insertion
                    //Build one or more table entrys
                    for (let x = 0; x < foundOrders.length; x++) {
                        table.innerHTML += htmlCodeStrings.tableBodyOrder;
                        //Grab HTML Elements after insertion
                        let id = document.getElementsByClassName("id");
                        let description = document.getElementsByClassName("description");
                        let orderDate = document.getElementsByClassName("orderdate");
                        let deliveryDate = document.getElementsByClassName("deliverydate");
                        let price = document.getElementsByClassName("price");
                        let orderPositions = document.getElementsByClassName("orderpositions");
                        //Grab HTML Elements after insertion
                        //Fix Parse Error with Date from Database 
                        let newOrderDate = new Date(foundOrders[x].OrderDate);
                        let newDeliveryDate = new Date(foundOrders[x].DeliveryDate);
                        id[x].textContent = foundOrders[x].ID;
                        description[x].textContent = foundOrders[x].Description;
                        orderDate[x].textContent = "Order Date: " + (newOrderDate.getMonth() + 1) + "." + newOrderDate.getDate().toString() + "." + newOrderDate.getFullYear().toString();
                        deliveryDate[x].textContent = "Delivery Date: " + (newDeliveryDate.getMonth() + 1) + "." + newDeliveryDate.getDate().toString() + "." + newDeliveryDate.getFullYear().toString();
                        price[x].textContent = foundOrders[x].Price.toString() + " €";
                        for (let y = 0; y < foundOrders[x].OrderPositions.length; y++) {
                            orderPositions[x].textContent += " Order Position " + (y + 1) + ": " + foundOrders[x].OrderPositions[y][0].Description + " x " + foundOrders[x].OrderPositions[y][1].Amount + ", ";
                        }
                    }
                }
            }
        });
    });
}
function createOrder(step, order, customerName, customerDiscount) {
    return __awaiter(this, void 0, void 0, function* () {
        //Grab HTML Elements before insertion
        let changeSite = document.getElementById("changeSite");
        //Grab HTML Elements before insertion
        //Reset sessionStorage
        sessionStorage.clear();
        if (step == "one") {
            changeSite.innerHTML = htmlCodeStrings.createOrderForm;
            //Grab HTML Elements after insertion
            let form = document.getElementById("form");
            let submit = document.getElementById("submit");
            let customer = document.getElementById("customer");
            //Grab HTML Elements after insertion  
            let allCustomer = JSON.parse((yield allCustomerDataComm()).replace(/%2B/g, " "));
            for (let x = 0; x < allCustomer.length; x++) {
                customer.innerHTML += "<option value=" + x + "  >" + allCustomer[x].ID + ",  " + allCustomer[x].Name + "</option>";
            }
            submit.addEventListener("click", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let formData = new FormData(form);
                    if (checkIfFormIsFilled(formData, 2) == true) {
                        let order = {
                            ID: "",
                            Customer: "",
                            Description: "",
                            OrderDate: new Date(),
                            DeliveryDate: new Date,
                            Price: 0,
                            ServerId: ""
                        };
                        let formParams = new URLSearchParams(formData);
                        let usableformData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                        order.ID = usableformData.ID;
                        order.Customer = usableformData.Customer;
                        order.Description = usableformData.Description;
                        order.Customer = allCustomer[customer.selectedIndex].ID;
                        createOrder("two", order, allCustomer[customer.selectedIndex].Name, allCustomer[customer.selectedIndex].Discount);
                    }
                });
            });
        }
        else if (step == "two") {
            changeSite.innerHTML = htmlCodeStrings.tableHeaderCreateOrder;
            let submit = document.getElementById("submit");
            submit.addEventListener("click", function () {
                if (order.OrderPositions != undefined) {
                    confirmOrderOverview(order, customerName, customerDiscount);
                }
                else {
                    let response = document.getElementById("response");
                    response.innerText = "Please add at least one Position to your Order";
                }
            });
            let productData = yield allProductDataComm();
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
                discount[x].textContent = productData[x].Discount.toString() + " %";
            }
            for (let x = 0; x < productData.length; x++) {
                let amount = document.getElementsByClassName("amount");
                let button = document.getElementsByClassName("addButton");
                let amountField = document.getElementsByClassName("amountField");
                let response = document.getElementsByClassName("response");
                button[x].addEventListener("click", function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        let formData = new FormData(amount[x]);
                        let formParams = new URLSearchParams(formData);
                        let usableformData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                        if (checkIfFormIsFilled(formData, 1) == true) {
                            if (checkIfOrderIsValid(usableformData, productData, x) == true) {
                                response[x].style.color = "black";
                                amountField[x].value = "";
                                response[x].innerText = "Sucessful added";
                                order = addAmountToOrder(usableformData, productData, x, order);
                            }
                            else {
                                response[x].style.color = "red";
                                response[x].style.fontSize = "10pt";
                                amountField[x].value = "";
                                response[x].innerText = "Invalid Amount or ME-Date";
                            }
                        }
                    });
                });
            }
        }
    });
}
function addAmountToOrder(amountData, productData, productNumber, order) {
    if (order.OrderPositions == undefined) {
        order.OrderPositions = [[productData[productNumber], amountData]];
    }
    else {
        order.OrderPositions.push([productData[productNumber], amountData]);
    }
    return order;
}
function confirmOrderOverview(order, customerName, customerDiscount) {
    //Grab HTML Elements before insertion
    let changeSite = document.getElementById("changeSite");
    //Grab HTML Elements before insertion
    changeSite.innerHTML = htmlCodeStrings.HeaderConfirmOrder;
    //Grab HTML Elements after insertion
    let confirmBttn = document.getElementById("confirm");
    let orderId = document.getElementById("orderId");
    let orderCustomer = document.getElementById("orderCustomer");
    let orderDescription = document.getElementById("description");
    let orderDelDate = document.getElementById("deliveryDate");
    let orderPrice = document.getElementById("price");
    let orderPositions = document.getElementById("orderPositions");
    //Grab HTML Elements after insertion
    confirmBttn.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield createOrderComm(order)) == true) {
                changeSite.innerHTML = "Order added";
            }
            else {
                changeSite.innerHTML = "ID already in use";
            }
        });
    });
    //calculate latest StandarDeliverDate
    let highestDelivery = 0;
    for (let x = 0; x < order.OrderPositions.length; x++) {
        if (order.OrderPositions[x][0].StandardDeliveryTime >= highestDelivery) {
            highestDelivery = order.OrderPositions[x][0].StandardDeliveryTime;
        }
    }
    orderId.innerText = "Order ID: " + order.ID;
    orderCustomer.innerText = "Customer: " + customerName.replace("+", " ");
    orderDescription.innerText = "Order Description: " + order.Description;
    let time = +highestDelivery;
    order.DeliveryDate.setDate(order.DeliveryDate.getDate() + time);
    orderDelDate.innerText = "Delivery Date: " + (order.DeliveryDate.getMonth() + 1) + "." + order.DeliveryDate.getDate().toString() + "." + order.DeliveryDate.getFullYear().toString();
    console.log(customerDiscount);
    //Calculate price
    let fullPrice = 0;
    for (let x = 0; x < order.OrderPositions.length; x++) {
        let price = +order.OrderPositions[x][0].Price;
        let amount = +order.OrderPositions[x][1].Amount;
        let discount = +order.OrderPositions[x][0].Discount;
        if (order.OrderPositions[x][0].DiscountBG <= order.OrderPositions[x][1].Amount) {
            fullPrice += (price * amount);
            fullPrice = fullPrice - (fullPrice * (discount / 100));
        }
        else {
            fullPrice += price * amount;
        }
        ;
    }
    console.log(fullPrice);
    order.Price = fullPrice - (fullPrice * (customerDiscount / 100));
    orderPrice.innerText = "Price: " + order.Price.toString() + "€";
    for (let x = 0; x < order.OrderPositions.length; x++) {
        orderPositions.innerText += "Description: " + order.OrderPositions[x][0].Description + "," + " Amount: " + order.OrderPositions[x][1].Amount;
        orderPositions.innerHTML += "<br>";
    }
}
//# sourceMappingURL=buildSite.js.map