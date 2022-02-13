var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// module imports
import { communication } from "../app.js";
import { Customer } from "./customer.js";
import { loggedInPage } from "./htmlCodeStrings.js";
import { Order } from "./order.js";
import { Product } from "./product.js";
import { User } from "./user.js";
// Grab HTML-Elements
const body = document.getElementById("body");
// variables
let adminPrivileges = false;
let reloadUsableData;
export class BuildSite {
    // check for Admin privileges and set variable
    static startBuilding(usableData, reload) {
        return __awaiter(this, void 0, void 0, function* () {
            reloadUsableData = usableData;
            usableData.serverId = "BuildSite";
            if ((yield communication.checkLoginOrAdminComm(usableData)) == true) {
                adminPrivileges = true;
            }
            else
                adminPrivileges = false;
            if (reload != undefined) {
                BuildSite.insertHtml(usableData, reload);
            }
            else
                BuildSite.insertHtml(usableData);
        });
    }
    static insertHtml(usableData, reload) {
        body.innerHTML = loggedInPage;
        if (reload != undefined) {
            User.changeAdmin(reloadUsableData);
        }
        // Grab HTML Elements after insertion
        const userName = document.getElementById("userName");
        // Grab HTML Elements after insertion
        userName.innerText += " " + usableData.username;
        BuildSite.adminButtons();
    }
    static adminButtons() {
        // Grab HTML Elements after HTML insertion
        const bttnChangeAdmin = document.getElementById("changeAdmin");
        const bttnAddUser = document.getElementById("addUser");
        const bttnAddProduct = document.getElementById("addProduct");
        //if Admin privileges are false --> disable Admin functionalities
        if (adminPrivileges == false) {
            bttnChangeAdmin.outerHTML = "";
            bttnAddProduct.outerHTML = "";
            bttnAddUser.outerHTML = "";
        }
        BuildSite.addEventListeners();
    }
    static addEventListeners() {
        // Grab HTML Elements after HTML insertion
        const bttnChangeAdmin = document.getElementById("changeAdmin");
        const bttnAddUser = document.getElementById("addUser");
        const bttnAddProduct = document.getElementById("addProduct");
        const bttnSearchProduct = document.getElementById("searchProduct");
        const bttnAddCustomer = document.getElementById("addCustomer");
        const bttnSearchOrder = document.getElementById("searchOrder");
        const bttnAddOrder = document.getElementById("createOrder");
        const bttnSearchCustomer = document.getElementById("searchCustomer");
        // add Event Listeners on every displayed Button
        if (adminPrivileges == true) {
            bttnChangeAdmin.addEventListener("click", function () {
                User.changeAdmin(reloadUsableData);
            });
            bttnAddUser.addEventListener("click", function () {
                User.addUser();
            });
            bttnAddProduct.addEventListener("click", function () {
                Product.addProduct();
            });
        }
        bttnSearchProduct.addEventListener("click", function () {
            Product.searchProduct();
        });
        bttnAddCustomer.addEventListener("click", function () {
            Customer.addCustomer();
        });
        bttnSearchOrder.addEventListener("click", function () {
            Order.searchOrder();
        });
        bttnAddOrder.addEventListener("click", function () {
            Order.createOrder("one");
        });
        bttnSearchCustomer.addEventListener("click", function () {
            Customer.searchCustomer();
        });
    }
}
//# sourceMappingURL=buildSite.js.map