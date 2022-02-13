var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { statisticProduct } from "./htmlCodeStrings.js";
import { ServerCommunication } from "./serverCommunication.js";
export class ShowStatistic {
    // Show Statistics for Product or Customer
    static showStatistic(statisticObject, usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            const changeSite = document.getElementById("changeSite");
            const allOrders = JSON.parse(yield ServerCommunication.allOrderDataComm());
            const allCustomers = JSON.parse(yield ServerCommunication.allCustomerDataComm());
            // Product
            if (statisticObject == "product") {
                // Parse again to clarify Type
                const newUsableData = usableData;
                // define variables
                let orderedAmount = 0;
                let orderedOrders = 0;
                let totalTurnover = 0;
                let totalDiscount = 0;
                let customerID = "";
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
                const newUsableData = usableData;
                // Define variables
                let orderedArticles = " Ordered Articles: ";
                let totalTurnover = "";
                let totalDiscount = "";
                let counter = 1;
                // Iterate trough every Order and search for the specified Customer
                for (let x = 0; x < allOrders.length; x++) {
                    for (let y = 0; y < allOrders[x].orderPositions.length; y++) {
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
        });
    }
}
//# sourceMappingURL=showStatistic.js.map