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
        let fetchString = new URLSearchParams(usableData.toString());
        fetchString.append("Username", usableData.Username);
        fetchString.append("Password", usableData.Password);
        fetchString.append("ServerId", usableData.ServerId);
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
        let fetchString = new URLSearchParams(usableData.toString());
        fetchString.append("Username", usableData.Username);
        fetchString.append("Password", usableData.Password);
        fetchString.append("Admin", usableData.Admin);
        fetchString.append("ServerId", "CreateUser");
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
        let fetchString = new URLSearchParams();
        fetchString.append("ServerId", "AllAdmin");
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
        let fetchString = new URLSearchParams();
        fetchString.append("ServerId", "ChangeAdmin");
        fetchString.append("Username", username);
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
        let fetchString = new URLSearchParams(usableData.toString()); //!!!!!!!!!!!!!!!!!Funktioniert nicht manuell eintragen?
        fetchString.append("ID", usableData.ID);
        fetchString.append("Description", usableData.Description);
        fetchString.append("MEDate", usableData.MEDate.toString());
        fetchString.append("Price", usableData.Price.toString());
        fetchString.append("StandardDeliveryTime", usableData.StandardDeliveryTime.toString());
        fetchString.append("MinBG", usableData.MinBG.toString());
        fetchString.append("MaxBG", usableData.MaxBG.toString());
        fetchString.append("DiscountBG", usableData.DiscountBG.toString());
        fetchString.append("Discount", usableData.Discount.toString());
        fetchString.append("ServerId", "CreateProduct");
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
        let fetchString = new URLSearchParams(usableData.toString());
        fetchString.append("SearchTerm", usableData.SearchTerm);
        fetchString.append("ServerId", "SearchProduct");
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
        let fetchString = new URLSearchParams(usableData.toString()); //!!!!!!!!!!!!!!!!!Macht nichts, manuell eintragen?
        fetchString.append("ID", usableData.ID);
        fetchString.append("Name", usableData.Name);
        fetchString.append("Adress", usableData.Adress);
        fetchString.append("Discount", usableData.Discount.toString());
        fetchString.append("ServerId", "CreateCustomer");
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
        let fetchString = new URLSearchParams(usableData.toString());
        fetchString.append("SearchTerm", usableData.SearchTerm);
        fetchString.append("ServerId", "SearchCustomer");
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
        let fetchString = new URLSearchParams(usableData.toString());
        fetchString.append("SearchTerm", usableData.SearchTerm);
        fetchString.append("ServerId", "SearchOrder");
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
        let fetchString = new URLSearchParams(usableData.toString()); //!!!!!!!!!!!!!!!!!Macht nichts, manuell eintragen?
        fetchString.append("ID", usableData.ID);
        fetchString.append("Customer", usableData.Customer.toString());
        fetchString.append("Description", usableData.Description);
        fetchString.append("OrderDate", usableData.OrderDate.toString());
        fetchString.append("DeliveryDate", usableData.DeliveryDate.toString());
        fetchString.append("Price", usableData.Price.toString());
        for (let x = 0; x < usableData.OrderPositions.length; x++) {
            fetchString.append("OrderPositions" + x, usableData.OrderPositions[x][0].ID);
            fetchString.append("Amount" + x, usableData.OrderPositions[x][1].Amount.toString());
        }
        fetchString.append("ServerId", "CreateOrder");
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
        let fetchString = new URLSearchParams();
        fetchString.append("ServerId", "AllProduct");
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
        let fetchString = new URLSearchParams();
        fetchString.append("ServerId", "AllCustomer");
        let response = yield fetch("http://localhost:8100", {
            method: "POST",
            body: fetchString
        });
        let answer = yield response.text();
        return answer;
    });
}
//# sourceMappingURL=serverCommunication.js.map