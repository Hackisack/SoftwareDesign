var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import modules
import * as Http from "http";
import * as Mongo from "mongodb";
let databaseUser;
let databaseProducts;
let port = Number(process.env.PORT);
if (!port)
    port = 8100;
let databaseUrl = "mongodb+srv://test-user:hhtkDpO0wsSZ4V4Q@giswise2020.wgtcu.mongodb.net/Data?retryWrites=true&w=majority";
startServer(port);
connectToDatabase(databaseUrl);
function startServer(_port) {
    let server = Http.createServer();
    console.log("Server auf: " + _port);
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(_port);
}
function connectToDatabase(_url) {
    return __awaiter(this, void 0, void 0, function* () {
        let mongoClient = new Mongo.MongoClient(_url);
        yield mongoClient.connect();
        databaseUser = mongoClient.db("Data").collection("User");
        databaseProducts = mongoClient.db("Data").collection("Products");
        console.log("CollectionOne connection ", databaseUser != undefined);
        console.log("CollectionTwo connection ", databaseProducts != undefined);
    });
}
function handleListen() {
    console.log("Listening");
}
function handleRequest(_request, _response) {
    if (_request.method == "POST") {
        let body = "";
        _request.on("data", data => {
            body += data.toString();
        });
        _request.on("end", () => __awaiter(this, void 0, void 0, function* () {
            let checkForId = JSON.parse("{\"" + decodeURI(body.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
            if (checkForId.ServerId == "Login") { //Check for Login Data
                let usableData = JSON.parse("{\"" + decodeURI(body.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield checkForLogin(usableData));
                _response.end();
            }
            if (checkForId.ServerId == "BuildSite") { //Check for Admin Privileges
                let usableData = JSON.parse("{\"" + decodeURI(body.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield checkForAdmin(usableData));
                _response.end();
            }
            if (checkForId.ServerId == "CreateUser") { //Check and create User
                let usableData = JSON.parse("{\"" + decodeURI(body.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield createUser(usableData));
                _response.end();
            }
            if (checkForId.ServerId == "AllAdmin") { //Check and create User
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield retrieveAllAdmin());
                _response.end();
            }
            if (checkForId.ServerId == "ChangeAdmin") { //Check and create User
                let usableData = JSON.parse("{\"" + decodeURI(body.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield changeAdmin(usableData.Username));
                _response.end();
            }
            if (checkForId.ServerId == "CreateProduct") { //Check and create Product
                let usableData = JSON.parse("{\"" + decodeURI(body.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + "\"}");
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield createProduct(usableData));
                _response.end();
            }
        }));
    }
}
function checkForLogin(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        let allData = (yield databaseUser.find({}).toArray());
        if (allData.length >= 1) {
            for (let x = 0; x < allData.length; x++) {
                if (allData[x].Username == usableData.Username && (allData[x].Password == usableData.Password)) {
                    return "true";
                }
            }
        }
        return "false";
    });
}
function checkForAdmin(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        let adminData = (yield databaseUser.find({}).toArray());
        if (adminData.length >= 1) {
            for (let x = 0; x < adminData.length; x++) {
                if (adminData[x].Username == usableData.Username) {
                    if (adminData[x].Admin == "true") {
                        return "true";
                    }
                }
            }
        }
        return "false";
    });
}
function createUser(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        let allData = (yield databaseUser.find().toArray());
        if (allData.length >= 1) {
            for (let x = 0; x < allData.length; x++) {
                if (allData[x].Username == usableData.Username) {
                    return "false";
                }
            }
        }
        yield databaseUser.insertOne(usableData);
        return "true";
    });
}
function retrieveAllAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        let allData = yield databaseUser.find({}).toArray();
        return JSON.stringify(allData);
    });
}
function changeAdmin(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let userAdminData = yield databaseUser.findOne({ "Username": username });
        if (userAdminData.Admin == "true") {
            yield databaseUser.findOneAndUpdate({ "Username": username }, { $set: { "Admin": "false" } });
            return "false";
        }
        else {
            yield databaseUser.findOneAndUpdate({ "Username": username }, { $set: { "Admin": "true" } });
            return "true";
        }
    });
}
function createProduct(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        let allData = (yield databaseProducts.find().toArray());
        if (allData.length >= 1) {
            for (let x = 0; x < allData.length; x++) {
                if (allData[x].ID == usableData.ID) {
                    return "false";
                }
            }
        }
        yield databaseProducts.insertOne(usableData);
        return "true";
    });
}
//# sourceMappingURL=server.js.map