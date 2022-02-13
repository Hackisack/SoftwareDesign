// import modules
import * as Http from "http";
import * as Mongo from "mongodb";

// import types
import type { WithId, Document } from "mongodb";

// define Interfaces for used Data to help with overview Note: "extends WithId<Document>" is needed for MongoDB functionality
interface ServerId {
  username: string;
  password: string;
  serverId: string;
}

interface Amount extends WithId<Document> {
  amount: number;
}

interface Product extends WithId<Document> {
  id: string;
  description: string;
  meDate: Date;
  price: number;
  standardDeliveryTime: number;
  minBG: number;
  maxBG: number;
  discountBG: number;
  discount: number;
}

interface OrderData extends WithId<Document> {
  id: string;
  customer: string;
  description: string;
  orderDate: Date;
  deliveryDate: Date;
  price: number;
  orderPositions?: [[Product, Amount]];
}

interface Username extends WithId<Document> {
  username: string;
}

interface SearchTerm extends WithId<Document> {
  searchTerm: string;
}

interface LoginData extends WithId<Document> {
  username: string;
  password: string;
}

interface AdminData extends WithId<Document> {
  username: string;
  admin: string;
}

interface UserData extends WithId<Document> {
  username: string;
  password: string;
  admin: string;
}

interface CustomerData extends WithId<Document> {
  id: string;
  name: string;
  adress: string;
  discount: number;
}

// define different Databases
let databaseUser: Mongo.Collection;
let databaseProducts: Mongo.Collection;
let databaseCustomers: Mongo.Collection;
let databaseOrders: Mongo.Collection;

// define port number if run local
let port: number = Number(process.env.PORT);
if (!port) {
  port = 8100;
}

// Database Connectionstring
const databaseUrl: string = "mongodb+srv://test-user:hhtkDpO0wsSZ4V4Q@giswise2020.wgtcu.mongodb.net/Data?retryWrites=true&w=majority";

startServer(port);

connectToDatabase(databaseUrl);

// start Server and display Port
function startServer (_port: number): void {
  const server: Http.Server = Http.createServer();
  console.log("Server at: " + _port);

  server.addListener("request", handleRequest);
  server.addListener("listening", handleListen);

  server.listen(_port);
}

// await connection to Database and Collections and display status
async function connectToDatabase (_url: string): Promise<void> {
  const mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url);

  await mongoClient.connect();

  databaseUser = mongoClient.db("Data").collection("User");
  databaseProducts = mongoClient.db("Data").collection("Products");
  databaseCustomers = mongoClient.db("Data").collection("Customers");
  databaseOrders = mongoClient.db("Data").collection("Orders");
  console.log("CollectionUser connection ", databaseUser != undefined);
  console.log("CollectionProducts connection ", databaseProducts != undefined);
  console.log("CollectionCustomers connection ", databaseCustomers != undefined);
  console.log("CollectionOrders connection ", databaseOrders != undefined);
}

// listen for incoming requests
function handleListen (): void {
  console.log("Listening");
}

