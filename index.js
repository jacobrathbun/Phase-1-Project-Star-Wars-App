const yodaBtn = document.getElementById('yodaBtn');
const yodaContainer = document.getElementById('yodaDataContainer');

yodaBtn.addEventListener("click", () => {
    fetch('https://swapi.dev/api/people/20/')
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error connecting to SWAPI...")
        }
        return response.json();
    })
    .then((data) => {
        yodaContainer.innerHTML = `
        <h2>Name: ${data.name}</h2>
                <p>Height: ${data.height} cm</p>
                <p>Mass: ${data.mass} kg</p>
                <p>Eye Color: ${data.eye_color}</p>
                <p>Hair Color: ${data.hair_color}</p>                
            `; 
    })
    .catch((error) => {
        console.error("Error fetching character data.", error);
    });
});

const searchForm = document.getElementById('searchForm');
const characterSearchContainer = document.getElementById('characterSearchContainer');

searchForm.addEventListener("submit", (form) => {
    form.preventDefault();

    const formData = searchForm.querySelector('input').value;

    fetch(`https://swapi.dev/api/people/?search=${formData}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error connection to SWAPI...")
        }
        return response.json();
    })
    .then((data) => {

        if (data.results && data.results.length > 0) {
            const resultsHTML = data.results.map((result) => {
                return `
                <h2>Name: ${result.name}</h2>
                <p>Height: ${result.height} cm</p>
                <p>Mass: ${result.mass} kg</p>
                <p>Eye Color: ${result.eye_color}</p>
                <p>Hair Color: ${result.hair_color}</p>
            `;
            }).join("");
            characterSearchContainer.innerHTML = resultsHTML;
        } else {
            characterSearchContainer.innerHTML = "No results found...";
        }
    })
    .catch((error) => {
        console.error("Error fetching search data...", error);
    });
});