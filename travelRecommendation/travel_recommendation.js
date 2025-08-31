let jsonData = {};

fetch("travel_recommendation_api.json")
  .then(response => response.json())
  .then(data => { jsonData = data; })
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
  event.preventDefault(); // prevent form refresh

  const query = searchInput.value.trim().toLowerCase();

  countryContainer.innerHTML = "";
  templesContainer.innerHTML = "";
  beachesContainer.innerHTML = "";

  let results = false;

  // Search in countries -> cities
  if (jsonData.countries) {
    jsonData.countries.forEach(country => {
      if (country.cities) {
        country.cities.forEach(city => {
          if (city.name.toLowerCase().includes(query)) {
            display(templesContainer, city.name, city.imageUrl, city.description);
            results = true;
          }
        });
      }
    });
  }

  // Search in temples
  if (jsonData.temples) {
    jsonData.temples.forEach(temple => {
      if (temple.name.toLowerCase().includes(query)) {
        display(templesContainer, temple.name, temple.imageUrl, temple.description);
        results = true;
      }
    });
  }

  // Search in beaches
  if (jsonData.beaches) {
    jsonData.beaches.forEach(beach => {
      if (beach.name.toLowerCase().includes(query)) {
        display(beachesContainer, beach.name, beach.imageUrl, beach.description);
        results = true;
      }
    });
  }

  if (!results) {
    templesContainer.innerHTML = "<p>No results found.</p>";
  }
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  countryContainer.innerHTML = "";
  templesContainer.innerHTML = "";
  beachesContainer.innerHTML = "";
});
