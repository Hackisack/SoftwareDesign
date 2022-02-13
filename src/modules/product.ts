// Module Imports
import { FormCheck } from "./formCheck.js";
import { changeProduct, createProduct, editButton, searchProductForm, statisticButton, tableBodyProduct, tableHeaderProduct } from "./htmlCodeStrings.js";
import { SearchTerm } from "./interfaces.js";
import { ServerCommunication } from "./serverCommunication.js";
import { ShowStatistic } from "./showStatistic.js";

export class Product {
  id: string;
  description: string;
  meDate: Date;
  price: number;
  standardDeliveryTime: number;
  minBG: number;
  maxBG: number;
  discountBG: number;
  discount: number;
  serverId: string;

  constructor (id: string, description: string, meDate: Date, price: number, standardDeliveryTime: number, minBG: number, maxBG: number, discountBG: number, discount: number, serverId: string) {
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

  static addProduct (): void {
    // Grab HTML Elements before HMTL insertion
    const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");

    // insert HTML
    changeSite.innerHTML = createProduct;

    // Grab HTML Elements after HTML insertion
    const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");

    // add Event Listener to the submit Button
    submit.addEventListener("click", async function (): Promise<void> {
      const formData: FormData = new FormData(form);

      // check for filled Form and Regex --> if true add Product
      if (FormCheck.checkIfFormIsFilled(formData, 9) == true && FormCheck.checkForRegex(formData.get("id").toString(), "id") == true) {
        const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        const usableData: Product = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

        if (await ServerCommunication.addProductComm(usableData) == true) {
          response.innerText = "Product added";
        }
        else response.innerText = "ID already in use. Retry with different ID";
      }
      else if (FormCheck.checkIfFormIsFilled(formData, 9) == true && FormCheck.checkForRegex(formData.get("id").toString(), "id") == false) {
        response.innerText = "ID must consist of three uppercase letters followed by three numbers.";
      }
    });
  }

  static searchProduct (): void {
    // Grab HTML Elements before HMTL insertion
    const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");

    // insert HTML
    changeSite.innerHTML = searchProductForm;

    // Grab HTML Elements after HMTL insertion
    const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");

    // add Event Listener to the submit Button
    submit.addEventListener("click", async function (): Promise<void> {
      const formData: FormData = new FormData(form);

      // check for filled Form and Regex --> if true search product
      if (FormCheck.checkIfFormIsFilled(formData, 1) == true) {
        const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        const usableData: SearchTerm = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
        const foundProducts: Product[] = JSON.parse((await ServerCommunication.searchProductComm(usableData)).replace(/%2B/g, " "));

        if (foundProducts.length == 0) {
          response.innerText = "No product found";
        }
        else {
          // insert HMTL
          changeSite.innerHTML = tableHeaderProduct;

          // Grab HTML Elements after HTML insertion
          const table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");

          // Build table entrys for every found Product
          for (let x: number = 0; x < foundProducts.length; x++) {
            table.innerHTML += tableBodyProduct;
            table.innerHTML += editButton;
            table.innerHTML += statisticButton;

            // Grab HTML Elements after HMTL insertion
            const id: HTMLCollection = document.getElementsByClassName("id");
            const description: HTMLCollection = document.getElementsByClassName("description");
            const meDate: HTMLCollection = document.getElementsByClassName("medate");
            const price: HTMLCollection = document.getElementsByClassName("price");
            const standardDeliveryTime: HTMLCollection = document.getElementsByClassName("standarddeliverytime");
            const minBG: HTMLCollection = document.getElementsByClassName("minbg");
            const maxBG: HTMLCollection = document.getElementsByClassName("maxbg");
            const discountBG: HTMLCollection = document.getElementsByClassName("discountbg");
            const discount: HTMLCollection = document.getElementsByClassName("discount");

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
          const editBttn: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>> document.getElementsByClassName("editButton");
          const statisticBttn: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>> document.getElementsByClassName("statisticButton");

          // Add Event Listeners with functionality to every edit Button
          for (let x: number = 0; x < editBttn.length; x++) {
            editBttn[x].addEventListener("click", async function (): Promise<void> {
              // Insert HTML
              changeSite.innerHTML = changeProduct;

              // Get HTML Elements
              const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
              const submit: HTMLFormElement = <HTMLFormElement>document.getElementById("submit");
              const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");

              // Add Event Listener to submit Button
              submit.addEventListener("click", async function (): Promise<void> {
                // get Form Data
                const formData: FormData = new FormData(form);
                // check for filled Form --> if true edit Product
                if (FormCheck.checkIfFormIsFilled(formData, 8) == true) {
                  const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
                  const usableData: Product = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                  usableData.id = foundProducts[x].id;

                  if (await ServerCommunication.editProductComm(usableData) == true) {
                    response.innerText = "Product changed";
                  }
                  else response.innerText = "Something went wrong. Try again.";
                }
              });
            });

            // Add Event Listeners with functionality to every statistics Button
            for (let x: number = 0; x < statisticBttn.length; x++) {
              statisticBttn[x].addEventListener("click", async function (): Promise<void> {
                // show Statistics
                ShowStatistic.showStatistic("product", foundProducts[x]);
              });
            }
          }
        }
      }
    });
  }
};
