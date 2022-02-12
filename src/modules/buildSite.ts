/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
// module imports
import { checkIfFormIsFilled, checkIfOrderIsValid } from "./formCheck.js";
import * as htmlCodeStrings from "./htmlCodeStrings.js";
import { AdminData, Amount, Customer, LoginData, Order, Product, SearchTerm, UserData } from "./interfaces.js";
import { addCustomerComm, addProductComm, addUserComm, allAdminDataComm, allCustomerDataComm, allOrderDataComm, allProductDataComm, changeAdminPrivilegesComm, checkForOrderId, checkLoginOrAdminComm, createOrderComm, editCustomerComm, editOrderComm, editProductComm, searchCustomerComm, searchOrderComm, searchProductComm } from "./serverCommunication.js";

// Grab HTML-Elements
const body: HTMLElement = <HTMLElement>document.getElementById("body");

// variables
let adminPrivileges: boolean = false;
let reloadUsableData: LoginData;

export async function startBuilding (usableData: LoginData, reload?: string): Promise<void> {
  reloadUsableData = usableData;
  usableData.ServerId = "BuildSite";

  if (await checkLoginOrAdminComm(usableData) == true) {
    adminPrivileges = true;
  }
  else adminPrivileges = false;

  if (reload != undefined) {
    insertHtml(usableData, reload);
  }
  else insertHtml(usableData);
}

function insertHtml (usableData: LoginData, reload?: string): void {
  body.innerHTML = htmlCodeStrings.loggedInPage;

  if (reload != undefined) {
    changeAdmin();
  }

  // Grab HTML Elements after insertion
  const userName: HTMLElement = <HTMLElement>document.getElementById("userName");
  // Grab HTML Elements after insertion

  userName.innerText += " " + usableData.Username;

  adminButtons();
}

function adminButtons (): void {
  // Grab HTML Elements after insertion
  const bttnChangeAdmin: HTMLButtonElement = <HTMLButtonElement>document.getElementById("changeAdmin");
  const bttnAddUser: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addUser");
  const bttnAddProduct: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addProduct");
  // Grab HTML Elements after insertion

  if (adminPrivileges == false) {
    bttnChangeAdmin.outerHTML = "";
    bttnAddProduct.outerHTML = "";
    bttnAddUser.outerHTML = "";
  }

  addEventListeners();
}

function addEventListeners (): void {
  // Grab HTML Elements after insertion
  const bttnChangeAdmin: HTMLButtonElement = <HTMLButtonElement>document.getElementById("changeAdmin");
  const bttnAddUser: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addUser");
  const bttnAddProduct: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addProduct");
  const bttnSearchProduct: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchProduct");
  const bttnAddCustomer: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addCustomer");
  const bttnSearchOrder: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchOrder");
  const bttnAddOrder: HTMLButtonElement = <HTMLButtonElement>document.getElementById("createOrder");
  const bttnSearchCustomer: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchCustomer");
  // Grab HTML Elements after insertion

  if (adminPrivileges == true) {
    bttnChangeAdmin.addEventListener("click", function (): void {
      changeHtml("changeAdmin");
    });
    bttnAddUser.addEventListener("click", function (): void {
      changeHtml("addUser");
    });
    bttnAddProduct.addEventListener("click", function (): void {
      changeHtml("addProduct");
    });
  }

  bttnSearchProduct.addEventListener("click", function (): void {
    changeHtml("searchProduct");
  });
  bttnAddCustomer.addEventListener("click", function (): void {
    changeHtml("addCustomer");
  });
  bttnSearchOrder.addEventListener("click", function (): void {
    changeHtml("searchOrder");
  });
  bttnAddOrder.addEventListener("click", function (): void {
    changeHtml("addOrder");
  });
  bttnSearchCustomer.addEventListener("click", function (): void {
    changeHtml("searchCustomer");
  });
}

