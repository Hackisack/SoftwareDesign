//Module Imports
import { LoginData, Product, UserData } from "./interfaces.js";



//Code
export async function checkLoginOrAdminComm(usableData: LoginData): Promise<boolean> {

    let fetchString: URLSearchParams = new URLSearchParams(usableData.toString());

    fetchString.append("Username", usableData.Username);
    fetchString.append("Password", usableData.Password);
    fetchString.append("ServerId", usableData.ServerId);

    let response: Response = await fetch("http://localhost:8100", {

        method: "POST",

        body: fetchString
    });

    let answer: string = await response.text();

    if (answer == "true") { return true; }
    else return false;
}


export async function addUserComm(usableData: UserData): Promise<boolean> {

    let fetchString: URLSearchParams = new URLSearchParams(usableData.toString());

    fetchString.append("Username", usableData.Username);
    fetchString.append("Password", usableData.Password);
    fetchString.append("Admin", usableData.Admin);
    fetchString.append("ServerId", "CreateUser");

    let response: Response = await fetch("http://localhost:8100", {

        method: "POST",

        body: fetchString
    });

    let answer: string = await response.text();

    if (answer == "true") { return true; }
    else return false;
}

export async function allAdminDataComm(): Promise<string> {

    let fetchString: URLSearchParams = new URLSearchParams();

    fetchString.append("ServerId", "AllAdmin");

    let response: Response = await fetch("http://localhost:8100", {

        method: "POST",

        body: fetchString
    });

    let answer: string = await response.json();

    return answer;
}

export async function changeAdminPrivilegesComm(username: string): Promise<string> {

    let fetchString: URLSearchParams = new URLSearchParams();

    fetchString.append("ServerId", "ChangeAdmin");
    fetchString.append("Username", username);

    let response: Response = await fetch("http://localhost:8100", {

        method: "POST",

        body: fetchString
    });

    let answer: string = await response.text();

    return answer;
}

export async function addProductComm(usableData: Product): Promise<boolean> {

    let fetchString: URLSearchParams = new URLSearchParams(usableData.toString());

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

    let response: Response = await fetch("http://localhost:8100", {

        method: "POST",

        body: fetchString
    });

    let answer: string = await response.text();

    if (answer == "true") { return true; }
    else return false;
}