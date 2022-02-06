//module imports
import { checkIfFormIsFilled, checkIfOrderIsValid } from "./formCheck.js";
import * as htmlCodeStrings from "./htmlCodeStrings.js";
import { AdminData, Amount, Customer, LoginData, Order, Product, SearchTerm, UserData } from "./interfaces.js";
import { addCustomerComm, addProductComm, addUserComm, allAdminDataComm, allProductDataComm, changeAdminPrivilegesComm, checkLoginOrAdminComm, createOrderComm, searchCustomerComm, searchOrderComm, searchProductComm } from "./serverCommunication.js";

//Grab HTML-Elements
let body: HTMLElement = <HTMLElement>document.getElementById("body");

//variables
let adminPrivileges: boolean = false;
let reloadUsableData: LoginData;
let firstPush: number = 1;

export async function startBuilding(usableData: LoginData, reload?: string): Promise<void> {
    reloadUsableData = usableData;
    usableData.ServerId = "BuildSite";

    if (await checkLoginOrAdminComm(usableData) == true) { adminPrivileges = true; }
    else adminPrivileges = false;

    if (reload != undefined) { insertHtml(usableData, reload); }
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
    let bttnAddOrder: HTMLButtonElement = <HTMLButtonElement>document.getElementById("createOrder");
    let bttnSearchCustomer: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchCustomer");
    //Grab HTML Elements after insertion

    if (adminPrivileges == true) {
        bttnChangeAdmin.addEventListener("click", function (): void { changeHtml("changeAdmin"); });
        bttnAddUser.addEventListener("click", function (): void { changeHtml("addUser"); });
        bttnAddProduct.addEventListener("click", function (): void { changeHtml("addProduct"); });
    }

    bttnSearchProduct.addEventListener("click", function (): void { changeHtml("searchProduct"); });
    bttnAddCustomer.addEventListener("click", function (): void { changeHtml("addCustomer"); });
    bttnSearchOrder.addEventListener("click", function (): void { changeHtml("searchOrder"); });
    bttnAddOrder.addEventListener("click", function (): void { changeHtml("addOrder"); });
    bttnSearchCustomer.addEventListener("click", function (): void { changeHtml("searchCustomer"); });


}


function changeHtml(site: string): void {

    if (site == "addUser") { addUser(); } //generate Form to add new User !!check for already existing Username
    if (site == "changeAdmin") { changeAdmin(); } //retrieve all User and generate Buttons to set them as Admin
    if (site == "addProduct") { newProduct(); } //generate Form to add new Product !!check for duplicate ID and mandatory fields to fill
    if (site == "searchProduct") { searchProduct(); } //generate Form to search for Product !!option to edit product
    if (site == "addCustomer") { addCustomer(); } //generate Form to fill with Customerinformation !!check for unique ID
    if (site == "searchCustomer") { searchCustomer(); } //generate Form to search for Customer !!option to edit customer
    if (site == "addOrder") { createOrder("one"); } //generate Form to add Order !!check for unique ID
    if (site == "searchOrder") {
        searchOrder();  //generate Form to search for Order !! option to edit order

    }
}


