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
import { changeProduct, createProduct, editButton, searchProductForm, statisticButton, tableBodyProduct, tableHeaderProduct } from "./htmlCodeStrings.js";
import { ServerCommunication } from "./serverCommunication.js";
import { ShowStatistic } from "./showStatistic.js";
export class Product {
    constructor(id, description, meDate, price, standardDeliveryTime, minBG, maxBG, discountBG, discount, serverId) {
        this.id = id;
        this.description = description;
        this.meDate = meDate;
        this.price = price;
        this.standardDeliveryTime = standardDeliveryTime;
        this.minBG = minBG;
        this.maxBG = maxBG;
        this.discountBG = discountBG;
        this.discount = discount;
        this.serverId = serverId;
    }
    static addProduct() {
        // Grab HTML Elements before HMTL insertion
        const changeSite = document.getElementById("changeSite");
        // insert HTML
        changeSite.innerHTML = createProduct;
        // Grab HTML Elements after HTML insertion
        const form = document.getElementById("form");
        const submit = document.getElementById("submit");
        const response = document.getElementById("response");
        // add Event Listener to the submit Button
        submit.addEventListener("click", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const formData = new FormData(form);
                // check for filled Form and Regex --> if true add Product
                if (FormCheck.checkIfFormIsFilled(formData, 9) == true && FormCheck.checkForRegex(formData.get("id").toString(), "id") == true) {
                    const formParams = new URLSearchParams(formData);
                    const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                    if ((yield ServerCommunication.addProductComm(usableData)) == true) {
                        response.innerText = "Product added";
                    }
                    else
                        response.innerText = "ID already in use. Retry with different ID";
                }
                else if (FormCheck.checkIfFormIsFilled(formData, 9) == true && FormCheck.checkForRegex(formData.get("id").toString(), "id") == false) {
                    response.innerText = "ID must consist of three uppercase letters followed by three numbers.";
                }
            });
        });
    }
    static searchProduct() {
        // Grab HTML Elements before HMTL insertion
        const changeSite = document.getElementById("changeSite");
        // insert HTML
        changeSite.innerHTML = searchProductForm;
        // Grab HTML Elements after HMTL insertion
        const form = document.getElementById("form");
        const submit = document.getElementById("submit");
        const response = document.getElementById("response");
        // add Event Listener to the submit Button
        submit.addEventListener("click", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const formData = new FormData(form);
                // check for filled Form and Regex --> if true search product
                if (FormCheck.checkIfFormIsFilled(formData, 1) == true) {
                    const formParams = new URLSearchParams(formData);
                    const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                    const foundProducts = JSON.parse((yield ServerCommunication.searchProductComm(usableData)).replace(/%2B/g, " "));
                    if (foundProducts.length == 0) {
                        response.innerText = "No product found";
                    }
                    else {
                        // insert HMTL
                        changeSite.innerHTML = tableHeaderProduct;
                        // Grab HTML Elements after HTML insertion
                        const table = document.getElementById("table");
                        // Build table entrys for every found Product
                        for (let x = 0; x < foundProducts.length; x++) {
                            table.innerHTML += tableBodyProduct;
                            table.innerHTML += editButton;
                            table.innerHTML += statisticButton;
                            // Grab HTML Elements after HMTL insertion
                            const id = document.getElementsByClassName("id");
                            const description = document.getElementsByClassName("description");
                            const meDate = document.getElementsByClassName("medate");
                            const price = document.getElementsByClassName("price");
                            const standardDeliveryTime = document.getElementsByClassName("standarddeliverytime");
                            const minBG = document.getElementsByClassName("minbg");
                            const maxBG = document.getElementsByClassName("maxbg");
                            const discountBG = document.getElementsByClassName("discountbg");
                            const discount = document.getElementsByClassName("discount");
                            // Fill fields with Content
                            id[x].textContent = foundProducts[x].id;
                            description[x].textContent = foundProducts[x].description;
                            meDate[x].textContent = foundProducts[x].meDate.toString();
                            price[x].textContent = foundProducts[x].price.toString() + " €";
                            standardDeliveryTime[x].textContent = foundProducts[x].standardDeliveryTime.toString() + " days";
                            minBG[x].textContent = foundProducts[x].minBG.toString() + " pieces";
                            maxBG[x].textContent = foundProducts[x].maxBG.toString() + " pieces";
                            discountBG[x].textContent = foundProducts[x].discountBG.toString() + " pieces";
                            discount[x].textContent = foundProducts[x].discount.toString() + " €";
                        }
                        // Get edit and statistic Button
                        const editBttn = document.getElementsByClassName("editButton");
                        const statisticBttn = document.getElementsByClassName("statisticButton");
                        // Add Event Listeners with functionality to every edit Button
                        for (let x = 0; x < editBttn.length; x++) {
                            editBttn[x].addEventListener("click", function () {
                                return __awaiter(this, void 0, void 0, function* () {
                                    // Insert HTML
                                    changeSite.innerHTML = changeProduct;
                                    // Get HTML Elements
                                    const form = document.getElementById("form");
                                    const submit = document.getElementById("submit");
                                    const response = document.getElementById("response");
                                    // Add Event Listener to submit Button
                                    submit.addEventListener("click", function () {
                                        return __awaiter(this, void 0, void 0, function* () {
                                            // get Form Data
                                            const formData = new FormData(form);
                                            // check for filled Form --> if true edit Product
                                            if (FormCheck.checkIfFormIsFilled(formData, 8) == true) {
                                                const formParams = new URLSearchParams(formData);
                                                const usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                                                usableData.id = foundProducts[x].id;
                                                if ((yield ServerCommunication.editProductComm(usableData)) == true) {
                                                    response.innerText = "Product changed";
                                                }
                                                else
                                                    response.innerText = "Something went wrong. Try again.";
                                            }
                                        });
                                    });
                                });
                            });
                            // Add Event Listeners with functionality to every statistics Button
                            for (let x = 0; x < statisticBttn.length; x++) {
                                statisticBttn[x].addEventListener("click", function () {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        // show Statistics
                                        ShowStatistic.showStatistic("product", foundProducts[x]);
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
//# sourceMappingURL=product.js.map