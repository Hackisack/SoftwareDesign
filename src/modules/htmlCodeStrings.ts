export let loggedInPage: string = ` 

<h1 id="userName">Welcome</h1>
<!-- Add Username above -->

<h3>What do you want to do?</h3>

<nav id ="navigation">

    <button class="buttonStyle" id="addUser">Add new User (Admin)</button>
    <!-- Disable If not Admin -->

    <button class="buttonStyle" id="changeAdmin">Change Admin Privileges (Admin)</button>
    <!-- Disable If not Admin -->

    <button class="buttonStyle" id="addProduct">Add new Product (Admin)</button>
    <!-- Disable If not Admin -->

    <button class="buttonStyle" id="searchProduct">Search for Product</button>
    <!-- And change Product if needed -->

    <button class="buttonStyle" id="searchCustomer">Search for Customer</button>
    <!-- And change Customer if needed -->

    <button class="buttonStyle" id="addCustomer">Add new Customer</button>

    <button class="buttonStyle" id="searchOrder">Search for Order</button>
    <!-- And change Order if needed -->

    <button class="buttonStyle" id="createOrder">Create new Order</button>

</nav>

<div id="changeSite"></div>
`;


export let addUserPage: string = `

<h1>Enter the Username and Password for the new User</h1>

<form id="form" onsubmit="return false">

    <label for="Username">Username:</label><br>
    <input type="text" name="Username" required /><br/><br>

    <label for="Password">Password:</label><br>
    <input autocomplete="on" type="password" name="Password" required /><br/><br>

    <label for="Admin">Admin ("true" or "false"):</label><br>
    <input type="text" name="Admin" required /><br/><br>

    <button id="submit">Create</button>
    <br/><br>
    <div id="response"></div>
</form>
`;


export let tableHeaderUser: string = `
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


export let tableBodyUser: string = `

<tr>
<td class=\"username\"></td>
<td class=\"privileges\"></td>
<td> <button class=\"changeButton\"> Change Admin Privileges </button> </td>
</tr>
`;

export let createProduct: string = `

<form id="form" onsubmit="return false">

    <label for="ID">ID:</label><br>
    <input type="text" name="ID" required /><br/><br>

    <label for="Description">Description:</label><br>
    <input type="text" name="Description" required /><br/><br>
    
    <label for="MEDate">MEDate:</label><br>
    <input type="text" name="MEDate" required /><br/><br>

    <label for="Price">Price:</label><br>
    <input type="text" name="Price" required /><br/><br>

    <label for="StandardDeliveryTime">StandardDeliveryTime:</label><br>
    <input type="text" name="StandardDeliveryTime" required /><br/><br>

    <label for="MinBG">MinBG:</label><br>
    <input type="text" name="MinBG" required /><br/><br>

    <label for="MaxBG">MaxBG:</label><br>
    <input type="text" name="MaxBG" required /><br/><br>

    <label for="DiscountBG">DiscountBG:</label><br>
    <input type="text" name="DiscountBG" required /><br/><br>

    <label for="Discount">Discount:</label><br>
    <input type="text" name="Discount" required /><br/><br>

    <button id="submit">Create</button>

    <br/><br>

    <div id="response"></div>

</form>
`;

export let searchProductForm: string = `

<form id="form" onsubmit="return false">

    <label for="SearchTerm">Search Term:</label><br>
    <input type="text" name="SearchTerm" required /><br/><br>

    <button id="submit">Search</button>

    <br/><br>

    <div id="response"></div>

</form>
`;

export let tableHeaderProduct: string = `
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


export let tableBodyProduct: string = `

<tr>
<td class=\"id\"></td>
<td class=\"description\"></td>
<td class=\"medate\"></td>
<td class=\"price\"></td>
<td class=\"standarddeliverytime\"></td>
<td class=\"minbg\"></td>
<td class=\"maxbg\"></td>
<td class=\"discountbg\"></td>
<td class=\"discount\"></td>
</tr>
`;

export let createCustomer: string = `

<form id="form" onsubmit="return false">

    <label for="ID">ID:</label><br>
    <input type="text" name="ID" required /><br/><br>

    <label for="Name">Name:</label><br>
    <input type="text" name="Name" required /><br/><br>
    
    <label for="Adress">Adress:</label><br>
    <input type="text" name="Adress" required /><br/><br>

    <label for="Discount">Discount:</label><br>
    <input type="text" name="Discount" required /><br/><br>

    <button id="submit">Create</button>

    <br/><br>

    <div id="response"></div>

</form>
`;

export let searchCustomerForm: string = `

<form id="form" onsubmit="return false">

    <label for="SearchTerm">Search Term:</label><br>
    <input type="text" name="SearchTerm" required /><br/><br>

    <button id="submit">Search</button>

    <br/><br>

    <div id="response"></div>

</form>
`;

export let tableHeaderCustomer: string = `
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


export let tableBodyCustomer: string = `

<tr>
<td class=\"id\"></td>
<td class=\"name\"></td>
<td class=\"adress\"></td>
<td class=\"discount\"></td>
</tr>
`;

export let searchOrderForm: string = `

<form id="form" onsubmit="return false">

    <label for="SearchTerm">Search Term:</label><br>
    <input type="text" name="SearchTerm" required /><br/><br>

    <button id="submit">Search</button>

    <br/><br>

    <div id="response"></div>

</form>
`;

export let tableHeaderOrder: string = `
<br>
<br>
<table id="table">

<tr>
<th>ID</th>
<th>Description</th>
<th>OrderDate</th>
<th>DeliveryDate</th>
<th>Price</th>
<th>OrderPositions</th>
</tr>

</table>
`;


export let tableBodyOrder: string = `

<tr>
<td class=\"id\"></td>
<td class=\"description\"></td>
<td class=\"orderdate\"></td>
<td class=\"deliverydate\"></td>
<td class=\"price\"></td>
<td class=\"orderpositions\"></td>
</tr>
`;

export let createOrderForm: string = `

<form id="form" onsubmit="return false">

    <label for="ID">ID:</label><br>
    <input type="text" name="ID" required /><br/><br>

    <label for="Description">Description:</label><br>
    <input type="text" name="Description" required /><br/><br>

    <label for="OrderDate">Order Date:</label><br>
    <input type="text" name="OrderDate" required /><br/><br>

    <button id="submit">Add products to Order</button>

    <br/><br>

    <div id="response"></div>

</form>
`;

export let tableHeaderCreateOrder: string = `
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
<th>Amount</th>
<th>Add to Order</th>
</tr>

</table>
`;


export let tableBodyCreateOrder: string = `

<tr>
<td class=\"id\"></td>
<td class=\"description\"></td>
<td class=\"medate\"></td>
<td class=\"price\"></td>
<td class=\"standarddeliverytime\"></td>
<td class=\"minbg\"></td>
<td class=\"maxbg\"></td>
<td class=\"discountbg\"></td>
<td class=\"discount\"></td>

<td class=\"form\">
<form class=\"amount\" onsubmit="return false">
<label for="Amount">Amount:</label><br>
<input type="text" name="Amount" required /><br/><br>
</form>
</td>

<td> <button class=\"addButton\"> Add Amount to Order </button> </td>
</tr>
`;

