var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Module Imports
import { FormCheck } from "./formCheck.js";
import { changeCustomer, createCustomer, editButton, searchCustomerForm, statisticButton, tableBodyCustomer, tableHeaderCustomer } from "./htmlCodeStrings.js";
import { ServerCommunication } from "./serverCommunication.js";
import { ShowStatistic } from "./showStatistic.js";
export class Customer {
    constructor(id, name, adress, discount, serverId) {
        this.id = id;
        this.name = name;
        this.adress = adress;
        this.discount = discount;
        this.serverId = serverId;
    }
    static addCustomer() {
        // Grab HTML Elements before HTML insertion
        const changeSite = document.getElementById("changeSite");
        // insert HTML
        changeSite.innerHTML = createCustomer;
        // Grab HTML Elements after HTML insertion
        const form = document.getElementById("form");
        const submit = document.getElementById("submit");
        const response = document.getElementById("response");
        // add Event Listener on the submit Button
        submit.addEventListener("click", function () {
            return __awaiter(this, void 0, void 0, function* () {
                // get User Input Data
                const formData = new FormData(form);
                // check for filled Form fields and Regex --> if valid add Customer to Database
                if (FormCheck.checkIfFormIsFilled(formData, 4) == true && FormCheck.checkForRegex(formData.get("id").toString(), "id") == true) {
                    const formParams = new URLSearchParams(formData);
                    const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                    if ((yield ServerCommunication.addCustomerComm(usableData)) == true) {
                        response.innerText = "Customer added";
                    }
                    else
                        response.innerText = "ID already in use. Retry with different ID";
                }
                else if (FormCheck.checkIfFormIsFilled(formData, 4) == true && FormCheck.checkForRegex(formData.get("id").toString(), "id") == false) {
                    response.innerText = "ID must consist of three uppercase letters followed by three numbers.";
                }
            });
        });
    }
    static searchCustomer() {
        // Grab HTML Elements before HTML insertion
        const changeSite = document.getElementById("changeSite");
        // insert HTML
        changeSite.innerHTML = searchCustomerForm;
        // Grab HTML Elements after HMTL insertion
        const form = document.getElementById("form");
        const submit = document.getElementById("submit");
        const response = document.getElementById("response");
        // add Event Listener on submit Button
        submit.addEventListener("click", function () {
            return __awaiter(this, void 0, void 0, function* () {
                // get User Input
                const formData = new FormData(form);
                // check for filled Form field --> if filled search for customer
                if (FormCheck.checkIfFormIsFilled(formData, 1) == true) {
                    const formParams = new URLSearchParams(formData);
                    const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                    const foundCustomers = JSON.parse((yield ServerCommunication.searchCustomerComm(usableData)).replace(/%2B/g, " "));
                    if (foundCustomers.length == 0) {
                        response.innerText = "No Customer found";
                    }
                    else {
                        // insert HTML
                        changeSite.innerHTML = tableHeaderCustomer;
                        // Grab HTML Elements after HMTL insertion
                        const table = document.getElementById("table");
                        // build table entry for every found customer
                        for (let x = 0; x < foundCustomers.length; x++) {
                            table.innerHTML += tableBodyCustomer;
                            table.innerHTML += editButton;
                            table.innerHTML += statisticButton;
                            // Grab HTML Elements after HTML insertion
                            const id = document.getElementsByClassName("id");
                            const name = document.getElementsByClassName("description");
                            const adress = document.getElementsByClassName("adress");
                            const discount = document.getElementsByClassName("discount");
                            // fill table with found data
                            id[x].textContent = foundCustomers[x].id;
                            name[x].textContent = foundCustomers[x].name.replace(/[+]/g, " ");
                            adress[x].textContent = foundCustomers[x].adress.replace(/[+]/g, " ");
                            discount[x].textContent = foundCustomers[x].discount.toString() + " %";
                        }
                        // get Buttons for edit and statistic
                        const editBttn = document.getElementsByClassName("editButton");
                        const statisticBttn = document.getElementsByClassName("statisticButton");
                        // add Event Listener with functionality to every edit Button generated
                        for (let x = 0; x < editBttn.length; x++) {
                            editBttn[x].addEventListener("click", function () {
                                return __awaiter(this, void 0, void 0, function* () {
                                    // insert HTML
                                    changeSite.innerHTML = changeCustomer;
                                    // Grab HTML elements after HTML insertion
                                    const form = document.getElementById("form");
                                    const submit = document.getElementById("submit");
                                    const response = document.getElementById("response");
                                    // add Event Listener with functionality to submit Button
                                    submit.addEventListener("click", function () {
                                        return __awaiter(this, void 0, void 0, function* () {
                                            // get User Input Data
                                            const formData = new FormData(form);
                                            // check for filled Form fields --> if true change Customer
                                            if (FormCheck.checkIfFormIsFilled(formData, 3) == true) {
                                                const formParams = new URLSearchParams(formData);
                                                const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                                                usableData.id = foundCustomers[x].id;
                                                if ((yield ServerCommunication.editCustomerComm(usableData)) == true) {
                                                    response.innerText = "Customer changed";
                                                }
                                                else
                                                    response.innerText = "Something went wrong. Try again.";
                                            }
                                        });
                                    });
                                });
                            });
                            // add Event Listener with functionality to every statistic Button generated
                            for (let x = 0; x < statisticBttn.length; x++) {
                                statisticBttn[x].addEventListener("click", function () {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        ShowStatistic.showStatistic("customer", foundCustomers[x]);
                                    });
                                });
                            }
                        }
                    }
                }
            });
        });
    }
}
;
//# sourceMappingURL=customer.js.map