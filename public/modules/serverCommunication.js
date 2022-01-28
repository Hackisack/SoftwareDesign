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
        let fetchString = new URLSearchParams(usableData.toString());
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
//# sourceMappingURL=serverCommunication.js.map