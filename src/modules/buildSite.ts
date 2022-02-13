// Module Imports
import { Customer } from "./customer.js";
import { loggedInPage } from "./htmlCodeStrings.js";
import { LoginData } from "./interfaces.js";
import { Order } from "./order.js";
import { Product } from "./product.js";
import { ServerCommunication } from "./serverCommunication.js";
import { User } from "./user.js";

// Grab HTML-Elements
const body: HTMLElement = <HTMLElement>document.getElementById("body");

// variables
let adminPrivileges: boolean = false;
let reloadUsableData: LoginData;

export class BuildSite {
  // check for Admin privileges and set variable
  static async startBuilding (usableData: LoginData, reload?: string): Promise<void> {
    reloadUsableData = usableData;
    usableData.serverId = "BuildSite";

    if (await ServerCommunication.checkLoginOrAdminComm(usableData) == true) {
      adminPrivileges = true;
    }
    else adminPrivileges = false;

    if (reload != undefined) {
      BuildSite.insertHtml(usableData, reload);
    }
    else BuildSite.insertHtml(usableData);
  }

  static insertHtml (usableData: LoginData, reload?: string): void {
    body.innerHTML = loggedInPage;

    if (reload != undefined) {
      User.changeAdmin(reloadUsableData);
    }

    // Grab HTML Elements after insertion
    const userName: HTMLElement = <HTMLElement>document.getElementById("userName");
    // Grab HTML Elements after insertion

    userName.innerText += " " + usableData.username;

    BuildSite.adminButtons();
  }

  static adminButtons (): void {
    // Grab HTML Elements after HTML insertion
    const bttnChangeAdmin: HTMLButtonElement = <HTMLButtonElement>document.getElementById("changeAdmin");
    const bttnAddUser: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addUser");
    const bttnAddProduct: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addProduct");

    // if Admin privileges are false --> disable Admin functionalities
    if (adminPrivileges == false) {
      bttnChangeAdmin.outerHTML = "";
      bttnAddProduct.outerHTML = "";
      bttnAddUser.outerHTML = "";
    }

    BuildSite.addEventListeners();
  }

  static addEventListeners (): void {
  // Grab HTML Elements after HTML insertion
    const bttnChangeAdmin: HTMLButtonElement = <HTMLButtonElement>document.getElementById("changeAdmin");
    const bttnAddUser: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addUser");
    const bttnAddProduct: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addProduct");
    const bttnSearchProduct: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchProduct");
    const bttnAddCustomer: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addCustomer");
    const bttnSearchOrder: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchOrder");
    const bttnAddOrder: HTMLButtonElement = <HTMLButtonElement>document.getElementById("createOrder");
    const bttnSearchCustomer: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchCustomer");

    // add Event Listeners on every displayed Button
    if (adminPrivileges == true) {
      bttnChangeAdmin.addEventListener("click", function (): void {
        User.changeAdmin(reloadUsableData);
      });
      bttnAddUser.addEventListener("click", function (): void {
        User.addUser();
      });
      bttnAddProduct.addEventListener("click", function (): void {
        Product.addProduct();
      });
    }

    bttnSearchProduct.addEventListener("click", function (): void {
      Product.searchProduct();
    });
    bttnAddCustomer.addEventListener("click", function (): void {
      Customer.addCustomer();
    });
    bttnSearchOrder.addEventListener("click", function (): void {
      Order.searchOrder();
    });
    bttnAddOrder.addEventListener("click", function (): void {
      Order.createOrder("one"); // Design Pattern Factory
    });
    bttnSearchCustomer.addEventListener("click", function (): void {
      Customer.searchCustomer();
    });
  }
}
