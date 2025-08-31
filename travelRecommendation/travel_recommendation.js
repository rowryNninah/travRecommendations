let jsonData = {};

fetch("travel_recommendation_api.json")
  .then(response => response.json())
  .then(data => {
    jsonData = data;
  })
  .catch(error => console.error("Error fetching data:", error));

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById("clear-btn");

const countryContainer = document.getElementById("countries-container");
const templesContainer = document.getElementById("temples-container");
const beachesContainer = document.getElementById("beaches-container");

function display(container, title, image, description) {
  const card = document.createElement("div");
  card.className = "items-card";
  card.innerHTML = `
    <h3>${title}</h3>
    <img src="${image}" alt="${title}">
    <p>${description}</p>
  `;
  container.appendChild(card);
}

searchBtn.addEventListener("click", (event) => {
  event.preventDefault(); 


  const query = searchInput.value.trim().toLowerCase();


  let results = false;

  if (query === "beach" || query === "beaches") {
    if (jsonData.beaches) {
      jsonData.beaches.slice(0, 2).forEach(beach => {
        display(beachesContainer, beach.name, beach.imageUrl, beach.description);
      });
      results = true;
    }
  } else if (query === "temple" || query === "temples") {
    if (jsonData.temples) {
      jsonData.temples.slice(0, 2).forEach(temple => {
        display(templesContainer, temple.name, temple.imageUrl, temple.description);
      });
      results = true;
    }
  } else if (query === "country" || (jsonData.countries && jsonData.countries.some(c => c.name.toLowerCase().includes(query)))) {
    if (jsonData.countries) {
      let found = false;
      jsonData.countries.forEach(country => {
        if (country.name.toLowerCase().includes(query) || query === "country") {
          country.cities.slice(0, 2).forEach(city => {
            display(countryContainer, city.name, city.imageUrl, city.description);
          });
          found = true;
        }
      });
      results = found;
    }
  }
})

clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    countryContainer.innerHTML = "";
    templesContainer.innerHTML = "";
    beachesContainer.innerHTML = "";
  });
