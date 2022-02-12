var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
// module imports
import { checkIfFormIsFilled, checkIfOrderIsValid } from "./formCheck.js";
import * as htmlCodeStrings from "./htmlCodeStrings.js";
import { addCustomerComm, addProductComm, addUserComm, allAdminDataComm, allCustomerDataComm, allOrderDataComm, allProductDataComm, changeAdminPrivilegesComm, checkForOrderId, checkLoginOrAdminComm, createOrderComm, editCustomerComm, editOrderComm, editProductComm, searchCustomerComm, searchOrderComm, searchProductComm } from "./serverCommunication.js";
// Grab HTML-Elements
const body = document.getElementById("body");
// variables
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
    // Grab HTML Elements after insertion
    const userName = document.getElementById("userName");
    // Grab HTML Elements after insertion
    userName.innerText += " " + usableData.Username;
    adminButtons();
}
function adminButtons() {
    // Grab HTML Elements after insertion
    const bttnChangeAdmin = document.getElementById("changeAdmin");
    const bttnAddUser = document.getElementById("addUser");
    const bttnAddProduct = document.getElementById("addProduct");
    // Grab HTML Elements after insertion
    if (adminPrivileges == false) {
        bttnChangeAdmin.outerHTML = "";
        bttnAddProduct.outerHTML = "";
        bttnAddUser.outerHTML = "";
    }
    addEventListeners();
}
function addEventListeners() {
    // Grab HTML Elements after insertion
    const bttnChangeAdmin = document.getElementById("changeAdmin");
    const bttnAddUser = document.getElementById("addUser");
    const bttnAddProduct = document.getElementById("addProduct");
    const bttnSearchProduct = document.getElementById("searchProduct");
    const bttnAddCustomer = document.getElementById("addCustomer");
    const bttnSearchOrder = document.getElementById("searchOrder");
    const bttnAddOrder = document.getElementById("createOrder");
    const bttnSearchCustomer = document.getElementById("searchCustomer");
    // Grab HTML Elements after insertion
    if (adminPrivileges == true) {
        bttnChangeAdmin.addEventListener("click", function () {
            changeHtml("changeAdmin");
        });
        bttnAddUser.addEventListener("click", function () {
            changeHtml("addUser");
        });
        bttnAddProduct.addEventListener("click", function () {
            changeHtml("addProduct");
        });
    }
    bttnSearchProduct.addEventListener("click", function () {
        changeHtml("searchProduct");
    });
    bttnAddCustomer.addEventListener("click", function () {
        changeHtml("addCustomer");
    });
    bttnSearchOrder.addEventListener("click", function () {
        changeHtml("searchOrder");
    });
    bttnAddOrder.addEventListener("click", function () {
        changeHtml("addOrder");
    });
    bttnSearchCustomer.addEventListener("click", function () {
        changeHtml("searchCustomer");
    });
}
function changeHtml(site) {
    if (site == "addUser") {
        addUser();
    } // generate Form to add new User !!check for already existing Username
    if (site == "changeAdmin") {
        changeAdmin();
    } // retrieve all User and generate Buttons to set them as Admin
    if (site == "addProduct") {
        newProduct();
    } // generate Form to add new Product !!check for duplicate ID and mandatory fields to fill
    if (site == "searchProduct") {
        searchProduct();
    } // generate Form to search for Product !!option to edit product
    if (site == "addCustomer") {
        addCustomer();
    } // generate Form to fill with Customerinformation !!check for unique ID
    if (site == "searchCustomer") {
        searchCustomer();
    } // generate Form to search for Customer !!option to edit customer
    if (site == "addOrder") {
        createOrder("one");
    } // generate Form to add Order !!check for unique ID
    if (site == "searchOrder") {
        searchOrder(); // generate Form to search for Order !! option to edit order
    }
}
function addUser() {
    // Grab HTML Elements before insertion
    const changeSite = document.getElementById("changeSite");
    // Grab HTML Elements before insertion
    changeSite.innerHTML = htmlCodeStrings.addUserPage;
    // Grab HTML Elements after insertion
    const form = document.getElementById("form");
    const submit = document.getElementById("submit");
    const response = document.getElementById("response");
    // Grab HTML Elements after insertion
    submit.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData(form);
            if (checkIfFormIsFilled(formData, 3) == true) {
                const formParams = new URLSearchParams(formData);
                const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
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
        // Grab HTML Elements before insertion
        const changeSite = document.getElementById("changeSite");
        // Grab HTML Elements before insertion
        changeSite.innerHTML = htmlCodeStrings.tableHeaderUser;
        // Grab HTML Elements after insertion
        const table = document.getElementById("table");
        const username = document.getElementsByClassName("username");
        const privileges = document.getElementsByClassName("privileges");
        const changeButton = document.getElementsByClassName("changeButton");
        // Grab HTML Elements after insertion
        const adminData = JSON.parse(JSON.stringify((yield allAdminDataComm())).replace(/%2B/g, " "));
        for (let x = 0; x < adminData.length; x++) { // Build all Table Entrys
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
    // Grab HTML Elements before insertion
    const changeSite = document.getElementById("changeSite");
    // Grab HTML Elements before insertion
    changeSite.innerHTML = htmlCodeStrings.createProduct;
    // Grab HTML Elements after insertion
    const form = document.getElementById("form");
    const submit = document.getElementById("submit");
    const response = document.getElementById("response");
    // Grab HTML Elements after insertion
    submit.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData(form);
            if (checkIfFormIsFilled(formData, 9) == true) {
                const formParams = new URLSearchParams(formData);
                const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
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
    // Grab HTML Elements before insertion
    const changeSite = document.getElementById("changeSite");
    // Grab HTML Elements before insertion
    changeSite.innerHTML = htmlCodeStrings.searchProductForm;
    // Grab HTML Elements after insertion
    const form = document.getElementById("form");
    const submit = document.getElementById("submit");
    const response = document.getElementById("response");
    // Grab HTML Elements after insertion
    submit.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData(form);
            if (checkIfFormIsFilled(formData, 1) == true) {
                const formParams = new URLSearchParams(formData);
                const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                const foundProducts = JSON.parse((yield searchProductComm(usableData)).replace(/%2B/g, " "));
                if (foundProducts.length == 0) {
                    response.innerText = "No product found";
                }
                else {
                    changeSite.innerHTML = htmlCodeStrings.tableHeaderProduct;
                    // Grab HTML Elements after insertion
                    const table = document.getElementById("table");
                    // Grab HTML Elements after insertion
                    for (let x = 0; x < foundProducts.length; x++) {
                        // Build one table entry
                        table.innerHTML += htmlCodeStrings.tableBodyProduct;
                        table.innerHTML += htmlCodeStrings.editButton;
                        table.innerHTML += htmlCodeStrings.statisticButton;
                        // Grab HTML Elements after insertion
                        const id = document.getElementsByClassName("id");
                        const description = document.getElementsByClassName("description");
                        const meDate = document.getElementsByClassName("medate");
                        const price = document.getElementsByClassName("price");
                        const standardDeliveryTime = document.getElementsByClassName("standarddeliverytime");
                        const minBG = document.getElementsByClassName("minbg");
                        const maxBG = document.getElementsByClassName("maxbg");
                        const discountBG = document.getElementsByClassName("discountbg");
                        const discount = document.getElementsByClassName("discount");
                        // Grab HTML Elements after insertion
                        id[x].textContent = foundProducts[x].ID;
                        description[x].textContent = foundProducts[x].Description;
                        meDate[x].textContent = foundProducts[x].MEDate.toString();
                        price[x].textContent = foundProducts[x].Price.toString() + " €";
                        standardDeliveryTime[x].textContent = foundProducts[x].StandardDeliveryTime.toString() + " days";
                        minBG[x].textContent = foundProducts[x].MinBG.toString() + " pieces";
                        maxBG[x].textContent = foundProducts[x].MaxBG.toString() + " pieces";
                        discountBG[x].textContent = foundProducts[x].DiscountBG.toString() + " pieces";
                        discount[x].textContent = foundProducts[x].Discount.toString() + " €";
                    }
                    const editBttn = document.getElementsByClassName("editButton");
                    const statisticBttn = document.getElementsByClassName("statisticButton");
                    for (let x = 0; x < editBttn.length; x++) {
                        editBttn[x].addEventListener("click", function () {
                            return __awaiter(this, void 0, void 0, function* () {
                                changeSite.innerHTML = htmlCodeStrings.changeProduct;
                                const form = document.getElementById("form");
                                const submit = document.getElementById("submit");
                                const response = document.getElementById("response");
                                submit.addEventListener("click", function () {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        const formData = new FormData(form);
                                        if (checkIfFormIsFilled(formData, 8) == true) {
                                            const formParams = new URLSearchParams(formData);
                                            const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                                            usableData.ID = foundProducts[x].ID;
                                            if ((yield editProductComm(usableData)) == true) {
                                                response.innerText = "Product changed";
                                            }
                                            else
                                                response.innerText = "Something went wrong. Try again.";
                                        }
                                    });
                                });
                            });
                        });
                        for (let x = 0; x < statisticBttn.length; x++) {
                            statisticBttn[x].addEventListener("click", function () {
                                return __awaiter(this, void 0, void 0, function* () {
                                    showStatistic("product", foundProducts[x]);
                                });
                            });
                        }
                    }
                }
            }
        });
    });
}
function addCustomer() {
    // Grab HTML Elements before insertion
    const changeSite = document.getElementById("changeSite");
    // Grab HTML Elements before insertion
    changeSite.innerHTML = htmlCodeStrings.createCustomer;
    // Grab HTML Elements after insertion
    const form = document.getElementById("form");
    const submit = document.getElementById("submit");
    const response = document.getElementById("response");
    // Grab HTML Elements after insertion
    submit.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData(form);
            if (checkIfFormIsFilled(formData, 4) == true) {
                const formParams = new URLSearchParams(formData);
                const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
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
    // Grab HTML Elements before insertion
    const changeSite = document.getElementById("changeSite");
    // Grab HTML Elements before insertion
    changeSite.innerHTML = htmlCodeStrings.searchCustomerForm;
    // Grab HTML Elements after insertion
    const form = document.getElementById("form");
    const submit = document.getElementById("submit");
    const response = document.getElementById("response");
    // Grab HTML Elements after insertion
    submit.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData(form);
            if (checkIfFormIsFilled(formData, 1) == true) {
                const formParams = new URLSearchParams(formData);
                const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                const foundCustomers = JSON.parse((yield searchCustomerComm(usableData)).replace(/%2B/g, " "));
                if (foundCustomers.length == 0) {
                    response.innerText = "No Customer found";
                }
                else {
                    changeSite.innerHTML = htmlCodeStrings.tableHeaderCustomer;
                    // Grab HTML Elements after insertion
                    const table = document.getElementById("table");
                    // Grab HTML Elements after insertion
                    for (let x = 0; x < foundCustomers.length; x++) {
                        // Build one or more table entrys
                        table.innerHTML += htmlCodeStrings.tableBodyCustomer;
                        table.innerHTML += htmlCodeStrings.editButton;
                        table.innerHTML += htmlCodeStrings.statisticButton;
                        // Grab HTML Elements after insertion
                        const id = document.getElementsByClassName("id");
                        const name = document.getElementsByClassName("description");
                        const adress = document.getElementsByClassName("adress");
                        const discount = document.getElementsByClassName("discount");
                        // Grab HTML Elements after insertion
                        id[x].textContent = foundCustomers[x].ID;
                        name[x].textContent = foundCustomers[x].Name.replace(/[+]/g, " ");
                        adress[x].textContent = foundCustomers[x].Adress.replace(/[+]/g, " ");
                        discount[x].textContent = foundCustomers[x].Discount.toString() + " %";
                    }
                    const editBttn = document.getElementsByClassName("editButton");
                    const statisticBttn = document.getElementsByClassName("statisticButton");
                    for (let x = 0; x < editBttn.length; x++) {
                        editBttn[x].addEventListener("click", function () {
                            return __awaiter(this, void 0, void 0, function* () {
                                changeSite.innerHTML = htmlCodeStrings.changeCustomer;
                                const form = document.getElementById("form");
                                const submit = document.getElementById("submit");
                                const response = document.getElementById("response");
                                submit.addEventListener("click", function () {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        const formData = new FormData(form);
                                        if (checkIfFormIsFilled(formData, 3) == true) {
                                            const formParams = new URLSearchParams(formData);
                                            const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                                            usableData.ID = foundCustomers[x].ID;
                                            if ((yield editCustomerComm(usableData)) == true) {
                                                response.innerText = "Customer changed";
                                            }
                                            else
                                                response.innerText = "Something went wrong. Try again.";
                                        }
                                    });
                                });
                            });
                        });
                        for (let x = 0; x < statisticBttn.length; x++) {
                            statisticBttn[x].addEventListener("click", function () {
                                return __awaiter(this, void 0, void 0, function* () {
                                    showStatistic("customer", foundCustomers[x]);
                                });
                            });
                        }
                    }
                }
            }
        });
    });
}
function searchOrder() {
    // Grab HTML Elements before insertion
    const changeSite = document.getElementById("changeSite");
    // Grab HTML Elements before insertion
    changeSite.innerHTML = htmlCodeStrings.searchOrderForm;
    // Grab HTML Elements after insertion
    const form = document.getElementById("form");
    const submit = document.getElementById("submit");
    const response = document.getElementById("response");
    // Grab HTML Elements after insertion
    submit.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData(form);
            if (checkIfFormIsFilled(formData, 1) == true) {
                const formParams = new URLSearchParams(formData);
                const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                const foundOrders = JSON.parse((yield searchOrderComm(usableData)).replace(/%2B/g, " "));
                const allCustomer = JSON.parse((yield allCustomerDataComm()).replace(/%2B/g, " "));
                if (foundOrders.length == 0) {
                    response.innerText = "No Order found";
                }
                else {
                    changeSite.innerHTML = htmlCodeStrings.tableHeaderOrder;
                    // Grab HTML Elements after insertion
                    const table = document.getElementById("table");
                    // Grab HTML Elements after insertion
                    // Build one or more table entrys
                    for (let x = 0; x < foundOrders.length; x++) {
                        table.innerHTML += htmlCodeStrings.tableBodyOrder;
                        table.innerHTML += htmlCodeStrings.editButton;
                        // Grab HTML Elements after insertion
                        const id = document.getElementsByClassName("id");
                        const description = document.getElementsByClassName("description");
                        const customer = document.getElementsByClassName("customer");
                        const orderDate = document.getElementsByClassName("orderdate");
                        const deliveryDate = document.getElementsByClassName("deliverydate");
                        const price = document.getElementsByClassName("price");
                        const orderPositions = document.getElementsByClassName("orderpositions");
                        // Grab HTML Elements after insertion
                        // Fix Parse Error with Date from Database
                        const newOrderDate = new Date(foundOrders[x].OrderDate);
                        const newDeliveryDate = new Date(foundOrders[x].DeliveryDate);
                        id[x].textContent = foundOrders[x].ID;
                        description[x].textContent = foundOrders[x].Description;
                        let foundCustomerName = "";
                        for (let x = 0; x < foundOrders.length; x++) {
                            if (allCustomer[x].ID == foundOrders[x].Customer) {
                                foundCustomerName = allCustomer[x].Name;
                            }
                        }
                        let foundCustomerDiscount = 0;
                        for (let x = 0; x < foundOrders.length; x++) {
                            if (allCustomer[x].ID == foundOrders[x].Customer) {
                                foundCustomerDiscount = allCustomer[x].Discount;
                            }
                        }
                        customer[x].textContent = foundCustomerName;
                        orderDate[x].textContent = "Order Date: " + (newOrderDate.getMonth() + 1) + "." + newOrderDate.getDate().toString() + "." + newOrderDate.getFullYear().toString();
                        deliveryDate[x].textContent = "Delivery Date: " + (newDeliveryDate.getMonth() + 1) + "." + newDeliveryDate.getDate().toString() + "." + newDeliveryDate.getFullYear().toString();
                        price[x].textContent = foundOrders[x].Price.toString() + " €";
                        for (let y = 0; y < foundOrders[x].OrderPositions.length; y++) {
                            orderPositions[x].textContent += " Order Position " + (y + 1) + ": " + foundOrders[x].OrderPositions[y][0].Description + " x " + foundOrders[x].OrderPositions[y][1].Amount + ", ";
                        }
                        const editBttn = document.getElementsByClassName("editButton");
                        for (let x = 0; x < editBttn.length; x++) {
                            editBttn[x].addEventListener("click", function () {
                                return __awaiter(this, void 0, void 0, function* () {
                                    changeOrder("one", foundOrders[x].ID, foundOrders[x], foundCustomerName, foundCustomerDiscount);
                                });
                            });
                        }
                    }
                }
            }
        });
    });
}
function createOrder(step, order, customerName, customerDiscount) {
    return __awaiter(this, void 0, void 0, function* () {
        // Grab HTML Elements before insertion
        const changeSite = document.getElementById("changeSite");
        // Grab HTML Elements before insertion
        if (step == "one") {
            changeSite.innerHTML = htmlCodeStrings.createOrderForm;
            // Grab HTML Elements after insertion
            const form = document.getElementById("form");
            const submit = document.getElementById("submit");
            const customer = document.getElementById("customer");
            const response = document.getElementById("response");
            // Grab HTML Elements after insertion
            const allCustomer = JSON.parse((yield allCustomerDataComm()).replace(/%2B/g, " "));
            for (let x = 0; x < allCustomer.length; x++) {
                customer.innerHTML += "<option value=" + x + "  >" + allCustomer[x].ID + ",  " + allCustomer[x].Name + "</option>";
            }
            submit.addEventListener("click", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const formData = new FormData(form);
                    const usedId = {
                        SearchTerm: formData.get("ID").toString(),
                        ServerId: ""
                    };
                    if (checkIfFormIsFilled(formData, 2) == true && (yield checkForOrderId(usedId)) == true) {
                        const order = {
                            ID: "",
                            Customer: "",
                            Description: "",
                            OrderDate: new Date(),
                            DeliveryDate: new Date(),
                            Price: 0,
                            ServerId: ""
                        };
                        const formParams = new URLSearchParams(formData);
                        const usableformData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                        order.ID = usableformData.ID;
                        order.Customer = usableformData.Customer;
                        order.Description = usableformData.Description;
                        order.Customer = allCustomer[customer.selectedIndex].ID;
                        createOrder("two", order, allCustomer[customer.selectedIndex].Name, allCustomer[customer.selectedIndex].Discount);
                    }
                    else if (checkIfFormIsFilled(formData, 2) == true && (yield checkForOrderId(usedId)) == false) {
                        response.innerHTML = "ID already in use. Try with different.";
                    }
                });
            });
        }
        else if (step == "two") {
            changeSite.innerHTML = htmlCodeStrings.tableHeaderCreateOrder;
            const submit = document.getElementById("submit");
            submit.addEventListener("click", function () {
                if (order.OrderPositions != undefined) {
                    confirmOrderOverview(order, customerName, customerDiscount);
                }
                else {
                    const response = document.getElementById("response");
                    response.innerText = "Please add at least one Position to your Order";
                }
            });
            const productData = yield allProductDataComm();
            // Grab HTML Elements after insertion
            const table = document.getElementById("table");
            // Grab HTML Elements after insertion
            // Build table entrys
            for (let x = 0; x < productData.length; x++) { // Build all Table Entrys
                table.innerHTML += htmlCodeStrings.tableBodyCreateOrder;
                // Grab HTML Elements after insertion
                const id = document.getElementsByClassName("id");
                const description = document.getElementsByClassName("description");
                const meDate = document.getElementsByClassName("medate");
                const price = document.getElementsByClassName("price");
                const standardDeliveryTime = document.getElementsByClassName("standarddeliverytime");
                const minBG = document.getElementsByClassName("minbg");
                const maxBG = document.getElementsByClassName("maxbg");
                const discountBG = document.getElementsByClassName("discountbg");
                const discount = document.getElementsByClassName("discount");
                // Grab HTML Elements after insertion
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
                const amount = document.getElementsByClassName("amount");
                const button = document.getElementsByClassName("addButton");
                const amountField = document.getElementsByClassName("amountField");
                const response = document.getElementsByClassName("response");
                button[x].addEventListener("click", function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        const formData = new FormData(amount[x]);
                        const formParams = new URLSearchParams(formData);
                        const usableformData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
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
function confirmOrderOverview(order, customerName, customerDiscount, changeOrder) {
    // Grab HTML Elements before insertion
    const changeSite = document.getElementById("changeSite");
    // Grab HTML Elements before insertion
    if (changeOrder == true) {
        changeSite.innerHTML = htmlCodeStrings.HeaderChangeOrder;
    }
    else {
        changeSite.innerHTML = htmlCodeStrings.HeaderConfirmOrder;
    }
    // Grab HTML Elements after insertion
    const confirmBttn = document.getElementById("confirm");
    const orderId = document.getElementById("orderId");
    const orderCustomer = document.getElementById("orderCustomer");
    const orderDescription = document.getElementById("description");
    const orderDelDate = document.getElementById("deliveryDate");
    const orderPrice = document.getElementById("price");
    const orderPositions = document.getElementById("orderPositions");
    // Grab HTML Elements after insertion
    confirmBttn.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (changeOrder == true) {
                if ((yield editOrderComm(order)) == true) {
                    changeSite.innerHTML = "Order changed";
                }
                else {
                    changeSite.innerHTML = "Something went wrong";
                }
            }
            else {
                if ((yield createOrderComm(order)) == true) {
                    changeSite.innerHTML = "Order added";
                }
                else {
                    changeSite.innerHTML = "ID already in use";
                }
            }
        });
    });
    // calculate latest StandarDeliverDate
    let highestDelivery = 0;
    for (let x = 0; x < order.OrderPositions.length; x++) {
        if (order.OrderPositions[x][0].StandardDeliveryTime >= highestDelivery) {
            highestDelivery = order.OrderPositions[x][0].StandardDeliveryTime;
        }
    }
    orderId.innerText = "Order ID: " + order.ID;
    orderCustomer.innerText = "Customer: " + customerName.replace("+", " ");
    orderDescription.innerText = "Order Description: " + order.Description;
    const time = +highestDelivery;
    order.DeliveryDate.setDate(order.DeliveryDate.getDate() + time);
    orderDelDate.innerText = "Delivery Date: " + (order.DeliveryDate.getMonth() + 1) + "." + order.DeliveryDate.getDate().toString() + "." + order.DeliveryDate.getFullYear().toString();
    // Calculate price
    let fullPrice = 0;
    for (let x = 0; x < order.OrderPositions.length; x++) {
        const price = +order.OrderPositions[x][0].Price;
        const amount = +order.OrderPositions[x][1].Amount;
        const discount = +order.OrderPositions[x][0].Discount;
        if (order.OrderPositions[x][0].DiscountBG <= order.OrderPositions[x][1].Amount) {
            fullPrice += (price * amount);
            fullPrice = fullPrice - (fullPrice * (discount / 100));
        }
        else {
            fullPrice += price * amount;
        }
        ;
    }
    order.Price = fullPrice - (fullPrice * (customerDiscount / 100));
    orderPrice.innerText = "Price: " + order.Price.toString() + "€";
    for (let x = 0; x < order.OrderPositions.length; x++) {
        orderPositions.innerText += "Description: " + order.OrderPositions[x][0].Description + "," + " Amount: " + order.OrderPositions[x][1].Amount;
        orderPositions.innerHTML += "<br>";
    }
}
// change Order
function changeOrder(step, orderId, order, customerName, customerDiscount) {
    return __awaiter(this, void 0, void 0, function* () {
        // Grab HTML Elements before insertion
        const changeSite = document.getElementById("changeSite");
        // Grab HTML Elements before insertion
        if (step == "one") {
            changeSite.innerHTML = htmlCodeStrings.changeOrderForm;
            // Grab HTML Elements after insertion
            const form = document.getElementById("form");
            const submit = document.getElementById("submit");
            const customer = document.getElementById("customer");
            // Grab HTML Elements after insertion
            const allCustomer = JSON.parse((yield allCustomerDataComm()).replace(/%2B/g, " "));
            for (let x = 0; x < allCustomer.length; x++) {
                customer.innerHTML += "<option value=" + x + "  >" + allCustomer[x].ID + ",  " + allCustomer[x].Name + "</option>";
            }
            submit.addEventListener("click", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const formData = new FormData(form);
                    if (checkIfFormIsFilled(formData, 1) == true) {
                        const order = {
                            ID: "",
                            Customer: "",
                            Description: "",
                            OrderDate: new Date(),
                            DeliveryDate: new Date(),
                            Price: 0,
                            ServerId: ""
                        };
                        const formParams = new URLSearchParams(formData);
                        const usableformData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                        order.ID = orderId;
                        order.Customer = usableformData.Customer;
                        order.Description = usableformData.Description;
                        order.Customer = allCustomer[customer.selectedIndex].ID;
                        changeOrder("two", orderId, order, allCustomer[customer.selectedIndex].Name, allCustomer[customer.selectedIndex].Discount);
                    }
                });
            });
        }
        else if (step == "two") {
            changeSite.innerHTML = htmlCodeStrings.tableHeaderCreateOrder;
            const submit = document.getElementById("submit");
            submit.addEventListener("click", function () {
                if (order.OrderPositions != undefined) {
                    confirmOrderOverview(order, customerName, customerDiscount, true);
                }
                else {
                    const response = document.getElementById("response");
                    response.innerText = "Please add at least one Position to your Order";
                }
            });
            const productData = yield allProductDataComm();
            // Grab HTML Elements after insertion
            const table = document.getElementById("table");
            // Grab HTML Elements after insertion
            // Build table entrys
            for (let x = 0; x < productData.length; x++) { // Build all Table Entrys
                table.innerHTML += htmlCodeStrings.tableBodyCreateOrder;
                // Grab HTML Elements after insertion
                const id = document.getElementsByClassName("id");
                const description = document.getElementsByClassName("description");
                const meDate = document.getElementsByClassName("medate");
                const price = document.getElementsByClassName("price");
                const standardDeliveryTime = document.getElementsByClassName("standarddeliverytime");
                const minBG = document.getElementsByClassName("minbg");
                const maxBG = document.getElementsByClassName("maxbg");
                const discountBG = document.getElementsByClassName("discountbg");
                const discount = document.getElementsByClassName("discount");
                // Grab HTML Elements after insertion
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
                const amount = document.getElementsByClassName("amount");
                const button = document.getElementsByClassName("addButton");
                const amountField = document.getElementsByClassName("amountField");
                const response = document.getElementsByClassName("response");
                button[x].addEventListener("click", function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        const formData = new FormData(amount[x]);
                        const formParams = new URLSearchParams(formData);
                        const usableformData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
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
function showStatistic(statisticObject, usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const changeSite = document.getElementById("changeSite");
        const allOrders = JSON.parse(yield allOrderDataComm());
        const allCustomers = JSON.parse(yield allCustomerDataComm());
        if (statisticObject == "product") {
            const newUsableData = usableData;
            let orderedAmount = 0;
            let orderedOrders = 0;
            let totalTurnover = 0;
            let totalDiscount = 0;
            let customerID = "";
            for (let x = 0; x < allOrders.length; x++) {
                for (let y = 0; y < allOrders[x].OrderPositions.length; y++) {
                    if (allOrders[x].OrderPositions[y][0].ID == newUsableData.ID) {
                        orderedAmount += +allOrders[x].OrderPositions[y][1].Amount;
                        if (allOrders[x].OrderPositions[y][1].Amount >= newUsableData.MinBG) {
                            totalDiscount = +newUsableData.Discount;
                        }
                        totalTurnover += allOrders[x].OrderPositions[y][1].Amount * allOrders[x].OrderPositions[y][0].Price;
                        customerID = allOrders[x].Customer;
                    }
                    for (let z = 0; z < allCustomers.length; z++) {
                        if (allCustomers[z].ID == customerID) {
                            totalDiscount += +allCustomers[z].Discount;
                        }
                    }
                }
                if (allOrders[x].OrderPositions[0][0].ID == newUsableData.ID) {
                    orderedOrders += 1;
                }
            }
            totalTurnover = totalTurnover - (totalTurnover * (totalDiscount / 100));
            changeSite.innerHTML = htmlCodeStrings.statisticProduct.replace("x", orderedAmount.toString()).replace("x", orderedOrders.toString()).replace("x", totalTurnover.toString());
        }
        else if (statisticObject == "customer") {
            const newUsableData = usableData;
            let orderedArticles = " Ordered Articles: ";
            let totalTurnover = "";
            let totalDiscount = "";
            let counter = 1;
            for (let x = 0; x < allOrders.length; x++) {
                for (let y = 0; y < allOrders[x].OrderPositions.length; y++) {
                    if (allOrders[x].Customer == newUsableData.ID) {
                        orderedArticles += counter + ". " + allOrders[x].OrderPositions[y][0].Description + " x " + allOrders[x].OrderPositions[y][1].Amount + ". ";
                        counter++;
                        totalTurnover += allOrders[x].Price;
                        totalDiscount += +(allOrders[x].OrderPositions[y][1].Amount * allOrders[x].OrderPositions[y][0].Price) - allOrders[x].Price;
                    }
                }
            }
            changeSite.innerHTML = orderedArticles;
            changeSite.innerHTML += "<br>" + "Total Customer turnover: " + totalTurnover + ". " + "<br>";
            changeSite.innerHTML += "Total given Discount in €: " + totalDiscount;
        }
    });
}
//# sourceMappingURL=buildSite.js.map