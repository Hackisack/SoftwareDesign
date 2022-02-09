/* eslint-disable eqeqeq */
import { Amount, Product } from "./interfaces";

export function checkIfFormIsFilled (formData: FormData, length: number): boolean {
  let formFilled:number = 0;

  for (const entry of formData.values()) {
    if (entry != "") {
      formFilled++;
    } // Alle felder ausgefüllt?
  }

  if (formFilled == length) {
    return true;
  }

  return false;
}

export function checkIfOrderIsValid (amountData: Amount, allData:Product[], productNumber: number): boolean {
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
