# penguin-website

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
    let getResultElement = document.getElementById("div-class-name");
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
        

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
```