var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Code
export function checkLoginOrAdminComm(usableData) {
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
export function addUserComm(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        usableData.ServerId = "CreateUser";
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
export function allAdminDataComm() {
    return __awaiter(this, void 0, void 0, function* () {
        const serverId = {
            ServerId: "AllAdmin"
        };
        const fetchString = JSON.stringify(serverId);
        const response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        const answer = yield response.json();
        return answer;
    });
}
export function allOrderDataComm() {
    return __awaiter(this, void 0, void 0, function* () {
        const serverId = {
            ServerId: "AllOrder"
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
export function changeAdminPrivilegesComm(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const serverId = {
            ServerId: "ChangeAdmin",
            Username: username
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
export function addProductComm(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        usableData.ServerId = "CreateProduct";
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
export function searchProductComm(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        usableData.ServerId = "SearchProduct";
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
export function editProductComm(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        usableData.ServerId = "EditProduct";
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
export function editOrderComm(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        usableData.ServerId = "EditOrder";
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
export function editCustomerComm(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        usableData.ServerId = "EditCustomer";
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
export function addCustomerComm(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        usableData.ServerId = "CreateCustomer";
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
export function searchCustomerComm(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        usableData.ServerId = "SearchCustomer";
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
export function searchOrderComm(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        usableData.ServerId = "SearchOrder";
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
export function createOrderComm(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        usableData.ServerId = "CreateOrder";
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
export function allProductDataComm() {
    return __awaiter(this, void 0, void 0, function* () {
        const serverId = {
            ServerId: "AllProduct"
        };
        const fetchString = JSON.stringify(serverId);
        const response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        const answer = yield response.json();
        return answer;
    });
}
export function allCustomerDataComm() {
    return __awaiter(this, void 0, void 0, function* () {
        const serverId = {
            ServerId: "AllCustomer"
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
export function checkForOrderId(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        usableData.ServerId = "CheckOrderId";
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
//# sourceMappingURL=serverCommunication.js.map