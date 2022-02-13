// Module Imports
import { Customer } from "./customer.js";
import { statisticProduct } from "./htmlCodeStrings.js";
import { Order } from "./order.js";
import { Product } from "./product.js";
import { ServerCommunication } from "./serverCommunication.js";

export class ShowStatistic {
  // Show Statistics for Product or Customer
  static async showStatistic (statisticObject: string, usableData: Product|Customer): Promise<void> {
    const changeSite: HTMLDivElement = <HTMLDivElement>document.getElementById("changeSite");
    const allOrders: Order[] = JSON.parse(await ServerCommunication.allOrderDataComm());
    const allCustomers: Customer[] = JSON.parse(await ServerCommunication.allCustomerDataComm());

    // Product
    if (statisticObject == "product") {
      // Parse again to clarify Type
      const newUsableData: Product = <Product> usableData;

      // define variables
      let orderedAmount: number = 0;
      let orderedOrders: number = 0;
      let totalTurnover: number = 0;
      let totalDiscount: number = 0;
      let customerID: string = "";

      // Iterate trough every Order and search for the specified Product
      for (let x = 0; x < allOrders.length; x++) {
        for (let y = 0; y < allOrders[x].orderPositions.length; y++) {
          if (allOrders[x].orderPositions[y][0].id == newUsableData.id) {
            orderedAmount += +allOrders[x].orderPositions[y][1].amount;
            if (allOrders[x].orderPositions[y][1].amount >= newUsableData.minBG) {
              totalDiscount = +newUsableData.discount;
            }
            totalTurnover += allOrders[x].orderPositions[y][1].amount * allOrders[x].orderPositions[y][0].price;
            customerID = allOrders[x].customer;
          }
          for (let z = 0; z < allCustomers.length; z++) {
            if (allCustomers[z].id == customerID) {
              totalDiscount += +allCustomers[z].discount;
            }
          }
        }
        if (allOrders[x].orderPositions[0][0].id == newUsableData.id) {
          orderedOrders += 1;
        }
      }
      totalTurnover = totalTurnover - (totalTurnover * (totalDiscount / 100));
      // Display counted statistics
      changeSite.innerHTML = statisticProduct.replace("x", orderedAmount.toString()).replace("x", orderedOrders.toString()).replace("x", totalTurnover.toString());
    }
    // Customer
    else if (statisticObject == "customer") {
      // Parse again to clarify Type
      const newUsableData: Customer = <Customer> usableData;

      // Define variables
      let orderedArticles: string = " Ordered Articles: ";
      let totalTurnover: string = "";
      let totalDiscount: string = "";
      let counter: number = 1;

      // Iterate trough every Order and search for the specified Customer
      for (let x = 0; x < allOrders.length; x++) {
        for (let y: number = 0; y < allOrders[x].orderPositions.length; y++) {
          if (allOrders[x].customer == newUsableData.id) {
            orderedArticles += counter + ". " + allOrders[x].orderPositions[y][0].description + " x " + allOrders[x].orderPositions[y][1].amount + ". ";
            counter++;
            totalTurnover += allOrders[x].price;
            totalDiscount += +(allOrders[x].orderPositions[y][1].amount * allOrders[x].orderPositions[y][0].price) - allOrders[x].price;
          }
        }
      }

      // Insert HMTL and insert statistics
      changeSite.innerHTML = orderedArticles;
      changeSite.innerHTML += "<br>" + "Total Customer turnover: " + totalTurnover + ". " + "<br>";
      changeSite.innerHTML += "Total given Discount in €: " + totalDiscount;
    }
  }
}
