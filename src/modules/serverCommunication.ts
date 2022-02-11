/* eslint-disable eqeqeq */
// Module Imports
import { ChangeAdmin, Customer, LoginData, Order, Product, SearchTerm, ServerId, UserData } from "./interfaces.js";

// Code
export async function checkLoginOrAdminComm (usableData: LoginData): Promise<boolean> {
  const fetchString: string = JSON.stringify(usableData);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.text();

  if (answer == "true") {
    return true;
  }
  else return false;
}

export async function addUserComm (usableData: UserData): Promise<boolean> {
  usableData.ServerId = "CreateUser";
  const fetchString: string = JSON.stringify(usableData);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.text();

  if (answer == "true") {
    return true;
  }
  else return false;
}

export async function allAdminDataComm (): Promise<string> {
  const serverId: ServerId = {
    ServerId: "AllAdmin"
  };
  const fetchString: string = JSON.stringify(serverId);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.json();

  return answer;
}

export async function allOrderDataComm (): Promise<string> {
  const serverId: ServerId = {
    ServerId: "AllOrder"
  };
  const fetchString: string = JSON.stringify(serverId);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.json();

  return answer;
}

export async function changeAdminPrivilegesComm (username: string): Promise<string> {
  const serverId: ChangeAdmin = {
    ServerId: "ChangeAdmin",
    Username: username
  };
  const fetchString: string = JSON.stringify(serverId);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.text();

  return answer;
}

export async function addProductComm (usableData: Product): Promise<boolean> {
  usableData.ServerId = "CreateProduct";
  const fetchString: string = JSON.stringify(usableData);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.text();

  if (answer == "true") {
    return true;
  }
  else return false;
}

export async function searchProductComm (usableData: SearchTerm): Promise<string> {
  usableData.ServerId = "SearchProduct";
  const fetchString: string = JSON.stringify(usableData);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.text();
  if (answer == null) {
    return "empty";
  }
  else return answer;
}

export async function editProductComm (usableData: Product): Promise<boolean> {
  usableData.ServerId = "EditProduct";
  const fetchString: string = JSON.stringify(usableData);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.text();
  if (answer == "true") {
    return true;
  }
  else return false;
}

export async function editOrderComm (usableData: Order): Promise<boolean> {
  usableData.ServerId = "EditOrder";
  const fetchString: string = JSON.stringify(usableData);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.text();
  if (answer == "true") {
    return true;
  }
  else return false;
}

export async function editCustomerComm (usableData: Customer): Promise<boolean> {
  usableData.ServerId = "EditCustomer";
  const fetchString: string = JSON.stringify(usableData);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.text();
  if (answer == "true") {
    return true;
  }
  else return false;
}

export async function addCustomerComm (usableData: Customer): Promise<boolean> {
  usableData.ServerId = "CreateCustomer";
  const fetchString: string = JSON.stringify(usableData);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.text();

  if (answer == "true") {
    return true;
  }
  else return false;
}

export async function searchCustomerComm (usableData: SearchTerm): Promise<string> {
  usableData.ServerId = "SearchCustomer";
  const fetchString: string = JSON.stringify(usableData);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.text();
  if (answer == null) {
    return "empty";
  }
  else return answer;
}

export async function searchOrderComm (usableData: SearchTerm): Promise<string> {
  usableData.ServerId = "SearchOrder";
  const fetchString: string = JSON.stringify(usableData);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.text();
  if (answer == null) {
    return "empty";
  }
  else return answer;
}

export async function createOrderComm (usableData: Order): Promise<boolean> {
  usableData.ServerId = "CreateOrder";
  const fetchString: string = JSON.stringify(usableData);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.text();

  if (answer == "true") {
    return true;
  }
  else return false;
}

export async function allProductDataComm (): Promise<Product[]> {
  const serverId: ServerId = {
    ServerId: "AllProduct"
  };
  const fetchString: string = JSON.stringify(serverId);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: Product[] = await response.json();

  return answer;
}

export async function allCustomerDataComm (): Promise<string> {
  const serverId: ServerId = {
    ServerId: "AllCustomer"
  };
  const fetchString: string = JSON.stringify(serverId);

  const response: Response = await fetch("http://localhost:8100", {

    method: "POST",

    body: fetchString
  });

  const answer: string = await response.text();

  return answer;
}
