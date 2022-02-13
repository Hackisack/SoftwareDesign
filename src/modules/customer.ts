import { communication } from "../app.js";
import { FormCheck } from "./formCheck.js";
import { changeCustomer, createCustomer, editButton, searchCustomerForm, statisticButton, tableBodyCustomer, tableHeaderCustomer } from "./htmlCodeStrings.js";
import { SearchTerm } from "./interfaces.js";
import { ShowStatistic } from "./showStatistic.js";

export class Customer {
  id: string;
  name: string;
  adress: string;
  discount: number;
  serverId: string;

  constructor (id: string, name: string, adress: string, discount: number, serverId: string) {
    this.id = id;
    this.name = name;
    this.adress = adress;
    this.discount = discount;
    this.serverId = serverId;
  }

  static addCustomer (): void {
    // Grab HTML Elements before HTML insertion
    const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");

    // insert HTML
    changeSite.innerHTML = createCustomer;

    // Grab HTML Elements after HTML insertion
    const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");

    // add Event Listener on the submit Button
    submit.addEventListener("click", async function (): Promise<void> {
      // get User Input Data
      const formData: FormData = new FormData(form);

      // check for filled Form fields and Regex --> if valid add Customer to Database
      if (FormCheck.checkIfFormIsFilled(formData, 4) == true && FormCheck.checkForRegex(formData, "ID") == true) {
        const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        const usableData: Customer = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");

        if (await communication.addCustomerComm(usableData) == true) {
          response.innerText = "Customer added";
        }
        else response.innerText = "ID already in use. Retry with different ID";
      }
      else if (FormCheck.checkIfFormIsFilled(formData, 4) == true && FormCheck.checkForRegex(formData, "ID") == false) {
        response.innerText = "ID must consist of three uppercase letters followed by three numbers.";
      }
    });
  }

  static searchCustomer (): void {
    // Grab HTML Elements before HTML insertion
    const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");

    // insert HTML
    changeSite.innerHTML = searchCustomerForm;

    // Grab HTML Elements after HMTL insertion
    const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    const submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");
    // add Event Listener on submit Button
    submit.addEventListener("click", async function (): Promise<void> {
      // get User Input
      const formData: FormData = new FormData(form);
      // check for filled Form field --> if filled search for customer
      if (FormCheck.checkIfFormIsFilled(formData, 1) == true) {
        const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        const usableData: SearchTerm = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
        const foundCustomers: Customer[] = JSON.parse((await communication.searchCustomerComm(usableData)).replace(/%2B/g, " "));

        if (foundCustomers.length == 0) {
          response.innerText = "No Customer found";
        }
        else {
          // insert HTML
          changeSite.innerHTML = tableHeaderCustomer;

          // Grab HTML Elements after HMTL insertion
          const table: HTMLDivElement = <HTMLDivElement>document.getElementById("table");

          // build table entry for every found customer
          for (let x: number = 0; x < foundCustomers.length; x++) {
            table.innerHTML += tableBodyCustomer;
            table.innerHTML += editButton;
            table.innerHTML += statisticButton;

            // Grab HTML Elements after HTML insertion
            const id: HTMLCollection = document.getElementsByClassName("id");
            const name: HTMLCollection = document.getElementsByClassName("description");
            const adress: HTMLCollection = document.getElementsByClassName("adress");
            const discount: HTMLCollection = document.getElementsByClassName("discount");

            // fill table with found data
            id[x].textContent = foundCustomers[x].id;
            name[x].textContent = foundCustomers[x].name.replace(/[+]/g, " ");
            adress[x].textContent = foundCustomers[x].adress.replace(/[+]/g, " ");
            discount[x].textContent = foundCustomers[x].discount.toString() + " %";
          }

          // get Buttons for edit and statistic
          const editBttn: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>> document.getElementsByClassName("editButton");
          const statisticBttn: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>> document.getElementsByClassName("statisticButton");

          // add Event Listener with functionality to every edit Button generated
          for (let x: number = 0; x < editBttn.length; x++) {
            editBttn[x].addEventListener("click", async function (): Promise<void> {
              // insert HTML
              changeSite.innerHTML = changeCustomer;

              // Grab HTML elements after HTML insertion
              const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
              const submit: HTMLFormElement = <HTMLFormElement>document.getElementById("submit");
              const response: HTMLButtonElement = <HTMLButtonElement>document.getElementById("response");

              // add Event Listener with functionality to submit Button
              submit.addEventListener("click", async function (): Promise<void> {
                // get User Input Data
                const formData: FormData = new FormData(form);
                // check for filled Form fields --> if true change Customer
                if (FormCheck.checkIfFormIsFilled(formData, 3) == true) {
                  const formParams: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
                  const usableData: Customer = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                  usableData.id = foundCustomers[x].id;

                  if (await communication.editCustomerComm(usableData) == true) {
                    response.innerText = "Customer changed";
                  }
                  else response.innerText = "Something went wrong. Try again.";
                }
              });
            });
            // add Event Listener with functionality to every statistic Button generated
            for (let x: number = 0; x < statisticBttn.length; x++) {
              statisticBttn[x].addEventListener("click", async function (): Promise<void> {
                ShowStatistic.showStatistic("customer", foundCustomers[x]);
              });
            }
          }
        }
      }
    });
  }
};