function addUser(): void {
    //Grab HTML Elements before insertion
    let changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
    //Grab HTML Elements before insertion

    changeSite.innerHTML = htmlCodeStrings.addUserPage;

    //Grab HTML Elements after insertion
    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    let submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    let response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");
    //Grab HTML Elements after insertion  

    submit.addEventListener("click", async function (): Promise<void> {

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
    let changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
    //Grab HTML Elements before insertion

    changeSite.innerHTML = htmlCodeStrings.tableHeaderUser;

    //Grab HTML Elements after insertion
    let table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");
    let username: HTMLCollection = document.getElementsByClassName("username");
    let privileges: HTMLCollection = document.getElementsByClassName("privileges");
    let changeButton: HTMLCollection = document.getElementsByClassName("changeButton");
    //Grab HTML Elements after insertion

    let adminData: AdminData[] = JSON.parse(JSON.stringify((await allAdminDataComm()).replace(/%2B/g, " ")));

    for (let x: number = 0; x < adminData.length; x++) { //Build all Table Entrys

        table.innerHTML += htmlCodeStrings.tableBodyUser;

        username[x].textContent = adminData[x].Username;
        privileges[x].textContent = adminData[x].Admin;



    }

    for (let x: number = 0; x < adminData.length; x++) {

        changeButton[x].addEventListener("click", async function (): Promise<void> {

            if (await changeAdminPrivilegesComm(adminData[x].Username) == "true") {

                changeAdmin();
                startBuilding(reloadUsableData, "reload");

            }
            else startBuilding(reloadUsableData);



        });
    }
}


function newProduct(): void {
    //Grab HTML Elements before insertion
    let changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
    //Grab HTML Elements before insertion

    changeSite.innerHTML = htmlCodeStrings.createProduct;

    //Grab HTML Elements after insertion
    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    let submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    let response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");
    //Grab HTML Elements after insertion  

    submit.addEventListener("click", async function (): Promise<void> {

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

function searchProduct(): void {
    //Grab HTML Elements before insertion
    let changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
    //Grab HTML Elements before insertion

    changeSite.innerHTML = htmlCodeStrings.searchProductForm;

    //Grab HTML Elements after insertion
    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    let submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    let response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");
    //Grab HTML Elements after insertion  

    submit.addEventListener("click", async function (): Promise<void> {

        let formData: FormData = new FormData(form);

        if (checkIfFormIsFilled(formData, 1) == true) {

            let formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
            let usableData: SearchTerm = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
            let foundProduct: Product = JSON.parse((await searchProductComm(usableData)).replace(/%2B/g, " "));

            if (foundProduct == null) { response.innerText = "No product found"; }
            else {

                changeSite.innerHTML = htmlCodeStrings.tableHeaderProduct;

                //Grab HTML Elements after insertion
                let table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");
                //Grab HTML Elements after insertion

                //Build one table entry
                table.innerHTML += htmlCodeStrings.tableBodyProduct;

                //Grab HTML Elements after insertion
                let id: HTMLCollection = document.getElementsByClassName("id");
                let description: HTMLCollection = document.getElementsByClassName("description");
                let meDate: HTMLCollection = document.getElementsByClassName("medate");
                let price: HTMLCollection = document.getElementsByClassName("price");
                let standardDeliveryTime: HTMLCollection = document.getElementsByClassName("standarddeliverytime");
                let minBG: HTMLCollection = document.getElementsByClassName("minbg");
                let maxBG: HTMLCollection = document.getElementsByClassName("maxbg");
                let discountBG: HTMLCollection = document.getElementsByClassName("discountbg");
                let discount: HTMLCollection = document.getElementsByClassName("discount");
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

}

function addCustomer(): void {
    //Grab HTML Elements before insertion
    let changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
    //Grab HTML Elements before insertion

    changeSite.innerHTML = htmlCodeStrings.createCustomer;

    //Grab HTML Elements after insertion
    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    let submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    let response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");
    //Grab HTML Elements after insertion  

    submit.addEventListener("click", async function (): Promise<void> {

        let formData: FormData = new FormData(form);

        if (checkIfFormIsFilled(formData, 4) == true) {

            let formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
            let usableData: Customer = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

            if (await addCustomerComm(usableData) == true) {

                response.innerText = "Customer added";

            }
            else response.innerText = "ID already in use. Retry with different ID";

        }


    });

}

function searchCustomer(): void {
    //Grab HTML Elements before insertion
    let changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
    //Grab HTML Elements before insertion

    changeSite.innerHTML = htmlCodeStrings.searchCustomerForm;

    //Grab HTML Elements after insertion
    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    let submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    let response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");
    //Grab HTML Elements after insertion  

    submit.addEventListener("click", async function (): Promise<void> {

        let formData: FormData = new FormData(form);

        if (checkIfFormIsFilled(formData, 1) == true) {

            let formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
            let usableData: SearchTerm = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

            let foundCustomer: Customer = JSON.parse((await searchCustomerComm(usableData)).replace(/%2B/g, " "));

            if (foundCustomer == null) { response.innerText = "No Customer found"; }
            else {


                changeSite.innerHTML = htmlCodeStrings.tableHeaderCustomer;

                //Grab HTML Elements after insertion
                let table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");
                //Grab HTML Elements after insertion

                //Build one table entry
                table.innerHTML += htmlCodeStrings.tableBodyCustomer;

                //Grab HTML Elements after insertion
                let id: HTMLCollection = document.getElementsByClassName("id");
                let name: HTMLCollection = document.getElementsByClassName("name");
                let adress: HTMLCollection = document.getElementsByClassName("adress");
                let discount: HTMLCollection = document.getElementsByClassName("discount");
                //Grab HTML Elements after insertion
                console.log(foundCustomer.Name);
                id[0].textContent = foundCustomer.ID;
                name[0].textContent = foundCustomer.Name;
                adress[0].textContent = foundCustomer.Adress;
                discount[0].textContent = foundCustomer.Discount.toString() + " %";
            }

        }


    });

}

function searchOrder(): void {
    //Grab HTML Elements before insertion
    let changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
    //Grab HTML Elements before insertion

    changeSite.innerHTML = htmlCodeStrings.searchOrderForm;

    //Grab HTML Elements after insertion
    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    let submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    let response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");
    //Grab HTML Elements after insertion  

    submit.addEventListener("click", async function (): Promise<void> {

        let formData: FormData = new FormData(form);

        if (checkIfFormIsFilled(formData, 1) == true) {

            let formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
            let usableData: SearchTerm = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

            let foundOrder: Order = JSON.parse((await searchOrderComm(usableData)).replace(/%2B/g, " "));

            if (foundOrder == null) { response.innerText = "No Order found"; }
            else {


                changeSite.innerHTML = htmlCodeStrings.tableHeaderCustomer;

                //Grab HTML Elements after insertion
                let table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");
                //Grab HTML Elements after insertion

                //Build one table entry
                table.innerHTML += htmlCodeStrings.tableBodyCustomer;

                //Grab HTML Elements after insertion
                let id: HTMLCollection = document.getElementsByClassName("id");
                let description: HTMLCollection = document.getElementsByClassName("description");
                let orderDate: HTMLCollection = document.getElementsByClassName("orderdate");
                let deliveryDate: HTMLCollection = document.getElementsByClassName("deliverydate");
                let price: HTMLCollection = document.getElementsByClassName("price");
                let orderPositions: HTMLCollection = document.getElementsByClassName("orderpositions");
                //Grab HTML Elements after insertion

                id[0].textContent = foundOrder.ID;
                description[0].textContent = foundOrder.Description;
                orderDate[0].textContent = foundOrder.OrderDate.toString();
                deliveryDate[0].textContent = foundOrder.DeliveryDate.toString() + " days";
                price[0].textContent = foundOrder.Price.toString() + " €";

                for (let x: number = 0; foundOrder.OrderPositions.length < x; x++) {

                    orderPositions[0].textContent += "Order Position" + x + ": ";

                    Object.entries(foundOrder.OrderPositions).forEach(
                        ([key, value]) => console.log(key, value)
                    );

                }

            }

        }


    });

}


async function createOrder(step: string, order?: Order): Promise<void> {

    //Grab HTML Elements before insertion
    let changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
    //Grab HTML Elements before insertion

    if (step == "one") {

        changeSite.innerHTML = htmlCodeStrings.createOrderForm;

        //Grab HTML Elements after insertion
        let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
        let submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
        //Grab HTML Elements after insertion  

        submit.addEventListener("click", async function (): Promise<void> {

            let formData: FormData = new FormData(form);

            if (checkIfFormIsFilled(formData, 2) == true) {

                let formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
                let order: Order = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

                createOrder("two", order);

            }

        });

    }

    else if (step == "two") {

       

        changeSite.innerHTML = htmlCodeStrings.tableHeaderCreateOrder;

        let submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");

        submit.addEventListener("click",async function (): Promise<void> {

            if(sessionStorage.getItem("order") != undefined) {

                confirmOrderOverview();

            }

        });

        let productData: Product[] = JSON.parse(JSON.stringify((await allProductDataComm())).replace(/%2B/g, " "));

        //Grab HTML Elements after insertion
        let table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");
        //Grab HTML Elements after insertion

        //Build table entrys
        for (let x: number = 0; x < productData.length; x++) { //Build all Table Entrys

            table.innerHTML += htmlCodeStrings.tableBodyCreateOrder;

            //Grab HTML Elements after insertion
            let id: HTMLCollection = document.getElementsByClassName("id");
            let description: HTMLCollection = document.getElementsByClassName("description");
            let meDate: HTMLCollection = document.getElementsByClassName("medate");
            let price: HTMLCollection = document.getElementsByClassName("price");
            let standardDeliveryTime: HTMLCollection = document.getElementsByClassName("standarddeliverytime");
            let minBG: HTMLCollection = document.getElementsByClassName("minbg");
            let maxBG: HTMLCollection = document.getElementsByClassName("maxbg");
            let discountBG: HTMLCollection = document.getElementsByClassName("discountbg");
            let discount: HTMLCollection = document.getElementsByClassName("discount");

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

        for (let x: number = 0; x < productData.length; x++) {

            let amount: HTMLCollectionOf<HTMLFormElement> = <HTMLCollectionOf<HTMLFormElement>>document.getElementsByClassName("amount");
            let button: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName("addButton");
            let amountField: HTMLCollectionOf<HTMLInputElement> = <HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName("amountField");
            let response: HTMLCollectionOf<HTMLParagraphElement> = <HTMLCollectionOf<HTMLParagraphElement>>document.getElementsByClassName("response");
            

            button[x].addEventListener("click", async function (): Promise<void> {

                let formData: FormData = new FormData(amount[x]);
                let formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
                let usableformData: Amount = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

                if (checkIfFormIsFilled(formData, 1) == true) {

                    if(checkIfOrderIsValid(usableformData, productData, x) == true) {
                        
                        response[x].style.color = "black"
                        amountField[x].value = "";
                        response[x].innerText = "Sucessful added"

                        addAmountToOrder(usableformData, productData, x, order);

                    }
                    else {
                        response[x].style.color = "red"
                        response[x].style.fontSize = "10pt"
                        amountField[x].value = "";
                        response[x].innerText = "Invalid Amount or ME Date"

                    }

                }

            });
        }

    }


}

function addAmountToOrder(amountData: Amount, productData: Product[], productNumber: number, order: Order): void {

    if(firstPush == 1) {
    
    order.OrderPositions = [[productData[productNumber], amountData]];
    firstPush++;
    }
    else {

    order.OrderPositions.push([productData[productNumber], amountData]);

    }

    sessionStorage.setItem("order" , JSON.stringify(order))

}

function confirmOrderOverview(): void {

//Grab HTML Elements before insertion
let changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
//Grab HTML Elements before insertion

changeSite.innerHTML = htmlCodeStrings.HeaderConfirmOrder;

//Grab HTML Elements after insertion
let orderId: HTMLDivElement = <HTMLDivElement>document.getElementById("orderId");
let orderDescription: HTMLDivElement = <HTMLDivElement>document.getElementById("description");
let orderDelDate: HTMLDivElement = <HTMLDivElement>document.getElementById("deliveryDate");
let orderPrice: HTMLDivElement = <HTMLDivElement>document.getElementById("price");
let orderPositions: HTMLDivElement = <HTMLDivElement>document.getElementById("orderPositions");
//Grab HTML Elements after insertion

let order: Order = JSON.parse(sessionStorage.getItem("order")); //return to Object

orderId.innerText = order.ID;
orderDescription.innerText = order.Description;
orderDelDate.innerText = "" ;//Del Date berechenn;
orderPrice.innerText = "" ; //Price berechnen;

for(let x: number = 0; order.OrderPositions.length; x++) {

    //Positions einfügen inHTML

}


}


