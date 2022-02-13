// Module Imports
import { Customer } from "./customer.js";
import { FormCheck } from "./formCheck.js";
import { changeOrderForm, createOrderForm, editButton, HeaderChangeOrder, HeaderConfirmOrder, searchOrderForm, tableBodyCreateOrder, tableBodyOrder, tableHeaderCreateOrder, tableHeaderOrder } from "./htmlCodeStrings.js";
import { Amount, SearchTerm } from "./interfaces.js";
import { Product } from "./product.js";
import { ServerCommunication } from "./serverCommunication.js";

export class Order {
  id: string;
  customer: string;
  description: string;
  orderDate: Date;
  deliveryDate: Date;
  price: number;
  orderPositions?: [[Product, Amount]];
  serverId: string;

  constructor (id: string, customer: string, description: string, orderDate: Date, deliveryDate: Date, price: number, serverId: string, orderPositions?: [[Product, Amount]]) {
    this.id = id;
    this.customer = customer;
    this.description = description;
    this.orderDate = orderDate;
    this.deliveryDate = deliveryDate;
    this.price = price;
    this.orderPositions = orderPositions;
    this.serverId = serverId;
  }

  static async createOrder (step: string, order?: Order, customerName?: string, customerDiscount?: number): Promise<void> {
    // Grab HTML Elements before HMTL insertion
    const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");

    if (step == "one") {
      // Insert HMTL
      changeSite.innerHTML = createOrderForm;

      // Grab HTML Elements after HMTL insertion
      const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
      const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
      const customer: HTMLSelectElement = <HTMLSelectElement>document.getElementById("customer");
      const response: HTMLDivElement = <HTMLDivElement>document.getElementById("response");

      // Get all Customer Data
      const allCustomer: Customer[] = JSON.parse((await ServerCommunication.allCustomerDataComm()).replace(/%2B/g, " "));

      // Create options to choose Customer
      for (let x = 0; x < allCustomer.length; x++) {
        customer.innerHTML += "<option value=" + x + "  >" + allCustomer[x].id + ",  " + allCustomer[x].name + "</option>";
      }

      // Add Event Listeners to submit Button
      submit.addEventListener("click", async function (): Promise<void> {
        const formData: FormData = new FormData(form);

        // Get given Id to check for duplicate
        const usedId: SearchTerm = {
          searchTerm: formData.get("id").toString(),
          serverId: ""
        };

        // check for filled Form, duplicate Id and Regex
        if (FormCheck.checkIfFormIsFilled(formData, 2) == true && await ServerCommunication.checkForOrderId(usedId) == true && FormCheck.checkForRegex(formData.get("id").toString(), "id") == true) {
          // create Order
          const order: Order = {
            id: "",
            customer: "",
            description: "",
            orderDate: new Date(),
            deliveryDate: new Date(),
            price: 0,
            serverId: ""
          };
          // Get Form Data and parse into usable Object
          const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
          const usableformData: Order = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
          // fill Order with given information
          order.id = usableformData.id;
          order.customer = usableformData.customer;
          order.description = usableformData.description;
          order.customer = allCustomer[customer.selectedIndex].id;
          // call createOrder with the next step
          Order.createOrder("two", order, allCustomer[customer.selectedIndex].name, allCustomer[customer.selectedIndex].discount);
        }
        else if (FormCheck.checkIfFormIsFilled(formData, 2) == true && await ServerCommunication.checkForOrderId(usedId) == false) {
          response.innerHTML = "ID already in use. Try with different.";
        }
        else if (FormCheck.checkIfFormIsFilled(formData, 2) == true && FormCheck.checkForRegex(formData.get("id").toString(), "id") == true) {
          response.innerHTML = "ID must consist of three uppercase letters followed by three numbers.";
        }
      });
    }
    else if (step == "two") {
      // insert HMTL
      changeSite.innerHTML = tableHeaderCreateOrder;

      // get HMTL Elements
      const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");

      // add Event Listeners to submit Button
      submit.addEventListener("click", function (): void {
        // Show Order Overview if at least one product is added
        if (order.orderPositions != undefined) {
          Order.confirmOrderOverview(order, customerName, customerDiscount);
        }
        else {
          const response: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("response");
          response.innerText = "Please add at least one Position to your Order";
        }
      });

      // Get all Produts
      const productData: Product[] = JSON.parse(await ServerCommunication.allProductDataComm());

      // Grab HTML Elements after HTML insertion
      const table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");

      // Build table entrys for every Product
      for (let x: number = 0; x < productData.length; x++) {
        table.innerHTML += tableBodyCreateOrder;

        // Grab HTML Elements after HTML insertion
        const id: HTMLCollection = document.getElementsByClassName("id");
        const description: HTMLCollection = document.getElementsByClassName("description");
        const meDate: HTMLCollection = document.getElementsByClassName("medate");
        const price: HTMLCollection = document.getElementsByClassName("price");
        const standardDeliveryTime: HTMLCollection = document.getElementsByClassName("standarddeliverytime");
        const minBG: HTMLCollection = document.getElementsByClassName("minbg");
        const maxBG: HTMLCollection = document.getElementsByClassName("maxbg");
        const discountBG: HTMLCollection = document.getElementsByClassName("discountbg");
        const discount: HTMLCollection = document.getElementsByClassName("discount");

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
      for (let x: number = 0; x < productData.length; x++) {
        const amount: HTMLCollectionOf<HTMLFormElement> = <HTMLCollectionOf<HTMLFormElement>>document.getElementsByClassName("amount");
        const button: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName("addButton");
        const amountField: HTMLCollectionOf<HTMLInputElement> = <HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName("amountField");
        const response: HTMLCollectionOf<HTMLParagraphElement> = <HTMLCollectionOf<HTMLParagraphElement>>document.getElementsByClassName("response");

        button[x].addEventListener("click", async function (): Promise<void> {
          // get User Input
          const formData: FormData = new FormData(amount[x]);
          const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
          // parse into Amount Interface
          const usableformData: Amount = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

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
      }
    }
  }

  // push Product with given Amount to Order
  static addAmountToOrder (amountData: Amount, productData: Product[], productNumber: number, order: Order): Order {
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
  static confirmOrderOverview (order: Order, customerName: string, customerDiscount: number, changeOrder?: boolean): void {
    // Grab HTML Elements before HTML insertion
    const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");

    // check for Use (change Order functionalities or create Order) --> Insert HMTL
    if (changeOrder == true) {
      changeSite.innerHTML = HeaderChangeOrder;
    }
    else {
      changeSite.innerHTML = HeaderConfirmOrder;
    }

    // Grab HTML Elements after HTML insertion
    const confirmBttn: HTMLDivElement = <HTMLDivElement>document.getElementById("confirm");
    const orderId: HTMLDivElement = <HTMLDivElement>document.getElementById("orderId");
    const orderCustomer: HTMLDivElement = <HTMLDivElement>document.getElementById("orderCustomer");
    const orderDescription: HTMLDivElement = <HTMLDivElement>document.getElementById("description");
    const orderDelDate: HTMLDivElement = <HTMLDivElement>document.getElementById("deliveryDate");
    const orderPrice: HTMLDivElement = <HTMLDivElement>document.getElementById("price");
    const orderPositions: HTMLDivElement = <HTMLDivElement>document.getElementById("orderPositions");

    // Add Event Listener to confirm Button
    confirmBttn.addEventListener("click", async function (): Promise<void> {
      // confirm changed or added Order
      if (changeOrder == true) {
        if (await ServerCommunication.editOrderComm(order) == true) {
          changeSite.innerHTML = "Order changed";
        }
        else {
          changeSite.innerHTML = "Something went wrong";
        }
      }
      else {
        if (await ServerCommunication.createOrderComm(order) == true) {
          changeSite.innerHTML = "Order added";
        }
        else {
          changeSite.innerHTML = "ID already in use";
        }
      }
    });

    // calculate latest StandarDeliverDate
    let highestDelivery: number = 0;
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
    const time: number = +highestDelivery;
    order.deliveryDate.setDate(order.deliveryDate.getDate() + time);
    orderDelDate.innerText = "Delivery Date: " + (order.deliveryDate.getMonth() + 1) + "." + order.deliveryDate.getDate().toString() + "." + order.deliveryDate.getFullYear().toString();

    // Calculate full price and subtract Discount if needed
    let fullPrice: number = 0;
    let givenDiscount: number = 0;
    for (let x: number = 0; x < order.orderPositions.length; x++) {
      const price: number = +order.orderPositions[x][0].price;
      const amount: number = +order.orderPositions[x][1].amount;
      const discount: number = +order.orderPositions[x][0].discount;

      if (order.orderPositions[x][0].discountBG <= order.orderPositions[x][1].amount) {
        fullPrice += (price * amount);
        givenDiscount += fullPrice * (discount / 100);
        fullPrice = fullPrice - (fullPrice * (discount / 100));
      }
      else {
        fullPrice += price * amount;
      };
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
  static searchOrder (): void {
    // Grab HTML Elements before HTML insertion
    const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");

    // insert HTML
    changeSite.innerHTML = searchOrderForm;

    // Grab HTML Elements after HMTL insertion
    const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");

    // Add Event Listener to submit Button
    submit.addEventListener("click", async function (): Promise<void> {
      // Get User Input
      const formData: FormData = new FormData(form);

      // Check for filled Form --> if true search for Order
      if (FormCheck.checkIfFormIsFilled(formData, 1) == true) {
        // parse From Data to usable Object
        const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        const usableData: SearchTerm = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

        // retrieve the found Orders and all Customers to display information
        const foundOrders: Order[] = JSON.parse((await ServerCommunication.searchOrderComm(usableData)).replace(/%2B/g, " "));
        const allCustomer: Customer[] = JSON.parse((await ServerCommunication.allCustomerDataComm()).replace(/%2B/g, " "));

        if (foundOrders.length == 0) {
          response.innerText = "No Order found";
        }
        else {
          // insert HMTL
          changeSite.innerHTML = tableHeaderOrder;

          // Grab HTML Elements after HTML insertion
          const table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");

          // Build table entry for every found order
          for (let x = 0; x < foundOrders.length; x++) {
            // Insert HMTL
            table.innerHTML += tableBodyOrder;
            table.innerHTML += editButton;

            // Grab HTML Elements after HTML insertion
            const id: HTMLCollection = document.getElementsByClassName("id");
            const description: HTMLCollection = document.getElementsByClassName("description");
            const customer: HTMLCollection = document.getElementsByClassName("customer");
            const orderDate: HTMLCollection = document.getElementsByClassName("orderdate");
            const deliveryDate: HTMLCollection = document.getElementsByClassName("deliverydate");
            const price: HTMLCollection = document.getElementsByClassName("price");
            const orderPositions: HTMLCollection = document.getElementsByClassName("orderpositions");

            // Fix Parse Error with Date from Database
            const newOrderDate: Date = new Date(foundOrders[x].orderDate);
            const newDeliveryDate: Date = new Date(foundOrders[x].deliveryDate);

            // Display Information
            id[x].textContent = foundOrders[x].id;
            description[x].textContent = foundOrders[x].description;

            // Search right Customer
            let foundCustomerName: string = "";
            for (let x = 0; x < foundOrders.length; x++) {
              if (allCustomer[x].id == foundOrders[x].customer) {
                foundCustomerName = allCustomer[x].name;
              }
            }

            // Seatch Customer discount
            let foundCustomerDiscount: number = 0;
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
            for (let y: number = 0; y < foundOrders[x].orderPositions.length; y++) {
              orderPositions[x].textContent += " Order Position " + (y + 1) + ": " + foundOrders[x].orderPositions[y][0].description + " x " + foundOrders[x].orderPositions[y][1].amount + ", ";
            }

            // get edit Button
            const editBttn: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>> document.getElementsByClassName("editButton");

            // add Event Listener to every Edit Button to Edit the Order
            for (let x: number = 0; x < editBttn.length; x++) {
              editBttn[x].addEventListener("click", async function (): Promise<void> {
                Order.changeOrder("one", foundOrders[x].id, foundOrders[x], foundCustomerName, foundCustomerDiscount);
              });
            }
          }
        }
      }
    });
  }

  // change given Order
  static async changeOrder (step: string, orderId: string, order?: Order, customerName?: string, customerDiscount?: number): Promise<void> {
    // Grab HTML Elements before HTML insertion
    const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");

    if (step == "one") {
      changeSite.innerHTML = changeOrderForm;

      // Grab HTML Elements after HMTL insertion
      const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
      const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
      const customer: HTMLSelectElement = <HTMLSelectElement>document.getElementById("customer");

      // retrieve all Customers
      const allCustomer: Customer[] = JSON.parse((await ServerCommunication.allCustomerDataComm()).replace(/%2B/g, " "));

      // Generate options to choose Customer
      for (let x = 0; x < allCustomer.length; x++) {
        customer.innerHTML += "<option value=" + x + "  >" + allCustomer[x].id + ",  " + allCustomer[x].name + "</option>";
      }

      // Add Event Listener to submit Button
      submit.addEventListener("click", async function (): Promise<void> {
        const formData: FormData = new FormData(form);

        // Check for filled Form --> if true create Order
        if (FormCheck.checkIfFormIsFilled(formData, 1) == true) {
          const order: Order = {
            id: "",
            customer: "",
            description: "",
            orderDate: new Date(),
            deliveryDate: new Date(),
            price: 0,
            serverId: ""
          };

          // Fill Order with Data
          const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
          const usableformData: Order = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
          order.id = orderId;
          order.customer = usableformData.customer;
          order.description = usableformData.description;
          order.customer = allCustomer[customer.selectedIndex].id;
          // Call changeOrder with the next step
          Order.changeOrder("two", orderId, order, allCustomer[customer.selectedIndex].name, allCustomer[customer.selectedIndex].discount);
        }
      });
    }
    else if (step == "two") {
      // insert HMTL
      changeSite.innerHTML = tableHeaderCreateOrder;

      // Get submit Button
      const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");

      // Add Event Listener to submit Button
      submit.addEventListener("click", function (): void {
        if (order.orderPositions != undefined) {
          // check if at least one Product is added --> if true display Oder Overview
          Order.confirmOrderOverview(order, customerName, customerDiscount, true);
        }
        else {
          const response: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("response");
          response.innerText = "Please add at least one Position to your Order";
        }
      });

      // Get all Products
      const productData: Product[] = JSON.parse(await ServerCommunication.allProductDataComm());

      // Grab HTML Elements after HTML insertion
      const table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");

      // Build table entry for every Product
      for (let x: number = 0; x < productData.length; x++) {
        // Insert HMTL
        table.innerHTML += tableBodyCreateOrder;

        // Grab HTML Elements after HTML insertion
        const id: HTMLCollection = document.getElementsByClassName("id");
        const description: HTMLCollection = document.getElementsByClassName("description");
        const meDate: HTMLCollection = document.getElementsByClassName("medate");
        const price: HTMLCollection = document.getElementsByClassName("price");
        const standardDeliveryTime: HTMLCollection = document.getElementsByClassName("standarddeliverytime");
        const minBG: HTMLCollection = document.getElementsByClassName("minbg");
        const maxBG: HTMLCollection = document.getElementsByClassName("maxbg");
        const discountBG: HTMLCollection = document.getElementsByClassName("discountbg");
        const discount: HTMLCollection = document.getElementsByClassName("discount");

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
      for (let x: number = 0; x < productData.length; x++) {
        const amount: HTMLCollectionOf<HTMLFormElement> = <HTMLCollectionOf<HTMLFormElement>>document.getElementsByClassName("amount");
        const button: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName("addButton");
        const amountField: HTMLCollectionOf<HTMLInputElement> = <HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName("amountField");
        const response: HTMLCollectionOf<HTMLParagraphElement> = <HTMLCollectionOf<HTMLParagraphElement>>document.getElementsByClassName("response");

        button[x].addEventListener("click", async function (): Promise<void> {
          // Get Form Data and parse into Object
          const formData: FormData = new FormData(amount[x]);
          const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
          const usableformData: Amount = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

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
      }
    }
  }
};
