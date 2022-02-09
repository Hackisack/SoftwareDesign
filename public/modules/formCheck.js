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
    console.log(amountData.Amount);
    console.log(allData[productNumber].MinBG);
    console.log(amountData.Amount);
    console.log(allData[productNumber].MaxBG);
    console.log(new Date(allData[productNumber].MEDate));
    console.log(new Date());
    if (amountData.Amount >= allData[productNumber].MinBG && amountData.Amount <= allData[productNumber].MaxBG && new Date(allData[productNumber].MEDate) <= new Date()) {
        return true;
    }
    return false;
}
//# sourceMappingURL=formCheck.js.map