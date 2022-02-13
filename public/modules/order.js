var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FormCheck } from "./formCheck.js";
import { changeOrderForm, createOrderForm, editButton, HeaderChangeOrder, HeaderConfirmOrder, searchOrderForm, tableBodyCreateOrder, tableBodyOrder, tableHeaderCreateOrder, tableHeaderOrder } from "./htmlCodeStrings.js";
import { ServerCommunication } from "./serverCommunication.js";
export class Order {
    constructor(id, customer, description, orderDate, deliveryDate, price, serverId, orderPositions) {
        this.id = id;
        this.customer = customer;
        this.description = description;
        this.orderDate = orderDate;
        this.deliveryDate = deliveryDate;
        this.price = price;
        this.orderPositions = orderPositions;
        this.serverId = serverId;
    }
    static createOrder(step, order, customerName, customerDiscount) {
        return __awaiter(this, void 0, void 0, function* () {
            // Grab HTML Elements before HMTL insertion
            const changeSite = document.getElementById("changeSite");
            if (step == "one") {
                // Insert HMTL
                changeSite.innerHTML = createOrderForm;
                // Grab HTML Elements after HMTL insertion
                const form = document.getElementById("form");
                const submit = document.getElementById("submit");
                const customer = document.getElementById("customer");
                const response = document.getElementById("response");
                // Get all Customer Data
                const allCustomer = JSON.parse((yield ServerCommunication.allCustomerDataComm()).replace(/%2B/g, " "));
                // Create options to choose Customer
                for (let x = 0; x < allCustomer.length; x++) {
                    customer.innerHTML += "<option value=" + x + "  >" + allCustomer[x].id + ",  " + allCustomer[x].name + "</option>";
                }
                // Add Event Listeners to submit Button
                submit.addEventListener("click", function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        const formData = new FormData(form);
                        // Get given Id to check for duplicate
                        const usedId = {
                            searchTerm: formData.get("id").toString(),
                            serverId: ""
                        };
                        // check for filled Form, duplicate Id and Regex
                        if (FormCheck.checkIfFormIsFilled(formData, 2) == true && (yield ServerCommunication.checkForOrderId(usedId)) == true && FormCheck.checkForRegex(formData.get("id").toString(), "id") == true) {
                            // create Order
                            const order = {
                                id: "",
                                customer: "",
                                description: "",
                                orderDate: new Date(),
                                deliveryDate: new Date(),
                                price: 0,
                                serverId: ""
                            };
                            // Get Form Data and parse into usable Object
                            const formParams = new URLSearchParams(formData);
                            const usableformData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                            // fill Order with given information
                            order.id = usableformData.id;
                            order.customer = usableformData.customer;
                            order.description = usableformData.description;
                            order.customer = allCustomer[customer.selectedIndex].id;
                            // call createOrder with the next step
                            Order.createOrder("two", order, allCustomer[customer.selectedIndex].name, allCustomer[customer.selectedIndex].discount);
                        }
                        else if (FormCheck.checkIfFormIsFilled(formData, 2) == true && (yield ServerCommunication.checkForOrderId(usedId)) == false) {
                            response.innerHTML = "ID already in use. Try with different.";
                        }
                        else if (FormCheck.checkIfFormIsFilled(formData, 2) == true && FormCheck.checkForRegex(formData.get("id").toString(), "id") == true) {
                            response.innerHTML = "ID must consist of three uppercase letters followed by three numbers.";
                        }
                    });
                });
            }
            else if (step == "two") {
                // insert HMTL
                changeSite.innerHTML = tableHeaderCreateOrder;
                // get HMTL Elements
                const submit = document.getElementById("submit");
                // add Event Listeners to submit Button
                submit.addEventListener("click", function () {
                    // Show Order Overview if at least one product is added
                    if (order.orderPositions != undefined) {
                        Order.confirmOrderOverview(order, customerName, customerDiscount);
                    }
                    else {
                        const response = document.getElementById("response");
                        response.innerText = "Please add at least one Position to your Order";
                    }
                });
                // Get all Produts
                const productData = JSON.parse(yield ServerCommunication.allProductDataComm());
                // Grab HTML Elements after HTML insertion
                const table = document.getElementById("table");
                // Build table entrys for every Product
                for (let x = 0; x < productData.length; x++) {
                    table.innerHTML += tableBodyCreateOrder;
                    // Grab HTML Elements after HTML insertion
                    const id = document.getElementsByClassName("id");
                    const description = document.getElementsByClassName("description");
                    const meDate = document.getElementsByClassName("medate");
                    const price = document.getElementsByClassName("price");
                    const standardDeliveryTime = document.getElementsByClassName("standarddeliverytime");
                    const minBG = document.getElementsByClassName("minbg");
                    const maxBG = document.getElementsByClassName("maxbg");
                    const discountBG = document.getElementsByClassName("discountbg");
                    const discount = document.getElementsByClassName("discount");
                    // Fill Table with Data
                    id[x].textContent = productData[x].id;
                    description[x].textContent = productData[x].description;
                    meDate[x].textContent = productData[x].meDate.toString();
                    price[x].textContent = productData[x].price.toString() + " €";
                    standardDeliveryTime[x].textContent = productData[x].standardDeliveryTime.toString() + " days";
                    minBG[x].textContent = productData[x].minBG.toString() + " pieces";
                    maxBG[x].textContent = productData[x].maxBG.toString() + " pieces";
                    discountBG[x].textContent = productData[x].discountBG.toString() + " pieces";
                    discount[x].textContent = productData[x].discount.toString() + " %";
                }
                // Add Event Listener to add Product Buttons
                for (let x = 0; x < productData.length; x++) {
                    const amount = document.getElementsByClassName("amount");
                    const button = document.getElementsByClassName("addButton");
                    const amountField = document.getElementsByClassName("amountField");
                    const response = document.getElementsByClassName("response");
                    button[x].addEventListener("click", function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            // get User Input
                            const formData = new FormData(amount[x]);
                            const formParams = new URLSearchParams(formData);
                            // parse into Amount Interface
                            const usableformData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                            // check for filled Form and valid (Amount, MEDate) --> if true add Order position
                            if (FormCheck.checkIfFormIsFilled(formData, 1) == true) {
                                if (FormCheck.checkIfOrderIsValid(usableformData, productData, x) == true) {
                                    response[x].style.color = "black";
                                    amountField[x].value = "";
                                    response[x].innerText = "Sucessful added";
                                    order = Order.addAmountToOrder(usableformData, productData, x, order);
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
    // push Product with given Amount to Order
    static addAmountToOrder(amountData, productData, productNumber, order) {
        // If array is not initialised create Array
        if (order.orderPositions == undefined) {
            order.orderPositions = [[productData[productNumber], amountData]];
        }
        // Push to Array
        else {
            order.orderPositions.push([productData[productNumber], amountData]);
        }
        return order;
    }
    // Display Order Overview for Confirmation
    static confirmOrderOverview(order, customerName, customerDiscount, changeOrder) {
        // Grab HTML Elements before HTML insertion
        const changeSite = document.getElementById("changeSite");
        // check for Use (change Order functionalities or create Order) --> Insert HMTL
        if (changeOrder == true) {
            changeSite.innerHTML = HeaderChangeOrder;
        }
        else {
            changeSite.innerHTML = HeaderConfirmOrder;
        }
        // Grab HTML Elements after HTML insertion
        const confirmBttn = document.getElementById("confirm");
        const orderId = document.getElementById("orderId");
        const orderCustomer = document.getElementById("orderCustomer");
        const orderDescription = document.getElementById("description");
        const orderDelDate = document.getElementById("deliveryDate");
        const orderPrice = document.getElementById("price");
        const orderPositions = document.getElementById("orderPositions");
        // Add Event Listener to confirm Button
        confirmBttn.addEventListener("click", function () {
            return __awaiter(this, void 0, void 0, function* () {
                // confirm changed or added Order
                if (changeOrder == true) {
                    if ((yield ServerCommunication.editOrderComm(order)) == true) {
                        changeSite.innerHTML = "Order changed";
                    }
                    else {
                        changeSite.innerHTML = "Something went wrong";
                    }
                }
                else {
                    if ((yield ServerCommunication.createOrderComm(order)) == true) {
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
        for (let x = 0; x < order.orderPositions.length; x++) {
            if (order.orderPositions[x][0].standardDeliveryTime >= highestDelivery) {
                highestDelivery = order.orderPositions[x][0].standardDeliveryTime;
            }
        }
        // Display Order Information
        orderId.innerText = "Order ID: " + order.id;
        orderCustomer.innerText = "Customer: " + customerName.replace("+", " ");
        orderDescription.innerText = "Order Description: " + order.description;
        // Add highest Delivery Time to Order Date to get Delivery Date
        const time = +highestDelivery;
        order.deliveryDate.setDate(order.deliveryDate.getDate() + time);
        orderDelDate.innerText = "Delivery Date: " + (order.deliveryDate.getMonth() + 1) + "." + order.deliveryDate.getDate().toString() + "." + order.deliveryDate.getFullYear().toString();
        // Calculate full price and subtract Discount if needed
        let fullPrice = 0;
        let givenDiscount = 0;
        for (let x = 0; x < order.orderPositions.length; x++) {
            const price = +order.orderPositions[x][0].price;
            const amount = +order.orderPositions[x][1].amount;
            const discount = +order.orderPositions[x][0].discount;
            if (order.orderPositions[x][0].discountBG <= order.orderPositions[x][1].amount) {
                fullPrice += (price * amount);
                givenDiscount += fullPrice * (discount / 100);
                fullPrice = fullPrice - (fullPrice * (discount / 100));
            }
            else {
                fullPrice += price * amount;
            }
            ;
        }
        order.price = fullPrice - (fullPrice * (customerDiscount / 100));
        console.log(givenDiscount);
        givenDiscount += fullPrice * (customerDiscount / 100);
        console.log(givenDiscount);
        orderPrice.innerText = "Price: " + order.price.toString() + "€. " + "Discount: " + givenDiscount + "€.";
        // Display Description and ordered Amount for every Position
        for (let x = 0; x < order.orderPositions.length; x++) {
            orderPositions.innerText += "Description: " + order.orderPositions[x][0].description + "," + " Amount: " + order.orderPositions[x][1].amount;
            orderPositions.innerHTML += "<br>";
        }
    }
    // search for Order
    static searchOrder() {
        // Grab HTML Elements before HTML insertion
        const changeSite = document.getElementById("changeSite");
        // insert HTML
        changeSite.innerHTML = searchOrderForm;
        // Grab HTML Elements after HMTL insertion
        const form = document.getElementById("form");
        const submit = document.getElementById("submit");
        const response = document.getElementById("response");
        // Add Event Listener to submit Button
        submit.addEventListener("click", function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Get User Input
                const formData = new FormData(form);
                // Check for filled Form --> if true search for Order
                if (FormCheck.checkIfFormIsFilled(formData, 1) == true) {
                    // parse From Data to usable Object
                    const formParams = new URLSearchParams(formData);
                    const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                    // retrieve the found Orders and all Customers to display information
                    const foundOrders = JSON.parse((yield ServerCommunication.searchOrderComm(usableData)).replace(/%2B/g, " "));
                    const allCustomer = JSON.parse((yield ServerCommunication.allCustomerDataComm()).replace(/%2B/g, " "));
                    if (foundOrders.length == 0) {
                        response.innerText = "No Order found";
                    }
                    else {
                        // insert HMTL
                        changeSite.innerHTML = tableHeaderOrder;
                        // Grab HTML Elements after HTML insertion
                        const table = document.getElementById("table");
                        // Build table entry for every found order
                        for (let x = 0; x < foundOrders.length; x++) {
                            // Insert HMTL
                            table.innerHTML += tableBodyOrder;
                            table.innerHTML += editButton;
                            // Grab HTML Elements after HTML insertion
                            const id = document.getElementsByClassName("id");
                            const description = document.getElementsByClassName("description");
                            const customer = document.getElementsByClassName("customer");
                            const orderDate = document.getElementsByClassName("orderdate");
                            const deliveryDate = document.getElementsByClassName("deliverydate");
                            const price = document.getElementsByClassName("price");
                            const orderPositions = document.getElementsByClassName("orderpositions");
                            // Fix Parse Error with Date from Database
                            const newOrderDate = new Date(foundOrders[x].orderDate);
                            const newDeliveryDate = new Date(foundOrders[x].deliveryDate);
                            // Display Information
                            id[x].textContent = foundOrders[x].id;
                            description[x].textContent = foundOrders[x].description;
                            // Search right Customer
                            let foundCustomerName = "";
                            for (let x = 0; x < foundOrders.length; x++) {
                                if (allCustomer[x].id == foundOrders[x].customer) {
                                    foundCustomerName = allCustomer[x].name;
                                }
                            }
                            // Seatch Customer discount
                            let foundCustomerDiscount = 0;
                            for (let x = 0; x < foundOrders.length; x++) {
                                if (allCustomer[x].id == foundOrders[x].customer) {
                                    foundCustomerDiscount = allCustomer[x].discount;
                                }
                            }
                            // display Information
                            customer[x].textContent = foundCustomerName;
                            orderDate[x].textContent = "Order Date: " + (newOrderDate.getMonth() + 1) + "." + newOrderDate.getDate().toString() + "." + newOrderDate.getFullYear().toString();
                            deliveryDate[x].textContent = "Delivery Date: " + (newDeliveryDate.getMonth() + 1) + "." + newDeliveryDate.getDate().toString() + "." + newDeliveryDate.getFullYear().toString();
                            price[x].textContent = foundOrders[x].price.toString() + " €";
                            // Display every Order Position
                            for (let y = 0; y < foundOrders[x].orderPositions.length; y++) {
                                orderPositions[x].textContent += " Order Position " + (y + 1) + ": " + foundOrders[x].orderPositions[y][0].description + " x " + foundOrders[x].orderPositions[y][1].amount + ", ";
                            }
                            // get edit Button
                            const editBttn = document.getElementsByClassName("editButton");
                            // add Event Listener to every Edit Button to Edit the Order
                            for (let x = 0; x < editBttn.length; x++) {
                                editBttn[x].addEventListener("click", function () {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        Order.changeOrder("one", foundOrders[x].id, foundOrders[x], foundCustomerName, foundCustomerDiscount);
                                    });
                                });
                            }
                        }
                    }
                }
            });
        });
    }
    // change given Order
    static changeOrder(step, orderId, order, customerName, customerDiscount) {
        return __awaiter(this, void 0, void 0, function* () {
            // Grab HTML Elements before HTML insertion
            const changeSite = document.getElementById("changeSite");
            if (step == "one") {
                changeSite.innerHTML = changeOrderForm;
                // Grab HTML Elements after HMTL insertion
                const form = document.getElementById("form");
                const submit = document.getElementById("submit");
                const customer = document.getElementById("customer");
                // retrieve all Customers
                const allCustomer = JSON.parse((yield ServerCommunication.allCustomerDataComm()).replace(/%2B/g, " "));
                // Generate options to choose Customer
                for (let x = 0; x < allCustomer.length; x++) {
                    customer.innerHTML += "<option value=" + x + "  >" + allCustomer[x].id + ",  " + allCustomer[x].name + "</option>";
                }
                // Add Event Listener to submit Button
                submit.addEventListener("click", function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        const formData = new FormData(form);
                        // Check for filled Form --> if true create Order
                        if (FormCheck.checkIfFormIsFilled(formData, 1) == true) {
                            const order = {
                                id: "",
                                customer: "",
                                description: "",
                                orderDate: new Date(),
                                deliveryDate: new Date(),
                                price: 0,
                                serverId: ""
                            };
                            // Fill Order with Data
                            const formParams = new URLSearchParams(formData);
                            const usableformData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                            order.id = orderId;
                            order.customer = usableformData.customer;
                            order.description = usableformData.description;
                            order.customer = allCustomer[customer.selectedIndex].id;
                            // Call changeOrder with the next step
                            Order.changeOrder("two", orderId, order, allCustomer[customer.selectedIndex].name, allCustomer[customer.selectedIndex].discount);
                        }
                    });
                });
            }
            else if (step == "two") {
                // insert HMTL
                changeSite.innerHTML = tableHeaderCreateOrder;
                // Get submit Button
                const submit = document.getElementById("submit");
                // Add Event Listener to submit Button
                submit.addEventListener("click", function () {
                    if (order.orderPositions != undefined) {
                        // check if at least one Product is added --> if true display Oder Overview
                        Order.confirmOrderOverview(order, customerName, customerDiscount, true);
                    }
                    else {
                        const response = document.getElementById("response");
                        response.innerText = "Please add at least one Position to your Order";
                    }
                });
                // Get all Products
                const productData = JSON.parse(yield ServerCommunication.allProductDataComm());
                // Grab HTML Elements after HTML insertion
                const table = document.getElementById("table");
                // Build table entry for every Product
                for (let x = 0; x < productData.length; x++) {
                    // Insert HMTL
                    table.innerHTML += tableBodyCreateOrder;
                    // Grab HTML Elements after HTML insertion
                    const id = document.getElementsByClassName("id");
                    const description = document.getElementsByClassName("description");
                    const meDate = document.getElementsByClassName("medate");
                    const price = document.getElementsByClassName("price");
                    const standardDeliveryTime = document.getElementsByClassName("standarddeliverytime");
                    const minBG = document.getElementsByClassName("minbg");
                    const maxBG = document.getElementsByClassName("maxbg");
                    const discountBG = document.getElementsByClassName("discountbg");
                    const discount = document.getElementsByClassName("discount");
                    // Insert Information
                    id[x].textContent = productData[x].id;
                    description[x].textContent = productData[x].description;
                    meDate[x].textContent = productData[x].meDate.toString();
                    price[x].textContent = productData[x].price.toString() + " €";
                    standardDeliveryTime[x].textContent = productData[x].standardDeliveryTime.toString() + " days";
                    minBG[x].textContent = productData[x].minBG.toString() + " pieces";
                    maxBG[x].textContent = productData[x].maxBG.toString() + " pieces";
                    discountBG[x].textContent = productData[x].discountBG.toString() + " pieces";
                    discount[x].textContent = productData[x].discount.toString() + " %";
                }
                // Add Event Listeners to add AMount Buttons
                for (let x = 0; x < productData.length; x++) {
                    const amount = document.getElementsByClassName("amount");
                    const button = document.getElementsByClassName("addButton");
                    const amountField = document.getElementsByClassName("amountField");
                    const response = document.getElementsByClassName("response");
                    button[x].addEventListener("click", function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            // Get Form Data and parse into Object
                            const formData = new FormData(amount[x]);
                            const formParams = new URLSearchParams(formData);
                            const usableformData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                            // check if Product can be added to Order (Amount MEDate) --> if true add to Order
                            if (FormCheck.checkIfFormIsFilled(formData, 1) == true) {
                                if (FormCheck.checkIfOrderIsValid(usableformData, productData, x) == true) {
                                    response[x].style.color = "black";
                                    amountField[x].value = "";
                                    response[x].innerText = "Sucessful added";
                                    order = Order.addAmountToOrder(usableformData, productData, x, order);
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
}
;
//# sourceMappingURL=order.js.map