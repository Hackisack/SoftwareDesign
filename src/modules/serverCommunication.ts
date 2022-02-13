// Module Imports
import { Customer } from "./customer.js";
import { ChangeAdmin, LoginData, SearchTerm, ServerId } from "./interfaces.js";
import { Order } from "./order.js";
import { Product } from "./product.js";
import { User } from "./user.js";

const serverString: string = "https://softwaredesign2022.herokuapp.com/"; // local Server String  "http://localhost:8100"

export class ServerCommunication {
  // check either for Login validity or for Admin privileges
  static async checkLoginOrAdminComm (usableData: LoginData): Promise<boolean> {
    const fetchString: string = JSON.stringify(usableData);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    if (answer == "true") {
      return true;
    }
    else return false;
  }

  // Add user
  static async addUserComm (usableData: User): Promise<boolean> {
    usableData.serverId = "CreateUser";
    const fetchString: string = JSON.stringify(usableData);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    if (answer == "true") {
      return true;
    }
    else return false;
  }

  // Return all Admin Data
  static async allAdminDataComm (): Promise<string> {
    const serverId: ServerId = {
      serverId: "AllAdmin"
    };
    const fetchString: string = JSON.stringify(serverId);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    return answer;
  }

  // Return all Order Data
  static async allOrderDataComm (): Promise<string> {
    const serverId: ServerId = {
      serverId: "AllOrder"
    };
    const fetchString: string = JSON.stringify(serverId);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    return answer;
  }

  // Change Admin Privileges of User
  static async changeAdminPrivilegesComm (username: string): Promise<string> {
    const serverId: ChangeAdmin = {
      serverId: "ChangeAdmin",
      username: username
    };
    const fetchString: string = JSON.stringify(serverId);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    return answer;
  }

  // Add Product
  static async addProductComm (usableData: Product): Promise<boolean> {
    usableData.serverId = "CreateProduct";
    const fetchString: string = JSON.stringify(usableData);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    if (answer == "true") {
      return true;
    }
    else return false;
  }

  // Search Product
  static async searchProductComm (usableData: SearchTerm): Promise<string> {
    usableData.serverId = "SearchProduct";
    const fetchString: string = JSON.stringify(usableData);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();
    if (answer == null) {
      return "empty";
    }
    else return answer;
  }

  // Edit Product
  static async editProductComm (usableData: Product): Promise<boolean> {
    usableData.serverId = "EditProduct";
    const fetchString: string = JSON.stringify(usableData);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();
    if (answer == "true") {
      return true;
    }
    else return false;
  }

  // Edit Order
  static async editOrderComm (usableData: Order): Promise<boolean> {
    usableData.serverId = "EditOrder";
    const fetchString: string = JSON.stringify(usableData);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();
    if (answer == "true") {
      return true;
    }
    else return false;
  }

  // Edit Customer
  static async editCustomerComm (usableData: Customer): Promise<boolean> {
    usableData.serverId = "EditCustomer";
    const fetchString: string = JSON.stringify(usableData);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();
    if (answer == "true") {
      return true;
    }
    else return false;
  }

  // Add Customer
  static async addCustomerComm (usableData: Customer): Promise<boolean> {
    usableData.serverId = "CreateCustomer";
    const fetchString: string = JSON.stringify(usableData);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    if (answer == "true") {
      return true;
    }
    else return false;
  }

  // Search Customer
  static async searchCustomerComm (usableData: SearchTerm): Promise<string> {
    usableData.serverId = "SearchCustomer";
    const fetchString: string = JSON.stringify(usableData);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();
    if (answer == null) {
      return "empty";
    }
    else return answer;
  }

  // Search Order
  static async searchOrderComm (usableData: SearchTerm): Promise<string> {
    usableData.serverId = "SearchOrder";
    const fetchString: string = JSON.stringify(usableData);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();
    if (answer == null) {
      return "empty";
    }
    else return answer;
  }

  // Create Order
  static async createOrderComm (usableData: Order): Promise<boolean> {
    usableData.serverId = "CreateOrder";
    const fetchString: string = JSON.stringify(usableData);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    if (answer == "true") {
      return true;
    }
    else return false;
  }

  // Return all Products
  static async allProductDataComm (): Promise<string> {
    const serverId: ServerId = {
      serverId: "AllProduct"
    };
    const fetchString: string = JSON.stringify(serverId);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    return answer;
  }

  // Return all Customers
  static async allCustomerDataComm (): Promise<string> {
    const serverId: ServerId = {
      serverId: "AllCustomer"
    };
    const fetchString: string = JSON.stringify(serverId);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    return answer;
  }

  // Check for duplicate Order Id
  static async checkForOrderId (usableData: SearchTerm): Promise<boolean> {
    usableData.serverId = "CheckOrderId";
    const fetchString: string = JSON.stringify(usableData);

    const response: Response = await fetch(serverString, {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    if (answer == "true") {
      return true;
    }
    else return false;
  }
}
