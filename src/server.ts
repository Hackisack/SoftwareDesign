/* eslint-disable eqeqeq */
// import modules
import * as Http from "http";
import * as Mongo from "mongodb";

// import types
import type { WithId, Document } from "mongodb";

interface ServerId {
  Username: string;
  Password: string;
  ServerId: string;
}

interface Amount extends WithId<Document> {
  Amount: number;
}

interface Product extends WithId<Document> {
  ID: string;
  Description: string;
  MEDate: Date;
  Price: number;
  StandardDeliveryTime: number;
  MinBG: number;
  MaxBG: number;
  DiscountBG: number;
  Discount: number;
}

interface OrderData extends WithId<Document> {
  ID: string;
  Customer: string;
  Description: string;
  OrderDate: Date;
  DeliveryDate: Date;
  Price: number;
  OrderPositions?: [[Product, Amount]];
}

interface Username extends WithId<Document> {
  Username: string;
}

interface SearchTerm extends WithId<Document> {
  SearchTerm: string;
}

interface LoginData extends WithId<Document> {
  Username: string;
  Password: string;
}

interface AdminData extends WithId<Document> {
  Username: string;
  Admin: string;
}

interface UserData extends WithId<Document> {
  Username: string;
  Password: string;
  Admin: string;
}

interface CustomerData extends WithId<Document> {
  ID: string;
  Name: string;
  Adress: string;
  Discount: number;
}

let databaseUser: Mongo.Collection;
let databaseProducts: Mongo.Collection;
let databaseCustomers: Mongo.Collection;
let databaseOrders: Mongo.Collection;

let port: number = Number(process.env.PORT);
if (!port) {
  port = 8100;
}

const databaseUrl: string = "mongodb+srv://test-user:hhtkDpO0wsSZ4V4Q@giswise2020.wgtcu.mongodb.net/Data?retryWrites=true&w=majority";

startServer(port);

connectToDatabase(databaseUrl);

function startServer (_port: number): void {
  const server: Http.Server = Http.createServer();
  console.log("Server auf: " + _port);

  server.addListener("request", handleRequest);
  server.addListener("listening", handleListen);

  server.listen(_port);
}

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

function handleListen (): void {
  console.log("Listening");
}

function handleRequest (_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
  if (_request.method == "POST") {
    let body: string = "";
    _request.on("data", data => {
      body += data.toString();
    });

    _request.on("end", async () => {
      const checkForId: ServerId = JSON.parse(body);

      if (checkForId.ServerId == "Login") { // Check for Login Data
        const usableData: LoginData = JSON.parse(body);
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await checkForLogin(usableData));
        _response.end();
      }

      if (checkForId.ServerId == "BuildSite") { // Check for Admin Privileges
        const usableData: LoginData = JSON.parse(body);
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await checkForAdmin(usableData));
        _response.end();
      }

      if (checkForId.ServerId == "CreateUser") { // Check and create User
        const usableData: UserData = JSON.parse(body);
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await createUser(usableData));
        _response.end();
      }

      if (checkForId.ServerId == "AllAdmin") { // Check and create User
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await retrieveAllAdmin());
        _response.end();
      }

      if (checkForId.ServerId == "ChangeAdmin") { // Check and create User
        const usableData: Username = JSON.parse(body);
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await changeAdmin(usableData.Username));
        _response.end();
      }

      if (checkForId.ServerId == "CreateProduct") { // Check and create Product
        const usableData: Product = JSON.parse(body);

        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await createProduct(usableData));
        _response.end();
      }

      if (checkForId.ServerId == "SearchProduct") { // SearchProduct
        const usableData: SearchTerm = JSON.parse(body);
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await searchProduct(usableData.SearchTerm));
        _response.end();
      }

      if (checkForId.ServerId == "CreateCustomer") { // Check and create Product
        const usableData: CustomerData = JSON.parse(body);
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await createCustomer(usableData));
        _response.end();
      }

      if (checkForId.ServerId == "SearchCustomer") { // SearchProduct
        const usableData: SearchTerm = JSON.parse(body);
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await searchCustomer(usableData.SearchTerm));
        _response.end();
      }

      if (checkForId.ServerId == "SearchOrder") { // SearchProduct
        const usableData: SearchTerm = JSON.parse(body);
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await searchOrder(usableData.SearchTerm));
        _response.end();
      }

      if (checkForId.ServerId == "AllProduct") { // Check and create User
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await retrieveAllProduct());
        _response.end();
      }

      if (checkForId.ServerId == "AllCustomer") { // Check and create User
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await retrieveAllCustomer());
        _response.end();
      }

      if (checkForId.ServerId == "EditProduct") { // Check and create User
        const usableData: Product = JSON.parse(body);
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await editProduct(usableData));
        _response.end();
      }

      if (checkForId.ServerId == "EditCustomer") { // Check and create User
        const usableData: CustomerData = JSON.parse(body);
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await editCustomer(usableData));
        _response.end();
      }

      if (checkForId.ServerId == "EditOrder") { // Check and create User
        const usableData: OrderData = JSON.parse(body);
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await editOrder(usableData));
        _response.end();
      }

      if (checkForId.ServerId == "AllOrder") { // Check and create User
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await retrieveAllOrder());
        _response.end();
      }

      if (checkForId.ServerId == "CreateOrder") { // Check and create User
        const usableData: OrderData = JSON.parse(body);
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await createOrder(usableData));
        _response.end();
      }
    });
  }
}

