export function checkIfFormIsFilled(formData, length) {
    let formFilled = 0;
    for (let entry of formData.values()) {
        if (entry != "") {
            formFilled++;
        } //Alle felder ausgefüllt?
    }
    if (formFilled == length) {
        return true;
    }
    return false;
}
export function checkIfOrderIsValid(amountData, allData, productNumber) {
    if (amountData.Amount > allData[productNumber].MinBG && amountData.Amount < allData[productNumber].MaxBG && allData[productNumber].MEDate >= new Date()) {
        return true;
    }
    return false;
}
//# sourceMappingURL=formCheck.js.map