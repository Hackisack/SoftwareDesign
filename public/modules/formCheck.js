export class FormCheck {
    // check if every entry in form Data is filled
    static checkIfFormIsFilled(formData, length) {
        let formFilled = 0;
        for (const entry of formData.values()) {
            if (entry != "") {
                formFilled++;
            }
        }
        if (formFilled == length) {
            return true;
        }
        return false;
    }
    // check if if the wanted position can be added to the order
    static checkIfOrderIsValid(amountData, allData, productNumber) {
        if (+amountData.amount >= +allData[productNumber].minBG && +amountData.amount <= +allData[productNumber].maxBG && new Date(allData[productNumber].meDate).getTime() <= new Date().getTime()) {
            return true;
        }
        return false;
    }
    // check if entered data fits the Regex
    static checkForRegex(formData, checkFor) {
        if (checkFor == "usernameAndPassword") {
            const regExUser = /^[A-Za-z]+$/;
            const regExPassword = /^(?=.*\d).{4,8}$/;
            if (regExUser.test(formData.get("username").toString()) == true && regExPassword.test(formData.get("password").toString()) == true) {
                return true;
            }
            ;
        }
        if (checkFor == "ID") {
            const regEx = /[A-Z]{3}[1-9]{3}/;
            if (regEx.test(formData.get("id").toString()) == true) {
                return true;
            }
            ;
        }
        return false;
    }
}
//# sourceMappingURL=formCheck.js.map