var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import modules
import * as Http from "http";
import * as Mongo from "mongodb";
// define different Databases
let databaseUser;
let databaseProducts;
let databaseCustomers;
let databaseOrders;
// define port number if run local
let port = Number(process.env.PORT);
if (!port) {
    port = 8100;
}
// Database Connectionstring
const databaseUrl = "mongodb+srv://test-user:hhtkDpO0wsSZ4V4Q@giswise2020.wgtcu.mongodb.net/Data?retryWrites=true&w=majority";
startServer(port);
connectToDatabase(databaseUrl);
// start Server and display Port
function startServer(_port) {
    const server = Http.createServer();
    console.log("Server at: " + _port);
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(_port);
}
// await connection to Database and Collections and display status
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
// listen for incoming requests
function handleListen() {
    console.log("Listening");
}
// handle incoming requests
function handleRequest(_request, _response) {
    // get request data
    if (_request.method == "POST") {
        let body = "";
        _request.on("data", data => {
            body += data.toString();
        });
        // choose suitable function and write response for request
        _request.on("end", () => __awaiter(this, void 0, void 0, function* () {
            const checkForId = JSON.parse(body);
            // check for given serverId and choose right function
            if (checkForId.serverId == "Login") { // Check for Login Data
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield checkForLogin(usableData));
                _response.end();
            }
            if (checkForId.serverId == "BuildSite") { // Check for Admin Privileges
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield checkForAdmin(usableData));
                _response.end();
            }
            if (checkForId.serverId == "CreateUser") { // Check for duplicate id and create User
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield createUser(usableData));
                _response.end();
            }
            if (checkForId.serverId == "AllAdmin") { // return all Users
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield retrieveAllAdmin());
                _response.end();
            }
            if (checkForId.serverId == "ChangeAdmin") { // Change Admin privileges
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield changeAdmin(usableData.username));
                _response.end();
            }
            if (checkForId.serverId == "CreateProduct") { //  Check for duplicate id and create Product
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield createProduct(usableData));
                _response.end();
            }
            if (checkForId.serverId == "SearchProduct") { // Search for product
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield searchProduct(usableData.searchTerm));
                _response.end();
            }
            if (checkForId.serverId == "CreateCustomer") { //  Check for duplicate id and create Customer
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield createCustomer(usableData));
                _response.end();
            }
            if (checkForId.serverId == "SearchCustomer") { // Search for Customer
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield searchCustomer(usableData.searchTerm));
                _response.end();
            }
            if (checkForId.serverId == "SearchOrder") { // Search for Order
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield searchOrder(usableData.searchTerm));
                _response.end();
            }
            if (checkForId.serverId == "AllProduct") { // retrieve all Products
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield retrieveAllProduct());
                _response.end();
            }
            if (checkForId.serverId == "AllCustomer") { // retrieve all Customer
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield retrieveAllCustomer());
                _response.end();
            }
            if (checkForId.serverId == "EditProduct") { // edit specific Product
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield editProduct(usableData));
                _response.end();
            }
            if (checkForId.serverId == "EditCustomer") { // edit specific Customer
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield editCustomer(usableData));
                _response.end();
            }
            if (checkForId.serverId == "EditOrder") { // edit specific Order
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield editOrder(usableData));
                _response.end();
            }
            if (checkForId.serverId == "AllOrder") { // retrieve all Orders
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield retrieveAllOrder());
                _response.end();
            }
            if (checkForId.serverId == "CheckOrderId") { // Check for duplicate Order ID before creation
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield checkForOrderId(usableData));
                _response.end();
            }
            if (checkForId.serverId == "CreateOrder") { // Create Order
                const usableData = JSON.parse(body);
                delete usableData.serverId;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(yield createOrder(usableData));
                _response.end();
            }
        }));
    }
}
// check if Login Data is in Database
function checkForLogin(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = (yield databaseUser.find({}).toArray());
        if (allData.length >= 1) {
            for (let x = 0; x < allData.length; x++) {
                if (allData[x].username == usableData.username && (allData[x].password == usableData.password)) {
                    return "true";
                }
            }
        }
        return "false";
    });
}
// check if User is Admin
function checkForAdmin(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminData = (yield databaseUser.find({}).toArray());
        if (adminData.length >= 1) {
            for (let x = 0; x < adminData.length; x++) {
                if (adminData[x].username == usableData.username) {
                    if (adminData[x].admin == "true") {
                        return "true";
                    }
                }
            }
        }
        return "false";
    });
}
// create User if no Username is duplicate
function createUser(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = (yield databaseUser.find().toArray());
        if (allData.length >= 1) {
            for (let x = 0; x < allData.length; x++) {
                if (allData[x].username == usableData.username) {
                    return "false";
                }
            }
        }
        yield databaseUser.insertOne(usableData);
        return "true";
    });
}
// return all User
function retrieveAllAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseUser.find({}).toArray();
        return JSON.stringify(allData);
    });
}
// return all Orders
function retrieveAllOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseOrders.find({}).toArray();
        return JSON.stringify(allData);
    });
}
// change Admin privileges
function changeAdmin(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const userAdminData = yield databaseUser.findOne({ username: username });
        if (userAdminData.admin == "true") {
            yield databaseUser.findOneAndUpdate({ username: username }, { $set: { admin: "false" } });
            return "false";
        }
        else {
            yield databaseUser.findOneAndUpdate({ username: username }, { $set: { admin: "true" } });
            return "true";
        }
    });
}
// edit Product --> delete old entry and replace with new
function editProduct(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseProducts.find().toArray();
        for (let x = 0; x < allData.length; x++) {
            if (usableData.id == allData[x].id) {
                yield databaseProducts.findOneAndDelete({ id: usableData.id });
                yield databaseProducts.insertOne(usableData);
                return "true";
            }
        }
        return "false";
    });
}
// edit Customer --> delete old entry and replace with new
function editCustomer(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseCustomers.find().toArray();
        for (let x = 0; x < allData.length; x++) {
            if (usableData.id == allData[x].id) {
                yield databaseCustomers.findOneAndDelete({ ID: usableData.ID });
                yield databaseCustomers.insertOne(usableData);
                return "true";
            }
        }
        return "false";
    });
}
// edit Order --> delete old entry and replace with new
function editOrder(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseOrders.find().toArray();
        for (let x = 0; x < allData.length; x++) {
            if (usableData.id == allData[x].id) {
                yield databaseOrders.findOneAndDelete({ id: usableData.id });
                yield databaseOrders.insertOne(usableData);
                return "true";
            }
        }
        return "false";
    });
}
// create Product if no Id is duplicate
function createProduct(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = (yield databaseProducts.find().toArray());
        if (allData.length >= 1) {
            for (let x = 0; x < allData.length; x++) {
                if (allData[x].id == usableData.id) {
                    return "false";
                }
            }
        }
        yield databaseProducts.insertOne(usableData);
        return "true";
    });
}
// search for Product
function searchProduct(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundProduct = yield databaseProducts.find({ $or: [{ id: usableData }, { description: usableData }] }).toArray();
        return JSON.stringify(foundProduct);
    });
}
// create Customer if no Id is duplicate
function createCustomer(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = (yield databaseCustomers.find().toArray());
        if (allData.length >= 1) {
            for (let x = 0; x < allData.length; x++) {
                if (allData[x].id == usableData.id) {
                    return "false";
                }
            }
        }
        yield databaseCustomers.insertOne(usableData);
        return "true";
    });
}
// search for Customer
function searchCustomer(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundCustomer = yield databaseCustomers.find({ $or: [{ id: usableData }, { name: usableData }] }).toArray();
        return JSON.stringify(foundCustomer);
    });
}
// search for Order
function searchOrder(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundOrder = yield databaseOrders.find({ $or: [{ id: usableData }, { description: usableData }] }).toArray();
        return JSON.stringify(foundOrder);
    });
}
// return all Products
function retrieveAllProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseProducts.find({}).toArray();
        return JSON.stringify(allData);
    });
}
// return all Customers
function retrieveAllCustomer() {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseCustomers.find({}).toArray();
        return JSON.stringify(allData);
    });
}
// create Order if no Id is duplicate
function createOrder(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = (yield databaseOrders.find().toArray());
        if (allData.length >= 1) {
            for (let x = 0; x < allData.length; x++) {
                if (allData[x].id == usableData.id) {
                    return "false";
                }
            }
        }
        yield databaseOrders.insertOne(usableData);
        return "true";
    });
}
// check for duplicate Order Id
function checkForOrderId(usableData) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield databaseOrders.find({}).toArray();
        for (let x = 0; x < allData.length; x++) {
            if (allData[x].ID == usableData.searchTerm) {
                return "false";
            }
        }
        return "true";
    });
}
//# sourceMappingURL=server.js.map