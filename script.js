penguin_token = "patyHBTGqfGq2LgkL.77f9fb7c5fcbe0ac1ac156d99badda7427da5969548106a83bbc12ecd82086ec";


// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("brews");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patyHBTGqfGq2LgkL.77f9fb7c5fcbe0ac1ac156d99badda7427da5969548106a83bbc12ecd82086ec`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/app0pXASqtAQq5o5K/Penguins`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
        console.log(data); // response is an object w/ .records array

        getResultElement.innerHTML = ""; // clear brews

        let newHtml = "";
        console.log(data.getAllRecords);
        for (let i = 0; i < data.records.length; i++) {
        let logo = data.records[i].fields["Logo"]; // here we are getting column values
        let name = data.records[i].fields["Name"]; //here we are using the Field ID to fecth the name property
        let neighborhood = data.records[i].fields["Neighborhood"];

        newHtml += `
        
         <div class="col-xl-4 cardImageText">
          <div class="card list move border-dark mb-5" style="width: 20rem;">
          <a href="breweries.html?id=${data.records[i].id}">${
          logo
            ? `<img class="card-img-top rounded" alt="${name}" src="${logo[0].url}">`
            : ``
        }
          </a>
          <p hidden class="card-key">${neighborhood}</p>
          </div>
          </div>
        </div>
    
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}