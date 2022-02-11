var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable eqeqeq */
// import modules
import * as Http from "http";
import * as Mongo from "mongodb";
let databaseUser;
let databaseProducts;
let databaseCustomers;
let databaseOrders;
let port = Number(process.env.PORT);
if (!port) {
    port = 8100;
}
const databaseUrl = "mongodb+srv://test-user:hhtkDpO0wsSZ4V4Q@giswise2020.wgtcu.mongodb.net/Data?retryWrites=true&w=majority";
startServer(port);
connectToDatabase(databaseUrl);
function startServer(_port) {
    const server = Http.createServer();
    console.log("Server auf: " + _port);
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(_port);
}
function connectToDatabase(_url) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoClient = new Mongo.MongoClient(_url);
        yield mongoClient.connect();
        databaseUser = mongoClient.db("Data").collection("User");
        databaseProducts = mongoClient.db("Data").collection("Products");
        databaseCustomers = mongoClient.db("Data").collection("Customers");
        databaseOrders = mongoClient.db("Data").collection("Orders");
        console.log("CollectionUser connection ", databaseUser != undefined);
        console.log("CollectionProducts connection ", databaseProducts != undefined);
        console.log("CollectionCustomers connection ", databaseCustomers != undefined);
        console.log("CollectionOrders connection ", databaseOrders != undefined);
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
            const checkForId = JSON.parse(body);
            if (checkForId.ServerId == "Login") { // Check for Login Data
                const usableData = JSON.parse(body);
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield checkForLogin(usableData));
                _response.end();
            }
            if (checkForId.ServerId == "BuildSite") { // Check for Admin Privileges
                const usableData = JSON.parse(body);
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield checkForAdmin(usableData));
                _response.end();
            }
            if (checkForId.ServerId == "CreateUser") { // Check and create User
                const usableData = JSON.parse(body);
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield createUser(usableData));
                _response.end();
            }
            if (checkForId.ServerId == "AllAdmin") { // Check and create User
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield retrieveAllAdmin());
                _response.end();
            }
            if (checkForId.ServerId == "ChangeAdmin") { // Check and create User
                const usableData = JSON.parse(body);
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield changeAdmin(usableData.Username));
                _response.end();
            }
            if (checkForId.ServerId == "CreateProduct") { // Check and create Product
                const usableData = JSON.parse(body);
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield createProduct(usableData));
                _response.end();
            }
            if (checkForId.ServerId == "SearchProduct") { // SearchProduct
                const usableData = JSON.parse(body);
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield searchProduct(usableData.SearchTerm));
                _response.end();
            }
            if (checkForId.ServerId == "CreateCustomer") { // Check and create Product
                const usableData = JSON.parse(body);
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield createCustomer(usableData));
                _response.end();
            }
            if (checkForId.ServerId == "SearchCustomer") { // SearchProduct
                const usableData = JSON.parse(body);
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield searchCustomer(usableData.SearchTerm));
                _response.end();
            }
            if (checkForId.ServerId == "SearchOrder") { // SearchProduct
                const usableData = JSON.parse(body);
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield searchOrder(usableData.SearchTerm));
                _response.end();
            }
            if (checkForId.ServerId == "AllProduct") { // Check and create User
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield retrieveAllProduct());
                _response.end();
            }
            if (checkForId.ServerId == "AllCustomer") { // Check and create User
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield retrieveAllCustomer());
                _response.end();
            }
            if (checkForId.ServerId == "EditProduct") { // Check and create User
                const usableData = JSON.parse(body);
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield editProduct(usableData));
                _response.end();
            }
            if (checkForId.ServerId == "EditCustomer") { // Check and create User
                const usableData = JSON.parse(body);
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield editCustomer(usableData));
                _response.end();
            }
            if (checkForId.ServerId == "EditOrder") { // Check and create User
                const usableData = JSON.parse(body);
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield editOrder(usableData));
                _response.end();
            }
            if (checkForId.ServerId == "AllOrder") { // Check and create User
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield retrieveAllOrder());
                _response.end();
            }
            if (checkForId.ServerId == "CreateOrder") { // Check and create User
                const usableData = JSON.parse(body);
                delete usableData.ServerId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield createOrder(usableData));
                _response.end();
            }
        }));
    }
}
function checkForLogin(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = (yield databaseUser.find({}).toArray());
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
        const adminData = (yield databaseUser.find({}).toArray());
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
        const allData = (yield databaseUser.find().toArray());
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
        const allData = yield databaseUser.find({}).toArray();
        return JSON.stringify(allData);
    });
}
function retrieveAllOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseUser.find({}).toArray();
        return JSON.stringify(allData);
    });
}
function changeAdmin(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const userAdminData = yield databaseUser.findOne({ Username: username });
        if (userAdminData.Admin == "true") {
            yield databaseUser.findOneAndUpdate({ Username: username }, { $set: { Admin: "false" } });
            return "false";
        }
        else {
            yield databaseUser.findOneAndUpdate({ Username: username }, { $set: { Admin: "true" } });
            return "true";
        }
    });
}
function editProduct(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseProducts.find().toArray();
        for (let x = 0; x < allData.length; x++) {
            if (usableData.ID == allData[x].ID) {
                yield databaseProducts.findOneAndDelete({ ID: usableData.ID });
                yield databaseProducts.insertOne(usableData);
                return "true";
            }
        }
        return "false";
    });
}
function editCustomer(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseCustomers.find().toArray();
        for (let x = 0; x < allData.length; x++) {
            if (usableData.ID == allData[x].ID) {
                yield databaseCustomers.findOneAndDelete({ ID: usableData.ID });
                yield databaseCustomers.insertOne(usableData);
                return "true";
            }
        }
        return "false";
    });
}
function editOrder(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseOrders.find().toArray();
        for (let x = 0; x < allData.length; x++) {
            if (usableData.ID == allData[x].ID) {
                yield databaseOrders.findOneAndDelete({ ID: usableData.ID });
                yield databaseOrders.insertOne(usableData);
                return "true";
            }
        }
        return "false";
    });
}
function createProduct(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = (yield databaseProducts.find().toArray());
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
function searchProduct(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundProduct = yield databaseProducts.find({ $or: [{ ID: usableData }, { Description: usableData }] }).toArray();
        return JSON.stringify(foundProduct);
    });
}
function createCustomer(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = (yield databaseCustomers.find().toArray());
        if (allData.length >= 1) {
            for (let x = 0; x < allData.length; x++) {
                if (allData[x].ID == usableData.ID) {
                    return "false";
                }
            }
        }
        yield databaseCustomers.insertOne(usableData);
        return "true";
    });
}
function searchCustomer(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundCustomer = yield databaseCustomers.find({ $or: [{ ID: usableData }, { Name: usableData }] }).toArray();
        return JSON.stringify(foundCustomer);
    });
}
function searchOrder(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundOrder = yield databaseOrders.find({ $or: [{ ID: usableData }, { Description: usableData }] }).toArray();
        return JSON.stringify(foundOrder);
    });
}
function retrieveAllProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseProducts.find({}).toArray();
        return JSON.stringify(allData);
    });
}
function retrieveAllCustomer() {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseCustomers.find({}).toArray();
        return JSON.stringify(allData);
    });
}
function createOrder(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = (yield databaseOrders.find().toArray());
        if (allData.length >= 1) {
            for (let x = 0; x < allData.length; x++) {
                if (allData[x].ID == usableData.ID) {
                    return "false";
                }
            }
        }
        yield databaseOrders.insertOne(usableData);
        return "true";
    });
}
//# sourceMappingURL=server.js.map