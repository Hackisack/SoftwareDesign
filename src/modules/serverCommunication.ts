//Module Imports
import { Customer, LoginData, Order, Product, SearchTerm, UserData } from "./interfaces.js";



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

    let fetchString: URLSearchParams = new URLSearchParams(usableData.toString()); //!!!!!!!!!!!!!!!!!Funktioniert nicht manuell eintragen?

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

export async function searchProductComm(usableData: SearchTerm): Promise<string> {

    let fetchString: URLSearchParams = new URLSearchParams(usableData.toString());

    fetchString.append("SearchTerm", usableData.SearchTerm);
    fetchString.append("ServerId", "SearchProduct");

    let response: Response = await fetch("http://localhost:8100", {

        method: "POST",

        body: fetchString
    });

    let answer: string = await response.text();
    if (answer == null) {return "empty"; }
    else return answer;
}

export async function addCustomerComm(usableData: Customer): Promise<boolean> {

    let fetchString: URLSearchParams = new URLSearchParams(usableData.toString()); //!!!!!!!!!!!!!!!!!Macht nichts, manuell eintragen?

    fetchString.append("ID", usableData.ID);
    fetchString.append("Name", usableData.Name);
    fetchString.append("Adress", usableData.Adress);
    fetchString.append("Discount", usableData.Discount.toString());
    fetchString.append("ServerId", "CreateCustomer");

    let response: Response = await fetch("http://localhost:8100", {

        method: "POST",

        body: fetchString
    });

    let answer: string = await response.text();

    if (answer == "true") { return true; }
    else return false;
}

export async function searchCustomerComm(usableData: SearchTerm): Promise<string> {

    let fetchString: URLSearchParams = new URLSearchParams(usableData.toString());

    fetchString.append("SearchTerm", usableData.SearchTerm);
    fetchString.append("ServerId", "SearchCustomer");

    let response: Response = await fetch("http://localhost:8100", {

        method: "POST",

        body: fetchString
    });

    let answer: string = await response.text();
    if (answer == null) {return "empty"; }
    else return answer;
}

export async function searchOrderComm(usableData: SearchTerm): Promise<string> {

    let fetchString: URLSearchParams = new URLSearchParams(usableData.toString());

    fetchString.append("SearchTerm", usableData.SearchTerm);
    fetchString.append("ServerId", "SearchOrder");

    let response: Response = await fetch("http://localhost:8100", {

        method: "POST",

        body: fetchString
    });

    let answer: string = await response.text();
    if (answer == null) {return "empty"; }
    else return answer;
}

export async function createOrderComm(usableData: Order): Promise<boolean> {

    let fetchString: URLSearchParams = new URLSearchParams(usableData.toString()); //!!!!!!!!!!!!!!!!!Macht nichts, manuell eintragen?

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
    
    
    let response: Response = await fetch("http://localhost:8100", {

        method: "POST",

        body: fetchString
    });

    let answer: string = await response.text();

    if (answer == "true") { return true; }
    else return false;
}

export async function allProductDataComm(): Promise<Product[]> {

    let fetchString: URLSearchParams = new URLSearchParams();

    fetchString.append("ServerId", "AllProduct");

    let response: Response = await fetch("http://localhost:8100", {

        method: "POST",

        body: fetchString
    });

    let answer: Product[] = await response.json();

    return answer;
}

export async function allCustomerDataComm(): Promise<string> {

    let fetchString: URLSearchParams = new URLSearchParams();

    fetchString.append("ServerId", "AllCustomer");

    let response: Response = await fetch("http://localhost:8100", {

        method: "POST",

        body: fetchString
    });

    let answer: string = await response.text();

    return answer;
}