async function checkForLogin (usableData: LoginData): Promise<string> {
  const allData: LoginData[] = (await databaseUser.find({}).toArray()) as LoginData[];

  if (allData.length >= 1) {
    for (let x: number = 0; x < allData.length; x++) {
      if (allData[x].Username == usableData.Username && (allData[x].Password == usableData.Password)) {
        return "true";
      }
    }
  }

  return "false";
}

async function checkForAdmin (usableData: LoginData): Promise<string> {
  const adminData: AdminData[] = (await databaseUser.find({}).toArray()) as AdminData[];

  if (adminData.length >= 1) {
    for (let x: number = 0; x < adminData.length; x++) {
      if (adminData[x].Username == usableData.Username) {
        if (adminData[x].Admin == "true") {
          return "true";
        }
      }
    }
  }

  return "false";
}

async function createUser (usableData: UserData): Promise<string> {
  const allData: UserData[] = (await databaseUser.find().toArray()) as UserData[];

  if (allData.length >= 1) {
    for (let x: number = 0; x < allData.length; x++) {
      if (allData[x].Username == usableData.Username) {
        return "false";
      }
    }
  }
  await databaseUser.insertOne(usableData);

  return "true";
}

async function retrieveAllAdmin (): Promise<string> {
  const allData: AdminData[] = await databaseUser.find({}).toArray() as AdminData[];

  return JSON.stringify(allData);
}

async function retrieveAllOrder (): Promise<string> {
  const allData: OrderData[] = await databaseUser.find({}).toArray() as OrderData[];

  return JSON.stringify(allData);
}

async function changeAdmin (username: string): Promise<string> {
  const userAdminData: AdminData = await databaseUser.findOne({ Username: username }) as AdminData;

  if (userAdminData.Admin == "true") {
    await databaseUser.findOneAndUpdate({ Username: username }, { $set: { Admin: "false" } });
    return "false";
  }
  else {
    await databaseUser.findOneAndUpdate({ Username: username }, { $set: { Admin: "true" } });
    return "true";
  }
}

async function editProduct (usableData: Product): Promise<string> {
  const allData: Product[] = await databaseProducts.find().toArray() as Product[];
  for (let x: number = 0; x < allData.length; x++) {
    if (usableData.ID == allData[x].ID) {
      await databaseProducts.findOneAndDelete({ ID: usableData.ID });
      await databaseProducts.insertOne(usableData);
      return "true";
    }
  }
  return "false";
}

async function editCustomer (usableData: CustomerData): Promise<string> {
  const allData: CustomerData[] = await databaseCustomers.find().toArray() as CustomerData[];
  for (let x: number = 0; x < allData.length; x++) {
    if (usableData.ID == allData[x].ID) {
      await databaseCustomers.findOneAndDelete({ ID: usableData.ID });
      await databaseCustomers.insertOne(usableData);
      return "true";
    }
  }
  return "false";
}

async function editOrder (usableData: OrderData): Promise<string> {
  const allData: OrderData[] = await databaseOrders.find().toArray() as OrderData[];
  for (let x: number = 0; x < allData.length; x++) {
    if (usableData.ID == allData[x].ID) {
      await databaseOrders.findOneAndDelete({ ID: usableData.ID });
      await databaseOrders.insertOne(usableData);
      return "true";
    }
  }
  return "false";
}

async function createProduct (usableData: Product): Promise<string> {
  const allData: Product[] = (await databaseProducts.find().toArray()) as Product[];

  if (allData.length >= 1) {
    for (let x: number = 0; x < allData.length; x++) {
      if (allData[x].ID == usableData.ID) {
        return "false";
      }
    }
  }

  await databaseProducts.insertOne(usableData);

  return "true";
}

async function searchProduct (usableData: string): Promise<string> {
  const foundProduct: Product[] = await databaseProducts.find({ $or: [{ ID: usableData }, { Description: usableData }] }).toArray() as Product[];
  return JSON.stringify(foundProduct);
}

async function createCustomer (usableData: CustomerData): Promise<string> {
  const allData: CustomerData[] = (await databaseCustomers.find().toArray()) as CustomerData[];

  if (allData.length >= 1) {
    for (let x: number = 0; x < allData.length; x++) {
      if (allData[x].ID == usableData.ID) {
        return "false";
      }
    }
  }

  await databaseCustomers.insertOne(usableData);

  return "true";
}

async function searchCustomer (usableData: string): Promise<string> {
  const foundCustomer: CustomerData[] = await databaseCustomers.find({ $or: [{ ID: usableData }, { Name: usableData }] }).toArray() as CustomerData[];
  return JSON.stringify(foundCustomer);
}

async function searchOrder (usableData: string): Promise<string> {
  const foundOrder: OrderData[] = await databaseOrders.find({ $or: [{ ID: usableData }, { Description: usableData }] }).toArray() as OrderData[];
  return JSON.stringify(foundOrder);
}

async function retrieveAllProduct (): Promise<string> {
  const allData: Product[] = await databaseProducts.find({}).toArray() as Product[];

  return JSON.stringify(allData);
}

async function retrieveAllCustomer (): Promise<string> {
  const allData: CustomerData[] = await databaseCustomers.find({}).toArray() as CustomerData[];

  return JSON.stringify(allData);
}

async function createOrder (usableData: OrderData): Promise<string> {
  const allData: OrderData[] = (await databaseOrders.find().toArray()) as OrderData[];

  if (allData.length >= 1) {
    for (let x: number = 0; x < allData.length; x++) {
      if (allData[x].ID == usableData.ID) {
        return "false";
      }
    }
  }
  await databaseOrders.insertOne(usableData);

  return "true";
}
