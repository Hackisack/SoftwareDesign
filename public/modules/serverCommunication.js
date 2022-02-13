var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const serverString = "https://softwaredesign2022.herokuapp.com/"; // local Server String  "http://localhost:8100"
export class ServerCommunication {
    // check either for Login validity or for Admin privileges
    static checkLoginOrAdminComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            if (answer == "true") {
                return true;
            }
            else
                return false;
        });
    }
    // Add user
    static addUserComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "CreateUser";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            if (answer == "true") {
                return true;
            }
            else
                return false;
        });
    }
    // Return all Admin Data
    static allAdminDataComm() {
        return __awaiter(this, void 0, void 0, function* () {
            const serverId = {
                serverId: "AllAdmin"
            };
            const fetchString = JSON.stringify(serverId);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            return answer;
        });
    }
    // Return all Order Data
    static allOrderDataComm() {
        return __awaiter(this, void 0, void 0, function* () {
            const serverId = {
                serverId: "AllOrder"
            };
            const fetchString = JSON.stringify(serverId);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            return answer;
        });
    }
    // Change Admin Privileges of User
    static changeAdminPrivilegesComm(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverId = {
                serverId: "ChangeAdmin",
                username: username
            };
            const fetchString = JSON.stringify(serverId);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            return answer;
        });
    }
    // Add Product
    static addProductComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "CreateProduct";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            if (answer == "true") {
                return true;
            }
            else
                return false;
        });
    }
    // Search Product
    static searchProductComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "SearchProduct";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            if (answer == null) {
                return "empty";
            }
            else
                return answer;
        });
    }
    // Edit Product
    static editProductComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "EditProduct";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            if (answer == "true") {
                return true;
            }
            else
                return false;
        });
    }
    // Edit Order
    static editOrderComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "EditOrder";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            if (answer == "true") {
                return true;
            }
            else
                return false;
        });
    }
    // Edit Customer
    static editCustomerComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "EditCustomer";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            if (answer == "true") {
                return true;
            }
            else
                return false;
        });
    }
    // Add Customer
    static addCustomerComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "CreateCustomer";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            if (answer == "true") {
                return true;
            }
            else
                return false;
        });
    }
    // Search Customer
    static searchCustomerComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "SearchCustomer";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            if (answer == null) {
                return "empty";
            }
            else
                return answer;
        });
    }
    // Search Order
    static searchOrderComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "SearchOrder";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            if (answer == null) {
                return "empty";
            }
            else
                return answer;
        });
    }
    // Create Order
    static createOrderComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "CreateOrder";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            if (answer == "true") {
                return true;
            }
            else
                return false;
        });
    }
    // Return all Products
    static allProductDataComm() {
        return __awaiter(this, void 0, void 0, function* () {
            const serverId = {
                serverId: "AllProduct"
            };
            const fetchString = JSON.stringify(serverId);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            return answer;
        });
    }
    // Return all Customers
    static allCustomerDataComm() {
        return __awaiter(this, void 0, void 0, function* () {
            const serverId = {
                serverId: "AllCustomer"
            };
            const fetchString = JSON.stringify(serverId);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            return answer;
        });
    }
    // Check for duplicate Order Id
    static checkForOrderId(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "CheckOrderId";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch(serverString, {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            if (answer == "true") {
                return true;
            }
            else
                return false;
        });
    }
}
//# sourceMappingURL=serverCommunication.js.map