// handle incoming requests
function handleRequest (_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
  // get request data
  if (_request.method == "POST") {
    let body: string = "";
    _request.on("data", data => {
      body += data.toString();
    });

    // choose suitable function and write response for request
    _request.on("end", async () => {
      const checkForId: ServerId = JSON.parse(body);

      // check for given serverId and choose right function
      if (checkForId.serverId == "Login") { // Check for Login Data
        const usableData: LoginData = JSON.parse(body);
        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await checkForLogin(usableData));
        _response.end();
      }

      if (checkForId.serverId == "BuildSite") { // Check for Admin Privileges
        const usableData: LoginData = JSON.parse(body);
        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await checkForAdmin(usableData));
        _response.end();
      }

      if (checkForId.serverId == "CreateUser") { // Check for duplicate id and create User
        const usableData: UserData = JSON.parse(body);
        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await createUser(usableData));
        _response.end();
      }

      if (checkForId.serverId == "AllAdmin") { // return all Users
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await retrieveAllAdmin());
        _response.end();
      }

      if (checkForId.serverId == "ChangeAdmin") { // Change Admin privileges
        const usableData: Username = JSON.parse(body);
        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await changeAdmin(usableData.username));
        _response.end();
      }

      if (checkForId.serverId == "CreateProduct") { //  Check for duplicate id and create Product
        const usableData: Product = JSON.parse(body);

        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await createProduct(usableData));
        _response.end();
      }

      if (checkForId.serverId == "SearchProduct") { // Search for product
        const usableData: SearchTerm = JSON.parse(body);
        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await searchProduct(usableData.searchTerm));
        _response.end();
      }

      if (checkForId.serverId == "CreateCustomer") { //  Check for duplicate id and create Customer
        const usableData: CustomerData = JSON.parse(body);
        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await createCustomer(usableData));
        _response.end();
      }

      if (checkForId.serverId == "SearchCustomer") { // Search for Customer
        const usableData: SearchTerm = JSON.parse(body);
        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await searchCustomer(usableData.searchTerm));
        _response.end();
      }

      if (checkForId.serverId == "SearchOrder") { // Search for Order
        const usableData: SearchTerm = JSON.parse(body);
        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await searchOrder(usableData.searchTerm));
        _response.end();
      }

      if (checkForId.serverId == "AllProduct") { // retrieve all Products
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await retrieveAllProduct());
        _response.end();
      }

      if (checkForId.serverId == "AllCustomer") { // retrieve all Customer
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await retrieveAllCustomer());
        _response.end();
      }

      if (checkForId.serverId == "EditProduct") { // edit specific Product
        const usableData: Product = JSON.parse(body);
        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await editProduct(usableData));
        _response.end();
      }

      if (checkForId.serverId == "EditCustomer") { // edit specific Customer
        const usableData: CustomerData = JSON.parse(body);
        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await editCustomer(usableData));
        _response.end();
      }

      if (checkForId.serverId == "EditOrder") { // edit specific Order
        const usableData: OrderData = JSON.parse(body);
        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await editOrder(usableData));
        _response.end();
      }

      if (checkForId.serverId == "AllOrder") { // retrieve all Orders
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await retrieveAllOrder());
        _response.end();
      }

      if (checkForId.serverId == "CheckOrderId") { // Check for duplicate Order ID before creation
        const usableData: SearchTerm = JSON.parse(body);
        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await checkForOrderId(usableData));
        _response.end();
      }

      if (checkForId.serverId == "CreateOrder") { // Create Order
        const usableData: OrderData = JSON.parse(body);
        delete usableData.serverId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await createOrder(usableData));
        _response.end();
      }
    });
  }
}

// check if Login Data is in Database
async function checkForLogin (usableData: LoginData): Promise<string> {
  const allData: LoginData[] = (await databaseUser.find({}).toArray()) as LoginData[];

  if (allData.length >= 1) {
    for (let x: number = 0; x < allData.length; x++) {
      if (allData[x].username == usableData.username && (allData[x].password == usableData.password)) {
        return "true";
      }
    }
  }

  return "false";
}

// check if User is Admin
async function checkForAdmin (usableData: LoginData): Promise<string> {
  const adminData: AdminData[] = (await databaseUser.find({}).toArray()) as AdminData[];

  if (adminData.length >= 1) {
    for (let x: number = 0; x < adminData.length; x++) {
      if (adminData[x].username == usableData.username) {
        if (adminData[x].admin == "true") {
          return "true";
        }
      }
    }
  }

  return "false";
}

// create User if no Username is duplicate
async function createUser (usableData: UserData): Promise<string> {
  const allData: UserData[] = (await databaseUser.find().toArray()) as UserData[];

  if (allData.length >= 1) {
    for (let x: number = 0; x < allData.length; x++) {
      if (allData[x].username == usableData.username) {
        return "false";
      }
    }
  }
  await databaseUser.insertOne(usableData);

  return "true";
}

// return all User
async function retrieveAllAdmin (): Promise<string> {
  const allData: AdminData[] = await databaseUser.find({}).toArray() as AdminData[];

  return JSON.stringify(allData);
}

// return all Orders
async function retrieveAllOrder (): Promise<string> {
  const allData: OrderData[] = await databaseOrders.find({}).toArray() as OrderData[];

  return JSON.stringify(allData);
}

// change Admin privileges
async function changeAdmin (username: string): Promise<string> {
  const userAdminData: AdminData = await databaseUser.findOne({ username: username }) as AdminData;

  if (userAdminData.admin == "true") {
    await databaseUser.findOneAndUpdate({ username: username }, { $set: { admin: "false" } });
    return "false";
  }
  else {
    await databaseUser.findOneAndUpdate({ username: username }, { $set: { admin: "true" } });
    return "true";
  }
}

