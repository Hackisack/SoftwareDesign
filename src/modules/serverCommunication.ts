// Module Imports
import { Customer } from "./customer.js";
import { ChangeAdmin, LoginData, SearchTerm, ServerId } from "./interfaces.js";
import { Order } from "./order.js";
import { Product } from "./product.js";
import { User } from "./user.js";

export class ServerCommunication {
  // check either for Login validity or for Admin privileges
  async checkLoginOrAdminComm (usableData: LoginData): Promise<boolean> {
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

  // Add user
  async addUserComm (usableData: User): Promise<boolean> {
    usableData.serverId = "CreateUser";
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

  // Return all Admin Data
  async allAdminDataComm (): Promise<string> {
    const serverId: ServerId = {
      serverId: "AllAdmin"
    };
    const fetchString: string = JSON.stringify(serverId);

    const response: Response = await fetch("http://localhost:8100", {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    return answer;
  }

  // Return all Order Data
  async allOrderDataComm (): Promise<string> {
    const serverId: ServerId = {
      serverId: "AllOrder"
    };
    const fetchString: string = JSON.stringify(serverId);

    const response: Response = await fetch("http://localhost:8100", {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    return answer;
  }

  // Change Admin Privileges of User
  async changeAdminPrivilegesComm (username: string): Promise<string> {
    const serverId: ChangeAdmin = {
      serverId: "ChangeAdmin",
      username: username
    };
    const fetchString: string = JSON.stringify(serverId);

    const response: Response = await fetch("http://localhost:8100", {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    return answer;
  }

  // Add Product
  async addProductComm (usableData: Product): Promise<boolean> {
    usableData.serverId = "CreateProduct";
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

  // Search Product
  async searchProductComm (usableData: SearchTerm): Promise<string> {
    usableData.serverId = "SearchProduct";
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

  // Edit Product
  async editProductComm (usableData: Product): Promise<boolean> {
    usableData.serverId = "EditProduct";
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

  // Edit Order
  async editOrderComm (usableData: Order): Promise<boolean> {
    usableData.serverId = "EditOrder";
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

  // Edit Customer
  async editCustomerComm (usableData: Customer): Promise<boolean> {
    usableData.serverId = "EditCustomer";
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

  // Add Customer
  async addCustomerComm (usableData: Customer): Promise<boolean> {
    usableData.serverId = "CreateCustomer";
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

  // Search Customer
  async searchCustomerComm (usableData: SearchTerm): Promise<string> {
    usableData.serverId = "SearchCustomer";
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

  // Search Order
  async searchOrderComm (usableData: SearchTerm): Promise<string> {
    usableData.serverId = "SearchOrder";
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

  // Create Order
  async createOrderComm (usableData: Order): Promise<boolean> {
    usableData.serverId = "CreateOrder";
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

  // Return all Products
  async allProductDataComm (): Promise<string> {
    const serverId: ServerId = {
      serverId: "AllProduct"
    };
    const fetchString: string = JSON.stringify(serverId);

    const response: Response = await fetch("http://localhost:8100", {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    return answer;
  }

  // Return all Customers
  async allCustomerDataComm (): Promise<string> {
    const serverId: ServerId = {
      serverId: "AllCustomer"
    };
    const fetchString: string = JSON.stringify(serverId);

    const response: Response = await fetch("http://localhost:8100", {

      method: "POST",

      body: fetchString
    });

    const answer: string = await response.text();

    return answer;
  }

  // Check for duplicate Order Id
  async checkForOrderId (usableData: SearchTerm): Promise<boolean> {
    usableData.serverId = "CheckOrderId";
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
}
