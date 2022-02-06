import { Amount, Product } from "./interfaces";

export function checkIfFormIsFilled(formData: FormData, length: number): boolean {

let formFilled:number = 0;

for (let entry of formData.values()) {
    if (entry != "") { formFilled++; } //Alle felder ausgefüllt?
}

if (formFilled == length) {
        return true;
    }

return false;

}

export function checkIfOrderIsValid(amountData: Amount, allData:Product[] , productNumber: number ): boolean {

    if(amountData.Amount > allData[productNumber].MinBG && amountData.Amount < allData[productNumber].MaxBG && allData[productNumber].MEDate >= new Date()) {

        return true;

    }
    
    return false;
    
    }



