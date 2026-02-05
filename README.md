# Penguin Types Website
Small website about penguins using AirTable API to display Penguin information. 🐧

## Usage

This is a small sample webpage of what beginning programming students can do to learn HTML, CSS, and JavaScript as well as fetching APIs. 

## Fetching All Records

> [!NOTE]
> Any "console.log" instances can be deleted. 🚫  
> They were included to help with debugging. 🪲 👍  
> You may copy the following code for your project. 😄  

```javascript
// Get all records
async function getAllRecords() 
{
    // Replace "penguins" with you div class name
    let getResultElement = document.getElementById("view-all-records-div");
    // You can see yout Base ID in the URL address bar
    // Example: https://airtable.com/[table-ID]
    const BASE_ID = 'table-ID';
    // The name of your table
    const TABLE_NAME = 'table-name';
    // API token can be generated at: 
    // https://airtable.com/create/oauth
    // Your token needs access to data.records:read
    // and add your table name as the scope
    const API_TOKEN = 'your-API-token';
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
    // Try-catch block
    try {
        // Fetching occurs here 👇
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        // Will throw an error if fetch fails
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Create a new empty HTML string at index.html
        getResultElement.innerHTML = "";
        let newHTML = ""

        const data = await response.json();
        // Console log the data records
        // prints out array of records
        console.log(data.records);
        
        // Loop trough each 
        data.records.forEach(function(record) {
            // Create a variable to store the record ID
            let recordID = record.id;

            // Console log record ID 
            console.log(record.id)

            // The following code creates a card for each record
            // Information displayed will vary depending on your table contents.
            // Your HTML goes here 👇
            newHTML += `
            <div class="col">
                <div class="card shadow-sm">
                    <a href="index.html?id=${record.id}">
                        <p id="penguin-name">${recordID}</p>
                    </a>
                </div>
            </div>
        `
        });
        // Put the new HTML code to the index.html file
        getResultElement.innerHTML = newHTML;
        
    // Will throw an error if fetching data fails
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
```

## Fetching One Record
The function for fetching one record is the same as fetching all records.  
You only have to do some slight tweaks... 🔧  
First, we have to change the function name from ```getAllRecords()``` to ```getOneRecord()```  
Then, we have to include an ```id``` variable inside the ```getOneRecord()``` function.  
Next, we have to replace ```"view-all-records-div"``` inside the ```getElementByID();``` function.  
Like so 👇  
```javascript
let getResultElement = document.getElementById("view-all-records-div");
```
⬇️  
```javascript
let getResultElement = document.getElementById("view-one-record-div"); 
```
Next, is to add the ```id``` variable inside the ```url``` variable.  
```javascript
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`;

```
After that, style the ```newHTML``` string however you like your HTML to look like for your "View on record" page.  
## Get Window URL
To change between "view all records" and "get one record" pages, we have to check the web browser's URL link.  
To do this,  we need to include the following line of code at the end of the file:  
```javascript
let idParams = window.location.search.split("?id=");
```
This will store the current web browser URL as a string in the ```idParams``` variable.  

## If statemet
We will check if the current URL includes and ```id```.  
If it does, we will call on the ```getOneRecord(id)``` function.   
Otherwise,  we will call on the ```getAllRecords()``` function.
```javascript
if (idParams.length >= 2) {
  getOneRecord(idParams[1]);
} else {
  getAllRecords();
}
```