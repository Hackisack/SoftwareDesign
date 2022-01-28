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