function changeHtml (site: string): void {
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

function addUser (): void {
  // Grab HTML Elements before insertion
  const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
  // Grab HTML Elements before insertion

  changeSite.innerHTML = htmlCodeStrings.addUserPage;

  // Grab HTML Elements after insertion
  const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
  const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
  const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");
  // Grab HTML Elements after insertion

  submit.addEventListener("click", async function (): Promise<void> {
    const formData: FormData = new FormData(form);
    if (checkIfFormIsFilled(formData, 3) == true) {
      const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
      const usableData: UserData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

      if (await addUserComm(usableData) == true) {
        response.innerText = "User added";
      }
      else response.innerText = "Username already in use. Retry with different Username";
    }
  });
}

async function changeAdmin (): Promise<void> {
  // Grab HTML Elements before insertion
  const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
  // Grab HTML Elements before insertion

  changeSite.innerHTML = htmlCodeStrings.tableHeaderUser;

  // Grab HTML Elements after insertion
  const table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");
  const username: HTMLCollection = document.getElementsByClassName("username");
  const privileges: HTMLCollection = document.getElementsByClassName("privileges");
  const changeButton: HTMLCollection = document.getElementsByClassName("changeButton");
  // Grab HTML Elements after insertion

  const adminData: AdminData[] = JSON.parse(JSON.stringify((await allAdminDataComm())).replace(/%2B/g, " "));

  for (let x: number = 0; x < adminData.length; x++) { // Build all Table Entrys
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

function newProduct (): void {
  // Grab HTML Elements before insertion
  const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
  // Grab HTML Elements before insertion

  changeSite.innerHTML = htmlCodeStrings.createProduct;

  // Grab HTML Elements after insertion
  const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
  const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
  const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");
  // Grab HTML Elements after insertion

  submit.addEventListener("click", async function (): Promise<void> {
    const formData: FormData = new FormData(form);

    if (checkIfFormIsFilled(formData, 9) == true) {
      const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
      const usableData: Product = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

      if (await addProductComm(usableData) == true) {
        response.innerText = "Product added";
      }
      else response.innerText = "ID already in use. Retry with different ID";
    }
  });
}

function searchProduct (): void {
  // Grab HTML Elements before insertion
  const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
  // Grab HTML Elements before insertion

  changeSite.innerHTML = htmlCodeStrings.searchProductForm;

  // Grab HTML Elements after insertion
  const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
  const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
  const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");
  // Grab HTML Elements after insertion

  submit.addEventListener("click", async function (): Promise<void> {
    const formData: FormData = new FormData(form);

    if (checkIfFormIsFilled(formData, 1) == true) {
      const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
      const usableData: SearchTerm = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
      const foundProducts: Product[] = JSON.parse((await searchProductComm(usableData)).replace(/%2B/g, " "));

      if (foundProducts.length == 0) {
        response.innerText = "No product found";
      }
      else {
        changeSite.innerHTML = htmlCodeStrings.tableHeaderProduct;

        // Grab HTML Elements after insertion
        const table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");
        // Grab HTML Elements after insertion

        for (let x: number = 0; x < foundProducts.length; x++) {
          // Build one table entry
          table.innerHTML += htmlCodeStrings.tableBodyProduct;
          table.innerHTML += htmlCodeStrings.editButton;
          table.innerHTML += htmlCodeStrings.statisticButton;

          // Grab HTML Elements after insertion
          const id: HTMLCollection = document.getElementsByClassName("id");
          const description: HTMLCollection = document.getElementsByClassName("description");
          const meDate: HTMLCollection = document.getElementsByClassName("medate");
          const price: HTMLCollection = document.getElementsByClassName("price");
          const standardDeliveryTime: HTMLCollection = document.getElementsByClassName("standarddeliverytime");
          const minBG: HTMLCollection = document.getElementsByClassName("minbg");
          const maxBG: HTMLCollection = document.getElementsByClassName("maxbg");
          const discountBG: HTMLCollection = document.getElementsByClassName("discountbg");
          const discount: HTMLCollection = document.getElementsByClassName("discount");

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

        const editBttn: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>> document.getElementsByClassName("editButton");
        const statisticBttn: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>> document.getElementsByClassName("statisticButton");

        for (let x: number = 0; x < editBttn.length; x++) {
          editBttn[x].addEventListener("click", async function (): Promise<void> {
            changeSite.innerHTML = htmlCodeStrings.changeProduct;

            const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
            const submit: HTMLFormElement = <HTMLFormElement>document.getElementById("submit");
            const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");

            submit.addEventListener("click", async function (): Promise<void> {
              const formData: FormData = new FormData(form);
              if (checkIfFormIsFilled(formData, 8) == true) {
                const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
                const usableData: Product = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                usableData.ID = foundProducts[x].ID;

                if (await editProductComm(usableData) == true) {
                  response.innerText = "Product changed";
                }
                else response.innerText = "Something went wrong. Try again.";
              }
            });
          });

          for (let x: number = 0; x < statisticBttn.length; x++) {
            statisticBttn[x].addEventListener("click", async function (): Promise<void> {
              showStatistic("product", foundProducts[x]);
            });
          }
        }
      }
    }
  });
}

function addCustomer (): void {
  // Grab HTML Elements before insertion
  const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
  // Grab HTML Elements before insertion

  changeSite.innerHTML = htmlCodeStrings.createCustomer;

  // Grab HTML Elements after insertion
  const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
  const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
  const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");
  // Grab HTML Elements after insertion

  submit.addEventListener("click", async function (): Promise<void> {
    const formData: FormData = new FormData(form);

    if (checkIfFormIsFilled(formData, 4) == true) {
      const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
      const usableData: Customer = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

      if (await addCustomerComm(usableData) == true) {
        response.innerText = "Customer added";
      }
      else response.innerText = "ID already in use. Retry with different ID";
    }
  });
}

function searchCustomer (): void {
  // Grab HTML Elements before insertion
  const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
  // Grab HTML Elements before insertion

  changeSite.innerHTML = htmlCodeStrings.searchCustomerForm;

  // Grab HTML Elements after insertion
  const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
  const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
  const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");
  // Grab HTML Elements after insertion

  submit.addEventListener("click", async function (): Promise<void> {
    const formData: FormData = new FormData(form);

    if (checkIfFormIsFilled(formData, 1) == true) {
      const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
      const usableData: SearchTerm = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
      const foundCustomers: Customer[] = JSON.parse((await searchCustomerComm(usableData)).replace(/%2B/g, " "));

      if (foundCustomers.length == 0) {
        response.innerText = "No Customer found";
      }
      else {
        changeSite.innerHTML = htmlCodeStrings.tableHeaderCustomer;

        // Grab HTML Elements after insertion
        const table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");
        // Grab HTML Elements after insertion

        for (let x: number = 0; x < foundCustomers.length; x++) {
          // Build one or more table entrys
          table.innerHTML += htmlCodeStrings.tableBodyCustomer;
          table.innerHTML += htmlCodeStrings.editButton;
          table.innerHTML += htmlCodeStrings.statisticButton;

          // Grab HTML Elements after insertion
          const id: HTMLCollection = document.getElementsByClassName("id");
          const name: HTMLCollection = document.getElementsByClassName("description");
          const adress: HTMLCollection = document.getElementsByClassName("adress");
          const discount: HTMLCollection = document.getElementsByClassName("discount");
          // Grab HTML Elements after insertion

          id[x].textContent = foundCustomers[x].ID;
          name[x].textContent = foundCustomers[x].Name.replace(/[+]/g, " ");
          adress[x].textContent = foundCustomers[x].Adress.replace(/[+]/g, " ");
          discount[x].textContent = foundCustomers[x].Discount.toString() + " %";
        }

        const editBttn: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>> document.getElementsByClassName("editButton");
        const statisticBttn: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>> document.getElementsByClassName("statisticButton");

        for (let x: number = 0; x < editBttn.length; x++) {
          editBttn[x].addEventListener("click", async function (): Promise<void> {
            changeSite.innerHTML = htmlCodeStrings.changeCustomer;

            const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
            const submit: HTMLFormElement = <HTMLFormElement>document.getElementById("submit");
            const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");

            submit.addEventListener("click", async function (): Promise<void> {
              const formData: FormData = new FormData(form);
              if (checkIfFormIsFilled(formData, 3) == true) {
                const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
                const usableData: Customer = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                usableData.ID = foundCustomers[x].ID;

                if (await editCustomerComm(usableData) == true) {
                  response.innerText = "Customer changed";
                }
                else response.innerText = "Something went wrong. Try again.";
              }
            });
          });

          for (let x: number = 0; x < statisticBttn.length; x++) {
            statisticBttn[x].addEventListener("click", async function (): Promise<void> {
              showStatistic("customer", foundCustomers[x]);
            });
          }
        }
      }
    }
  });
}

function searchOrder (): void {
  // Grab HTML Elements before insertion
  const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
  // Grab HTML Elements before insertion

  changeSite.innerHTML = htmlCodeStrings.searchOrderForm;

  // Grab HTML Elements after insertion
  const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
  const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
  const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");
  // Grab HTML Elements after insertion

  submit.addEventListener("click", async function (): Promise<void> {
    const formData: FormData = new FormData(form);

    if (checkIfFormIsFilled(formData, 1) == true) {
      const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
      const usableData: SearchTerm = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

      const foundOrders: Order[] = JSON.parse((await searchOrderComm(usableData)).replace(/%2B/g, " "));
      const allCustomer: Customer[] = JSON.parse((await allCustomerDataComm()).replace(/%2B/g, " "));

      if (foundOrders.length == 0) {
        response.innerText = "No Order found";
      }
      else {
        changeSite.innerHTML = htmlCodeStrings.tableHeaderOrder;

        // Grab HTML Elements after insertion
        const table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");
        // Grab HTML Elements after insertion

        // Build one or more table entrys

        for (let x = 0; x < foundOrders.length; x++) {
          table.innerHTML += htmlCodeStrings.tableBodyOrder;
          table.innerHTML += htmlCodeStrings.editButton;

          // Grab HTML Elements after insertion
          const id: HTMLCollection = document.getElementsByClassName("id");
          const description: HTMLCollection = document.getElementsByClassName("description");
          const customer: HTMLCollection = document.getElementsByClassName("customer");
          const orderDate: HTMLCollection = document.getElementsByClassName("orderdate");
          const deliveryDate: HTMLCollection = document.getElementsByClassName("deliverydate");
          const price: HTMLCollection = document.getElementsByClassName("price");
          const orderPositions: HTMLCollection = document.getElementsByClassName("orderpositions");
          // Grab HTML Elements after insertion

          // Fix Parse Error with Date from Database
          const newOrderDate: Date = new Date(foundOrders[x].OrderDate);
          const newDeliveryDate: Date = new Date(foundOrders[x].DeliveryDate);

          id[x].textContent = foundOrders[x].ID;
          description[x].textContent = foundOrders[x].Description;

          let foundCustomerName: string = "";
          for (let x = 0; x < foundOrders.length; x++) {
            if (allCustomer[x].ID == foundOrders[x].Customer) {
              foundCustomerName = allCustomer[x].Name;
            }
          }

          let foundCustomerDiscount: number = 0;
          for (let x = 0; x < foundOrders.length; x++) {
            if (allCustomer[x].ID == foundOrders[x].Customer) {
              foundCustomerDiscount = allCustomer[x].Discount;
            }
          }

          customer[x].textContent = foundCustomerName;

          orderDate[x].textContent = "Order Date: " + (newOrderDate.getMonth() + 1) + "." + newOrderDate.getDate().toString() + "." + newOrderDate.getFullYear().toString();
          deliveryDate[x].textContent = "Delivery Date: " + (newDeliveryDate.getMonth() + 1) + "." + newDeliveryDate.getDate().toString() + "." + newDeliveryDate.getFullYear().toString();
          price[x].textContent = foundOrders[x].Price.toString() + " €";

          for (let y: number = 0; y < foundOrders[x].OrderPositions.length; y++) {
            orderPositions[x].textContent += " Order Position " + (y + 1) + ": " + foundOrders[x].OrderPositions[y][0].Description + " x " + foundOrders[x].OrderPositions[y][1].Amount + ", ";
          }

          const editBttn: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>> document.getElementsByClassName("editButton");

          for (let x: number = 0; x < editBttn.length; x++) {
            editBttn[x].addEventListener("click", async function (): Promise<void> {
              changeOrder("one", foundOrders[x].ID, foundOrders[x], foundCustomerName, foundCustomerDiscount);
            });
          }
        }
      }
    }
  });
}

async function createOrder (step: string, order?: Order, customerName?: string, customerDiscount?: number): Promise<void> {
  // Grab HTML Elements before insertion
  const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
  // Grab HTML Elements before insertion

  if (step == "one") {
    changeSite.innerHTML = htmlCodeStrings.createOrderForm;

    // Grab HTML Elements after insertion
    const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    const customer: HTMLSelectElement = <HTMLSelectElement>document.getElementById("customer");
    const response: HTMLDivElement = <HTMLDivElement>document.getElementById("response");
    // Grab HTML Elements after insertion

    const allCustomer: Customer[] = JSON.parse((await allCustomerDataComm()).replace(/%2B/g, " "));

    for (let x = 0; x < allCustomer.length; x++) {
      customer.innerHTML += "<option value=" + x + "  >" + allCustomer[x].ID + ",  " + allCustomer[x].Name + "</option>";
    }

    submit.addEventListener("click", async function (): Promise<void> {
      const formData: FormData = new FormData(form);

      const usedId: SearchTerm = {
        SearchTerm: formData.get("ID").toString(),
        ServerId: ""
      };

      if (checkIfFormIsFilled(formData, 2) == true && await checkForOrderId(usedId) == true) {
        const order: Order = {
          ID: "",
          Customer: "",
          Description: "",
          OrderDate: new Date(),
          DeliveryDate: new Date(),
          Price: 0,
          ServerId: ""
        };

        const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        const usableformData: Order = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
        order.ID = usableformData.ID;
        order.Customer = usableformData.Customer;
        order.Description = usableformData.Description;
        order.Customer = allCustomer[customer.selectedIndex].ID;
        createOrder("two", order, allCustomer[customer.selectedIndex].Name, allCustomer[customer.selectedIndex].Discount);
      }
      else if (checkIfFormIsFilled(formData, 2) == true && await checkForOrderId(usedId) == false) {
        response.innerHTML = "ID already in use. Try with different.";
      }
    });
  }
  else if (step == "two") {
    changeSite.innerHTML = htmlCodeStrings.tableHeaderCreateOrder;

    const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");

    submit.addEventListener("click", function (): void {
      if (order.OrderPositions != undefined) {
        confirmOrderOverview(order, customerName, customerDiscount);
      }
      else {
        const response: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("response");
        response.innerText = "Please add at least one Position to your Order";
      }
    });

    const productData: Product[] = await allProductDataComm();

    // Grab HTML Elements after insertion
    const table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");
    // Grab HTML Elements after insertion

    // Build table entrys
    for (let x: number = 0; x < productData.length; x++) { // Build all Table Entrys
      table.innerHTML += htmlCodeStrings.tableBodyCreateOrder;

      // Grab HTML Elements after insertion
      const id: HTMLCollection = document.getElementsByClassName("id");
      const description: HTMLCollection = document.getElementsByClassName("description");
      const meDate: HTMLCollection = document.getElementsByClassName("medate");
      const price: HTMLCollection = document.getElementsByClassName("price");
      const standardDeliveryTime: HTMLCollection = document.getElementsByClassName("standarddeliverytime");
      const minBG: HTMLCollection = document.getElementsByClassName("minbg");
      const maxBG: HTMLCollection = document.getElementsByClassName("maxbg");
      const discountBG: HTMLCollection = document.getElementsByClassName("discountbg");
      const discount: HTMLCollection = document.getElementsByClassName("discount");

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

    for (let x: number = 0; x < productData.length; x++) {
      const amount: HTMLCollectionOf<HTMLFormElement> = <HTMLCollectionOf<HTMLFormElement>>document.getElementsByClassName("amount");
      const button: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName("addButton");
      const amountField: HTMLCollectionOf<HTMLInputElement> = <HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName("amountField");
      const response: HTMLCollectionOf<HTMLParagraphElement> = <HTMLCollectionOf<HTMLParagraphElement>>document.getElementsByClassName("response");

      button[x].addEventListener("click", async function (): Promise<void> {
        const formData: FormData = new FormData(amount[x]);
        const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        const usableformData: Amount = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

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
    }
  }
}

function addAmountToOrder (amountData: Amount, productData: Product[], productNumber: number, order: Order): Order {
  if (order.OrderPositions == undefined) {
    order.OrderPositions = [[productData[productNumber], amountData]];
  }
  else {
    order.OrderPositions.push([productData[productNumber], amountData]);
  }

  return order;
}

function confirmOrderOverview (order: Order, customerName: string, customerDiscount: number, changeOrder?: boolean): void {
  // Grab HTML Elements before insertion
  const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
  // Grab HTML Elements before insertion

  if (changeOrder == true) {
    changeSite.innerHTML = htmlCodeStrings.HeaderChangeOrder;
  }
  else {
    changeSite.innerHTML = htmlCodeStrings.HeaderConfirmOrder;
  }

  // Grab HTML Elements after insertion
  const confirmBttn: HTMLDivElement = <HTMLDivElement>document.getElementById("confirm");
  const orderId: HTMLDivElement = <HTMLDivElement>document.getElementById("orderId");
  const orderCustomer: HTMLDivElement = <HTMLDivElement>document.getElementById("orderCustomer");
  const orderDescription: HTMLDivElement = <HTMLDivElement>document.getElementById("description");
  const orderDelDate: HTMLDivElement = <HTMLDivElement>document.getElementById("deliveryDate");
  const orderPrice: HTMLDivElement = <HTMLDivElement>document.getElementById("price");
  const orderPositions: HTMLDivElement = <HTMLDivElement>document.getElementById("orderPositions");
  // Grab HTML Elements after insertion

  confirmBttn.addEventListener("click", async function (): Promise<void> {
    if (changeOrder == true) {
      if (await editOrderComm(order) == true) {
        changeSite.innerHTML = "Order changed";
      }
      else {
        changeSite.innerHTML = "Something went wrong";
      }
    }
    else {
      if (await createOrderComm(order) == true) {
        changeSite.innerHTML = "Order added";
      }
      else {
        changeSite.innerHTML = "ID already in use";
      }
    }
  });

  // calculate latest StandarDeliverDate
  let highestDelivery: number = 0;
  for (let x = 0; x < order.OrderPositions.length; x++) {
    if (order.OrderPositions[x][0].StandardDeliveryTime >= highestDelivery) {
      highestDelivery = order.OrderPositions[x][0].StandardDeliveryTime;
    }
  }

  orderId.innerText = "Order ID: " + order.ID;

  orderCustomer.innerText = "Customer: " + customerName.replace("+", " ");

  orderDescription.innerText = "Order Description: " + order.Description;

  const time: number = +highestDelivery;
  order.DeliveryDate.setDate(order.DeliveryDate.getDate() + time);
  orderDelDate.innerText = "Delivery Date: " + (order.DeliveryDate.getMonth() + 1) + "." + order.DeliveryDate.getDate().toString() + "." + order.DeliveryDate.getFullYear().toString();

  // Calculate price
  let fullPrice: number = 0;
  for (let x: number = 0; x < order.OrderPositions.length; x++) {
    const price: number = +order.OrderPositions[x][0].Price;
    const amount: number = +order.OrderPositions[x][1].Amount;
    const discount: number = +order.OrderPositions[x][0].Discount;

    if (order.OrderPositions[x][0].DiscountBG <= order.OrderPositions[x][1].Amount) {
      fullPrice += (price * amount);
      fullPrice = fullPrice - (fullPrice * (discount / 100));
    }
    else {
      fullPrice += price * amount;
    };
  }
  order.Price = fullPrice - (fullPrice * (customerDiscount / 100));

  orderPrice.innerText = "Price: " + order.Price.toString() + "€";

  for (let x = 0; x < order.OrderPositions.length; x++) {
    orderPositions.innerText += "Description: " + order.OrderPositions[x][0].Description + "," + " Amount: " + order.OrderPositions[x][1].Amount;
    orderPositions.innerHTML += "<br>";
  }
}

// change Order

async function changeOrder (step: string, orderId: string, order?: Order, customerName?: string, customerDiscount?: number): Promise<void> {
  // Grab HTML Elements before insertion
  const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
  // Grab HTML Elements before insertion

  if (step == "one") {
    changeSite.innerHTML = htmlCodeStrings.changeOrderForm;

    // Grab HTML Elements after insertion
    const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    const customer: HTMLSelectElement = <HTMLSelectElement>document.getElementById("customer");
    // Grab HTML Elements after insertion

    const allCustomer: Customer[] = JSON.parse((await allCustomerDataComm()).replace(/%2B/g, " "));

    for (let x = 0; x < allCustomer.length; x++) {
      customer.innerHTML += "<option value=" + x + "  >" + allCustomer[x].ID + ",  " + allCustomer[x].Name + "</option>";
    }

    submit.addEventListener("click", async function (): Promise<void> {
      const formData: FormData = new FormData(form);

      if (checkIfFormIsFilled(formData, 1) == true) {
        const order: Order = {
          ID: "",
          Customer: "",
          Description: "",
          OrderDate: new Date(),
          DeliveryDate: new Date(),
          Price: 0,
          ServerId: ""
        };

        const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        const usableformData: Order = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
        order.ID = orderId;
        order.Customer = usableformData.Customer;
        order.Description = usableformData.Description;
        order.Customer = allCustomer[customer.selectedIndex].ID;
        changeOrder("two", orderId, order, allCustomer[customer.selectedIndex].Name, allCustomer[customer.selectedIndex].Discount);
      }
    });
  }
  else if (step == "two") {
    changeSite.innerHTML = htmlCodeStrings.tableHeaderCreateOrder;

    const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");

    submit.addEventListener("click", function (): void {
      if (order.OrderPositions != undefined) {
        confirmOrderOverview(order, customerName, customerDiscount, true);
      }
      else {
        const response: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("response");
        response.innerText = "Please add at least one Position to your Order";
      }
    });

    const productData: Product[] = await allProductDataComm();

    // Grab HTML Elements after insertion
    const table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");
    // Grab HTML Elements after insertion

    // Build table entrys
    for (let x: number = 0; x < productData.length; x++) { // Build all Table Entrys
      table.innerHTML += htmlCodeStrings.tableBodyCreateOrder;

      // Grab HTML Elements after insertion
      const id: HTMLCollection = document.getElementsByClassName("id");
      const description: HTMLCollection = document.getElementsByClassName("description");
      const meDate: HTMLCollection = document.getElementsByClassName("medate");
      const price: HTMLCollection = document.getElementsByClassName("price");
      const standardDeliveryTime: HTMLCollection = document.getElementsByClassName("standarddeliverytime");
      const minBG: HTMLCollection = document.getElementsByClassName("minbg");
      const maxBG: HTMLCollection = document.getElementsByClassName("maxbg");
      const discountBG: HTMLCollection = document.getElementsByClassName("discountbg");
      const discount: HTMLCollection = document.getElementsByClassName("discount");

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

    for (let x: number = 0; x < productData.length; x++) {
      const amount: HTMLCollectionOf<HTMLFormElement> = <HTMLCollectionOf<HTMLFormElement>>document.getElementsByClassName("amount");
      const button: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName("addButton");
      const amountField: HTMLCollectionOf<HTMLInputElement> = <HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName("amountField");
      const response: HTMLCollectionOf<HTMLParagraphElement> = <HTMLCollectionOf<HTMLParagraphElement>>document.getElementsByClassName("response");

      button[x].addEventListener("click", async function (): Promise<void> {
        const formData: FormData = new FormData(amount[x]);
        const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        const usableformData: Amount = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

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
    }
  }
}

async function showStatistic (statisticObject: string, usableData: Product|Customer): Promise<void> {
  const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
  const allOrders: Order[] = JSON.parse(await allOrderDataComm());
  const allCustomers: Customer[] = JSON.parse(await allCustomerDataComm());

  if (statisticObject == "product") {
    const newUsableData: Product = <Product> usableData;

    let orderedAmount: number = 0;
    let orderedOrders: number = 0;
    let totalTurnover: number = 0;
    let totalDiscount: number = 0;
    let customerID: string = "";

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
    const newUsableData: Customer = <Customer> usableData;

    let orderedArticles: string = " Ordered Articles: ";
    let totalTurnover: string = "";
    let totalDiscount: string = "";
    let counter: number = 1;

    for (let x = 0; x < allOrders.length; x++) {
      for (let y: number = 0; y < allOrders[x].OrderPositions.length; y++) {
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
}
