//import modules
import * as Http from "http";
import * as Mongo from "mongodb";



//import types
import type { WithId, Document } from "mongodb";



interface ServerId {
    ServerId: string;
  }

interface Username extends WithId<Document> {
    Username: string;
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


let databaseUser: Mongo.Collection;
let databaseProducts: Mongo.Collection;


let port: number = Number(process.env.PORT);
if (!port)
    port = 8100;

let databaseUrl: string = "mongodb+srv://test-user:hhtkDpO0wsSZ4V4Q@giswise2020.wgtcu.mongodb.net/Data?retryWrites=true&w=majority";

startServer(port);

connectToDatabase(databaseUrl);

function startServer(_port: number): void {

    let server: Http.Server = Http.createServer();
    console.log("Server auf: " + _port);

    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);

    server.listen(_port);

  }


async function connectToDatabase(_url: string): Promise<void> {

    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url);

    await mongoClient.connect();

    databaseUser = mongoClient.db("Data").collection("User");
    databaseProducts = mongoClient.db("Data").collection("Products");
    console.log("CollectionOne connection ", databaseUser != undefined);
    console.log("CollectionTwo connection ", databaseProducts != undefined);
  }


function handleListen(): void {
    console.log("Listening");
  }


function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {

    if (_request.method == "POST") {
      let body: string = "";
      _request.on("data", data => {
        body += data.toString();
      });



      _request.on("end", async () => {



        let checkForId: ServerId = JSON.parse("{\"" + decodeURI(body.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
        
        if (checkForId.ServerId == "Login") { //Check for Login Data
        
          let usableData: LoginData = JSON.parse("{\"" + decodeURI(body.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
          delete usableData.ServerId;
          _response.setHeader("content-type", "text/html; charset=utf-8");
          _response.setHeader("Access-Control-Allow-Origin", "*");
          _response.write(await checkForLogin(usableData));
          _response.end();

      }

        if (checkForId.ServerId == "BuildSite") { //Check for Admin Privileges

        let usableData: LoginData = JSON.parse("{\"" + decodeURI(body.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
        delete usableData.ServerId;       
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await checkForAdmin(usableData));
        _response.end();

    }

        if (checkForId.ServerId == "CreateUser") { //Check and create User
        
        let usableData: UserData = JSON.parse("{\"" + decodeURI(body.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await createUser(usableData));
        _response.end();

  }

        if (checkForId.ServerId == "AllAdmin") { //Check and create User
        
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await retrieveAllAdmin());
        _response.end();

  }

        if (checkForId.ServerId == "ChangeAdmin") { //Check and create User
        
        let usableData: Username = JSON.parse("{\"" + decodeURI(body.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await changeAdmin(usableData.Username));
        _response.end();

}

        if (checkForId.ServerId == "CreateProduct") { //Check and create Product
        
        let usableData: Product = JSON.parse("{\"" + decodeURI(body.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
        delete usableData.ServerId;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(await createProduct(usableData));
        _response.end();

}

      });

    }

  }

async function checkForLogin(usableData: LoginData): Promise<string> {

    let allData: LoginData[] = (await databaseUser.find({}).toArray()) as LoginData[];
    
    if (allData.length >= 1) {

      for (let x: number = 0; x < allData.length; x++) {

        if (allData[x].Username == usableData.Username && (allData[x].Password == usableData.Password)) { return "true"; }

      }

    }

    return "false";

}

async function checkForAdmin(usableData: LoginData): Promise<string> {

  let adminData: AdminData[] = (await databaseUser.find({}).toArray()) as AdminData[];
  
  if (adminData.length >= 1) {

    for (let x: number = 0; x < adminData.length; x++) {

      if (adminData[x].Username == usableData.Username) { 
        
        if (adminData[x].Admin == "true") {return "true"; }
      
      }

    }

  }

  return "false";

}

async function createUser(usableData: UserData): Promise<string> {

  let allData: UserData[] = (await databaseUser.find().toArray()) as UserData[];
  
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

async function retrieveAllAdmin(): Promise<string> {

  let allData: AdminData[] = await databaseUser.find({}).toArray() as AdminData[];
  
  return JSON.stringify(allData);

}

async function changeAdmin(username: string): Promise<string> {

  let userAdminData: AdminData = await databaseUser.findOne({"Username": username }) as AdminData;

  if (userAdminData.Admin == "true") {

    await databaseUser.findOneAndUpdate({"Username": username}, {$set: { "Admin": "false" }});
    return "false";
  }
  else  {

    await databaseUser.findOneAndUpdate({"Username": username}, {$set: { "Admin": "true" }});
    return "true";

  }
  

  

}

async function createProduct(usableData: Product): Promise<string> {

  let allData: Product[] = (await databaseProducts.find().toArray()) as Product[];
  
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