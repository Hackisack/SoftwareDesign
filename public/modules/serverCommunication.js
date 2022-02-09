var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Code
export function checkLoginOrAdminComm(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        let fetchString = JSON.stringify(usableData);
        let response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        let answer = yield response.text();
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
        let fetchString = JSON.stringify(usableData);
        let response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        let answer = yield response.text();
        if (answer == "true") {
            return true;
        }
        else
            return false;
    });
}
export function allAdminDataComm() {
    return __awaiter(this, void 0, void 0, function* () {
        let serverId = {
            ServerId: "AllAdmin"
        };
        let fetchString = JSON.stringify(serverId);
        let response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        let answer = yield response.json();
        return answer;
    });
}
export function changeAdminPrivilegesComm(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let serverId = {
            ServerId: "ChangeAdmin",
            Username: username
        };
        let fetchString = JSON.stringify(serverId);
        let response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        let answer = yield response.text();
        return answer;
    });
}
export function addProductComm(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        usableData.ServerId = "CreateProduct";
        let fetchString = JSON.stringify(usableData);
        let response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        let answer = yield response.text();
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
        let fetchString = JSON.stringify(usableData);
        let response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        let answer = yield response.text();
        if (answer == null) {
            return "empty";
        }
        else
            return answer;
    });
}
export function addCustomerComm(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        usableData.ServerId = "CreateCustomer";
        let fetchString = JSON.stringify(usableData);
        let response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        let answer = yield response.text();
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
        let fetchString = JSON.stringify(usableData);
        let response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        let answer = yield response.text();
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
        let fetchString = JSON.stringify(usableData);
        let response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        let answer = yield response.text();
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
        let fetchString = JSON.stringify(usableData);
        let response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        let answer = yield response.text();
        if (answer == "true") {
            return true;
        }
        else
            return false;
    });
}
export function allProductDataComm() {
    return __awaiter(this, void 0, void 0, function* () {
        let serverId = {
            ServerId: "AllProduct"
        };
        let fetchString = JSON.stringify(serverId);
        let response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        let answer = yield response.json();
        return answer;
    });
}
export function allCustomerDataComm() {
    return __awaiter(this, void 0, void 0, function* () {
        let serverId = {
            ServerId: "AllCustomer"
        };
        let fetchString = JSON.stringify(serverId);
        let response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        let answer = yield response.text();
        return answer;
    });
}
//# sourceMappingURL=serverCommunication.js.map