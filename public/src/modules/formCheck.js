export function checkIfFormIsFilled(formParams) {
    let usableData = JSON.parse("{\"" + decodeURI(formParams.toString().replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
    if (usableData.Username != "" && usableData.Password != "") {
        usableData.Filled = true;
        usableData.ServerId = "Login";
    }
    else {
        usableData.Filled = false;
    }
    return usableData;
}
//# sourceMappingURL=formCheck.js.map