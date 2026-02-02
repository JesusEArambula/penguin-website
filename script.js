

async function getAllRecords() {
    let getResultElement = document.getElementById("penguins");
    const BASE_ID = 'app0pXASqtAQq5o5K';
    const TABLE_NAME = 'Penguins'; // URL encoded if it has special characters
    const API_TOKEN = 'patJZHYgn7HJuxd6J.73ee284f043f5f9dfa5fd0316e89526b37a8f296955d9beb3260655935ee49ac';

    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Play here ---------------------------------------------------------
        getResultElement.innerHTML = "";

        let newHTML = ""

        const data = await response.json();
        console.log(data.records); // An array of record objects
        console.log(data.records.fields)
        
        data.records.forEach(function(record) {
            let penguinName = record.fields['Name'];
            let penguinImage = record.fields['Image'][0].url;
            console.log(record.id)
            console.log(penguinName);
            console.log(penguinImage);

            newHTML += `
            <div class="col-xl-4 cardImageText">
                <div class="card text-center list move border-dark mb-5 h-100" style="width: 20rem;">
                    <a href="index.html?id=${record.id}">
                        <p id="penguin-name">${penguinName}</p>
                        <img class="card-img-top rounded single" alt="${penguinName} Penguin" src="${penguinImage}">
                    </a>
                    <p hidden class="card-key">${penguinName}</p>
                </div>
            </div>
        `
        });

        getResultElement.innerHTML = newHTML;
        // Stop playing here ---------------------------------------------------------

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getOneRecord(id) {
    let getResultElement = document.getElementById("penguins");
    const BASE_ID = 'app0pXASqtAQq5o5K';
    const TABLE_NAME = 'Penguins'; // URL encoded if it has special characters
    const API_TOKEN = 'patJZHYgn7HJuxd6J.73ee284f043f5f9dfa5fd0316e89526b37a8f296955d9beb3260655935ee49ac';

    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Play here ---------------------------------------------------------
        getResultElement.innerHTML = "";
        let newHTML = ""

        const data = await response.json();
        console.log(data); // Get single id fields data
        console.log(data.fields);    
        
        let penguinName = data.fields['Name'];
        let penguinScience = data.fields['Scientific Name'];
        let penguinDescription = data.fields['Short Description'];
        let penguinHeight = data.fields['Height'];
        let penguinWeight = data.fields['Weight'];
        let penguinImage = data.fields['Image'][0].url;

        newHTML = `
            <div class="card text-center">
                <div class="card-header">
                    ${penguinScience}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${penguinName}</h5>
                    <img class="card-img-top rounded img-fluid" alt="${penguinName} Penguin" src="${penguinImage}" style="height: 50%; width: 50%; object-fit: scale-down;">
                    <hr>
                    <p class="card-text">${penguinDescription}</p>
                </div>
                <div class="card-footer text-muted">
                    Height: ${penguinHeight}, Weight: ${penguinWeight}
                </div>
            </div>
        `

        getResultElement.innerHTML = newHTML;
        // Stop playing here ---------------------------------------------------------

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// getAllRecords();

let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  getAllRecords(); // no id given, fetch summaries
}