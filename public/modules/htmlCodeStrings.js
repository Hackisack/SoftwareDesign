// HTML Strings to change the Site are stored here --> Names of the Strings show there usage
export const loggedInPage = ` 

<h1 id="userName">Welcome</h1>
<!-- Add Username above -->

<h3>What do you want to do?</h3>

<nav id ="navigation">

    <button class="buttonStyle" id="addUser">Add new User (Admin)</button>

    <button class="buttonStyle" id="changeAdmin">Change Admin Privileges (Admin)</button>

    <button class="buttonStyle" id="addProduct">Add new Product (Admin)</button>

    <button class="buttonStyle" id="searchProduct">Search for Product</button>

    <button class="buttonStyle" id="searchCustomer">Search for Customer</button>

    <button class="buttonStyle" id="searchOrder">Search for Order</button>

    <button class="buttonStyle" id="addCustomer">Add new Customer</button>

    <button class="buttonStyle" id="createOrder">Create new Order</button>

</nav>

<br>

<div id="changeSite"></div>
`;
export const addUserPage = `

<h1>Enter the Username and Password for the new User</h1>

<form id="form" onsubmit="return false">

    <label for="Username">Username:</label><br>
    <input type="text" name="username" required /><br/><br>

    <label for="Password">Password:</label><br>
    <input autocomplete="on" type="password" name="password" required /><br/><br>

    <label for="Admin">Admin ("true" or "false"):</label><br>
    <input type="text" name="admin" required /><br/><br>

    <button id="submit">Create</button>
    <br/><br>
    <div id="response"></div>
</form>
`;
export const tableHeaderUser = `
<br>
<br>
<table id="table">

<tr>
<th>Username</th>
<th>Privileges</th>
<th>Change</th>
</tr>

</table>
`;
export const tableBodyUser = `

<tr>
<td class="username"></td>
<td class="privileges"></td>
<td> <button class="changeButton"> Change Admin Privileges </button> </td>
</tr>
`;
export const editButton = `

<button class="editButton"> Edit above </button> 
`;
export const createProduct = `

<form id="form" onsubmit="return false">

    <label for="ID">ID:</label><br>
    <input type="text" name="id" required /><br/><br>

    <label for="Description">Description:</label><br>
    <input type="text" name="description" required /><br/><br>
    
    <label for="MEDate">MEDate: </label><br>
    <input type="date" name="meDate" required /><br/><br>

    <label for="Price">Price:</label><br>
    <input type="number" name="price" required /><br/><br>

    <label for="StandardDeliveryTime">StandardDeliveryTime:</label><br>
    <input type="number" name="standardDeliveryTime" required /><br/><br>

    <label for="MinBG">MinBG:</label><br>
    <input type="number" name="minBG" required /><br/><br>

    <label for="MaxBG">MaxBG:</label><br>
    <input type="number" name="maxBG" required /><br/><br>

    <label for="DiscountBG">DiscountBG:</label><br>
    <input type="number" name="discountBG" required /><br/><br>

    <label for="Discount">Discount:</label><br>
    <input type="number" name="discount" required /><br/><br>

    <button id="submit">Create</button>

    <br/><br>

    <div id="response"></div>

</form>
`;
export const changeProduct = `

<form id="form" onsubmit="return false">

    <label for="Description">Description:</label><br>
    <input type="text" name="description" required /><br/><br>
    
    <label for="MEDate">MEDate: </label><br>
    <input type="date" name="meDate" required /><br/><br>

    <label for="Price">Price:</label><br>
    <input type="number" name="price" required /><br/><br>

    <label for="StandardDeliveryTime">StandardDeliveryTime:</label><br>
    <input type="number" name="standardDeliveryTime" required /><br/><br>

    <label for="MinBG">MinBG:</label><br>
    <input type="number" name="minBG" required /><br/><br>

    <label for="MaxBG">MaxBG:</label><br>
    <input type="number" name="maxBG" required /><br/><br>

    <label for="DiscountBG">DiscountBG:</label><br>
    <input type="number" name="discountBG" required /><br/><br>

    <label for="Discount">Discount:</label><br>
    <input type="number" name="discount" required /><br/><br>

    <button id="submit">Change</button>

    <br/><br>

    <div id="response"></div>

</form>
`;
export const searchProductForm = `

<form id="form" onsubmit="return false">

    <label for="SearchTerm">Search Term:</label><br>
    <input type="text" name="searchTerm" required /><br/><br>

    <button id="submit">Search</button>

    <br/><br>

    <div id="response"></div>

</form>
`;
export const tableHeaderProduct = `
<br>
<br>
<table id="table">

<tr>
<th>ID</th>
<th>Description</th>
<th>ME Date</th>
<th>Price</th>
<th>Standard Delivery Time</th>
<th>Min BG</th>
<th>Max BG</th>
<th>Discount BG</th>
<th>Discount</th>
</tr>

</table>
`;
export const tableBodyProduct = `

<tr>
<td class="id"></td>
<td class="description"></td>
<td class="medate"></td>
<td class="price"></td>
<td class="standarddeliverytime"></td>
<td class="minbg"></td>
<td class="maxbg"></td>
<td class="discountbg"></td>
<td class="discount"></td>
</tr>
`;
export const createCustomer = `

<form id="form" onsubmit="return false">

    <label for="ID">ID:</label><br>
    <input type="text" name="id" required /><br/><br>

    <label for="Name">Name:</label><br>
    <input type="text" name="name" required /><br/><br>
    
    <label for="Adress">Adress:</label><br>
    <input type="text" name="adress" required /><br/><br>

    <label for="Discount">Discount:</label><br>
    <input type="number" name="discount" required /><br/><br>

    <button id="submit">Create</button>

    <br/><br>

    <div id="response"></div>

</form>
`;
export const changeCustomer = `

<form id="form" onsubmit="return false">

    <label for="Name">Name:</label><br>
    <input type="text" name="name" required /><br/><br>
    
    <label for="Adress">Adress:</label><br>
    <input type="text" name="adress" required /><br/><br>

    <label for="Discount">Discount:</label><br>
    <input type="number" name="discount" required /><br/><br>

    <button id="submit">Change</button>

    <br/><br>

    <div id="response"></div>

</form>
`;
export const searchCustomerForm = `

<form id="form" onsubmit="return false">

    <label for="SearchTerm">Search Term:</label><br>
    <input type="text" name="searchTerm" required /><br/><br>

    <button id="submit">Search</button>

    <br/><br>

    <div id="response"></div>

</form>
`;
export const tableHeaderCustomer = `
<br>
<br>
<table id="table">

<tr>
<th>ID</th>
<th>Name</th>
<th>Adress</th>
<th>Discount</th>
</tr>

</table>
`;
export const tableBodyCustomer = `

<tr>
<td class="id"></td>
<td class="description"></td>
<td class="adress"></td>
<td class="discount"></td>
</tr>
`;
export const searchOrderForm = `

<form id="form" onsubmit="return false">

    <label for="SearchTerm">Search Term:</label><br>
    <input type="text" name="searchTerm" required /><br/><br>

    <button id="submit">Search</button>

    <br/><br>

    <div id="response"></div>

</form>
`;
export const tableHeaderOrder = `
<br>
<br>
<table id="table">

<tr>
<th>ID</th>
<th>Description</th>
<th>Customer</th>
<th>OrderDate</th>
<th>DeliveryDate</th>
<th>Price</th>
<th>OrderPositions</th>
</tr>

</table>
`;
export const tableBodyOrder = `

<tr>
<td class="id"></td>
<td class="description"></td>
<td class="customer"></td>
<td class="orderdate"></td>
<td class="deliverydate"></td>
<td class="price"></td>
<td class="orderpositions"></td>
</tr>
`;
export const createOrderForm = `

<form id="form" onsubmit="return false">

    <label for="ID">ID:</label><br>
    <input type="text" name="id" required /><br/><br>

    <label for="Description">Description:</label><br>
    <input type="text" name="description" required /><br/><br>

</form>

<label for="Customer">Customer:</label><br>
    <select id="customer" name="customer" required>    
    </select>

    <br>
    <br>

    <button id="submit">Add products to Order</button>

    <br>

    <div id="response"></div>

`;
export const tableHeaderCreateOrder = `
<br>
<br>
<button id="submit">Next Step</button>
<br>
<p id="response"></p>
<br>
<table id="table">
<tr>
<th>ID</th>
<th>Description</th>
<th>ME Date</th>
<th>Price</th>
<th>Standard Delivery Time</th>
<th>Min BG</th>
<th>Max BG</th>
<th>Discount BG</th>
<th>Discount</th>
<th>Amount</th>
<th>Add to Order</th>
</tr>

</table>
`;
export const tableBodyCreateOrder = `

<tr>
<td class="id"></td>
<td class="description"></td>
<td class="medate"></td>
<td class="price"></td>
<td class="standarddeliverytime"></td>
<td class="minbg"></td>
<td class="maxbg"></td>
<td class="discountbg"></td>
<td class="discount"></td>

<td class="form">
<form class="amount" onsubmit="return false">
<label for="Amount">Amount:</label><br>
<input type="text" class="amountField" name="amount" required /><br/><br>
</form>
<p class="response"></p>
</td>

<td> <button class="addButton"> Add Amount to Order </button> </td>
</tr>
`;
export const HeaderConfirmOrder = `
<br>
<br>
<h1>Your Order:</h1>
    <br>
    <h2>Overview:</h2>
    <h2 id="orderId"></h2>
    <h2 id="orderCustomer"></h2>
    <h3 id="description"></h3>
    <h3 id="deliveryDate"></h3>
    <h3 id="price"></h3>

    <h2>Order Positions:</h2>

    <div id="orderPositions">

    </div>

    <br>

    <button id="confirm"> Create Order </button>

`;
export const HeaderChangeOrder = `
<br>
<br>
<h1>Your Order:</h1>
    <br>
    <h2>Overview:</h2>
    <h2 id="orderId"></h2>
    <h2 id="orderCustomer"></h2>
    <h3 id="description"></h3>
    <h3 id="deliveryDate"></h3>
    <h3 id="price"></h3>

    <h2>Order Positions:</h2>

    <div id="orderPositions">

    </div>

    <br>

    <button id="confirm"> Change Order </button>

`;
export const BodyConfirmOrder = `

    <p id="productDescription">Product Description: </p>
    <p id="productAmount">Amount: </p>

`;
export const changeOrderForm = `

<form id="form" onsubmit="return false">

    <label for="Description">Description:</label><br>
    <input type="text" name="description" required /><br/><br>

</form>

<label for="Customer">Customer:</label><br>
    <select id="customer" name="customer" required>    
    </select>

    <br>
    <br>

    <button id="submit">Add products to Order</button>

    <br>

    <div id="response"></div>

`;
export const statisticButton = `

<button class="statisticButton"> Statistic for above </button> 
`;
export const statisticProduct = `

<p> This product has been ordered x times. Orders have already been placed x times with this item. The total turnover is x €.</p>
`;
//# sourceMappingURL=htmlCodeStrings.js.map