// edit Product --> delete old entry and replace with new
async function editProduct (usableData: Product): Promise<string> {
  const allData: Product[] = await databaseProducts.find().toArray() as Product[];
  for (let x: number = 0; x < allData.length; x++) {
    if (usableData.id == allData[x].id) {
      await databaseProducts.findOneAndDelete({ id: usableData.id });
      await databaseProducts.insertOne(usableData);
      return "true";
    }
  }
  return "false";
}

// edit Customer --> delete old entry and replace with new
async function editCustomer (usableData: CustomerData): Promise<string> {
  const allData: CustomerData[] = await databaseCustomers.find().toArray() as CustomerData[];
  for (let x: number = 0; x < allData.length; x++) {
    if (usableData.id == allData[x].id) {
      await databaseCustomers.findOneAndDelete({ ID: usableData.ID });
      await databaseCustomers.insertOne(usableData);
      return "true";
    }
  }
  return "false";
}

// edit Order --> delete old entry and replace with new
async function editOrder (usableData: OrderData): Promise<string> {
  const allData: OrderData[] = await databaseOrders.find().toArray() as OrderData[];
  for (let x: number = 0; x < allData.length; x++) {
    if (usableData.id == allData[x].id) {
      await databaseOrders.findOneAndDelete({ id: usableData.id });
      await databaseOrders.insertOne(usableData);
      return "true";
    }
  }
  return "false";
}

// create Product if no Id is duplicate
async function createProduct (usableData: Product): Promise<string> {
  const allData: Product[] = (await databaseProducts.find().toArray()) as Product[];

  if (allData.length >= 1) {
    for (let x: number = 0; x < allData.length; x++) {
      if (allData[x].id == usableData.id) {
        return "false";
      }
    }
  }

  await databaseProducts.insertOne(usableData);

  return "true";
}

// search for Product
async function searchProduct (usableData: string): Promise<string> {
  const foundProduct: Product[] = await databaseProducts.find({ $or: [{ id: usableData }, { description: usableData }] }).toArray() as Product[];
  return JSON.stringify(foundProduct);
}

// create Customer if no Id is duplicate
async function createCustomer (usableData: CustomerData): Promise<string> {
  const allData: CustomerData[] = (await databaseCustomers.find().toArray()) as CustomerData[];

  if (allData.length >= 1) {
    for (let x: number = 0; x < allData.length; x++) {
      if (allData[x].id == usableData.id) {
        return "false";
      }
    }
  }

  await databaseCustomers.insertOne(usableData);

  return "true";
}

// search for Customer
async function searchCustomer (usableData: string): Promise<string> {
  const foundCustomer: CustomerData[] = await databaseCustomers.find({ $or: [{ id: usableData }, { name: usableData }] }).toArray() as CustomerData[];
  return JSON.stringify(foundCustomer);
}

// search for Order
async function searchOrder (usableData: string): Promise<string> {
  const foundOrder: OrderData[] = await databaseOrders.find({ $or: [{ id: usableData }, { description: usableData }] }).toArray() as OrderData[];
  return JSON.stringify(foundOrder);
}

// return all Products
async function retrieveAllProduct (): Promise<string> {
  const allData: Product[] = await databaseProducts.find({}).toArray() as Product[];

  return JSON.stringify(allData);
}

// return all Customers
async function retrieveAllCustomer (): Promise<string> {
  const allData: CustomerData[] = await databaseCustomers.find({}).toArray() as CustomerData[];

  return JSON.stringify(allData);
}

// create Order if no Id is duplicate
async function createOrder (usableData: OrderData): Promise<string> {
  const allData: OrderData[] = (await databaseOrders.find().toArray()) as OrderData[];

  if (allData.length >= 1) {
    for (let x: number = 0; x < allData.length; x++) {
      if (allData[x].id == usableData.id) {
        return "false";
      }
    }
  }
  await databaseOrders.insertOne(usableData);

  return "true";
}

// check for duplicate Order Id
async function checkForOrderId (usableData: SearchTerm): Promise<string> {
  const allData: OrderData[] = await databaseOrders.find({}).toArray() as OrderData[];

  for (let x = 0; x < allData.length; x++) {
    if (allData[x].ID == usableData.searchTerm) {
      return "false";
    }
  }

  return "true";
}
