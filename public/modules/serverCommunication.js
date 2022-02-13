var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ServerCommunication {
    // check either for Login validity or for Admin privileges
    checkLoginOrAdminComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch("http://localhost:8100", {
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
    addUserComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "CreateUser";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch("http://localhost:8100", {
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
    allAdminDataComm() {
        return __awaiter(this, void 0, void 0, function* () {
            const serverId = {
                serverId: "AllAdmin"
            };
            const fetchString = JSON.stringify(serverId);
            const response = yield fetch("http://localhost:8100", {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            return answer;
        });
    }
    // Return all Order Data
    allOrderDataComm() {
        return __awaiter(this, void 0, void 0, function* () {
            const serverId = {
                serverId: "AllOrder"
            };
            const fetchString = JSON.stringify(serverId);
            const response = yield fetch("http://localhost:8100", {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            return answer;
        });
    }
    // Change Admin Privileges of User
    changeAdminPrivilegesComm(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverId = {
                serverId: "ChangeAdmin",
                username: username
            };
            const fetchString = JSON.stringify(serverId);
            const response = yield fetch("http://localhost:8100", {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            return answer;
        });
    }
    // Add Product
    addProductComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "CreateProduct";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch("http://localhost:8100", {
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
    searchProductComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "SearchProduct";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch("http://localhost:8100", {
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
    editProductComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "EditProduct";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch("http://localhost:8100", {
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
    editOrderComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "EditOrder";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch("http://localhost:8100", {
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
    editCustomerComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "EditCustomer";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch("http://localhost:8100", {
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
    addCustomerComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "CreateCustomer";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch("http://localhost:8100", {
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
    searchCustomerComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "SearchCustomer";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch("http://localhost:8100", {
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
    searchOrderComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "SearchOrder";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch("http://localhost:8100", {
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
    createOrderComm(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "CreateOrder";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch("http://localhost:8100", {
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
    allProductDataComm() {
        return __awaiter(this, void 0, void 0, function* () {
            const serverId = {
                serverId: "AllProduct"
            };
            const fetchString = JSON.stringify(serverId);
            const response = yield fetch("http://localhost:8100", {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            return answer;
        });
    }
    // Return all Customers
    allCustomerDataComm() {
        return __awaiter(this, void 0, void 0, function* () {
            const serverId = {
                serverId: "AllCustomer"
            };
            const fetchString = JSON.stringify(serverId);
            const response = yield fetch("http://localhost:8100", {
                method: "POST",
                body: fetchString
            });
            const answer = yield response.text();
            return answer;
        });
    }
    // Check for duplicate Order Id
    checkForOrderId(usableData) {
        return __awaiter(this, void 0, void 0, function* () {
            usableData.serverId = "CheckOrderId";
            const fetchString = JSON.stringify(usableData);
            const response = yield fetch("http://localhost:8100", {
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