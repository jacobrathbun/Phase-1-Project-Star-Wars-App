const yodaBtn = document.getElementById('yodaBtn');
const bobaBtn = document.getElementById('bobaBtn');
const vaderBtn = document.getElementById('vaderBtn');
const jabbaBtn = document.getElementById('jabbaBtn');
const r2Btn = document.getElementById('r2Btn');
const yodaContainer = document.getElementById('yodaDataContainer');
const bobaContainer = document.getElementById('bobaDataContainer');
const vaderContainer = document.getElementById('vaderDataContainer');
const jabbaContainer = document.getElementById('jabbaDataContainer');
const r2Container = document.getElementById('r2DataContainer');
const yoda = 20;
const boba = 22;
const vader = 4;
const jabba = 16;
const r2 = 3;

yodaBtn.addEventListener("click", () => {
   buttonFetch(yoda, yodaContainer);
});

bobaBtn.addEventListener("click", () => {
    buttonFetch(boba, bobaContainer);
});

vaderBtn.addEventListener("click", () => {
    buttonFetch(vader, vaderContainer);
});

jabbaBtn.addEventListener("click", () => {
    buttonFetch(jabba, jabbaContainer);
});

r2Btn.addEventListener("click", () => {
    buttonFetch(r2, r2Container);
});

function buttonFetch(character, container) {
    container.innerHTML = "Fetching data..."

    fetch(`https://swapi.dev/api/people/${character}/`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error connecting to SWAPI...");
        }
        return response.json();
    })
    .then((data) => {
        
        fetch(data.homeworld)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error connecting to SWAPI for homeworld data");
                }
                return response.json();
            })
            .then((homeworldData) => {
                
                if (!data.species || data.species.length === 0) {
                    container.innerHTML = `
                        <h2>Name: ${data.name}</h2>
                        <p>Height: ${data.height} cm</p>
                        <p>Mass: ${data.mass} kg</p>
                        <p>Eye Color: ${data.eye_color}</p>
                        <p>Hair Color: ${data.hair_color}</p>
                        <p>Homeworld: ${homeworldData.name}</p>
                        <p>Species: Human</p>
                        `;
                } else {
                    fetch(data.species[0])
                        .then((speciesResponse) => {
                            if (!speciesResponse.ok) {
                                throw new Error("Error connecting to SWAPI for species data");
                            }
                            return speciesResponse.json();
                        })
                        .then((speciesData) => {
                            
                            container.innerHTML = `
                                <h2>Name: ${data.name}</h2>
                                <p>Height: ${data.height} cm</p>
                                <p>Mass: ${data.mass} kg</p>
                                <p>Eye Color: ${data.eye_color}</p>
                                <p>Hair Color: ${data.hair_color}</p>
                                <p>Homeworld: ${homeworldData.name}</p>
                                <p>Species: ${speciesData.name}</p>
                            `;
                        })
                        .catch((error) => {
                            console.error("Error fetching species data.", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error fetching homeworld data.", error);
            });
        })
    .catch((error) => {
        console.error("Error fetching character data.", error);
    }); 
}

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const characterSearchContainer = document.getElementById('characterSearchContainer');

searchForm.addEventListener("submit", (form) => {
    form.preventDefault();

    characterSearchContainer.innerHTML = "Fetching data..."    

    const formData = searchInput.value;

    fetch(`https://swapi.dev/api/people/?search=${formData}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error connecting to SWAPI");
        }
        return response.json();
    })
    .then((data) => {
        if (data.results && data.results.length > 0) {
            characterSearchContainer.innerHTML = ""; 

            data.results.forEach((result) => {                
                const characterContainer = document.createElement('div');
                characterContainer.className = 'character-container';
                
                const characterLink = document.createElement('a');
                characterLink.href = "#";
                characterLink.className = 'character-link';
                characterLink.setAttribute('data-url', result.url);
                characterLink.textContent = result.name;
                
                const characterDataContainer = document.createElement('div');
                characterDataContainer.className = 'character-data-container';
                
                characterContainer.appendChild(characterLink);
                characterContainer.appendChild(characterDataContainer);
                
                characterSearchContainer.appendChild(characterContainer);
                
                characterLink.addEventListener("click", (clickEvent) => {
                    clickEvent.preventDefault();
                    clickEvent.target.nextElementSibling.innerHTML = "Fetching Data..."

                    if(characterDataContainer.style.display === 'block') {
                        characterDataContainer.style.display = 'none';
                    } else {
                        characterDataContainer.style.display = 'block';                    
                    
                        const characterUrl = characterLink.getAttribute('data-url');
                        fetch(characterUrl)
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error("Error connecting to SWAPI");
                                }
                                return response.json();
                            })
                            .then((characterData) => {                            
                                characterDataContainer.innerHTML = `
                                    <h2>Name: ${characterData.name}</h2>
                                    <p>Height: ${characterData.height} cm</p>
                                    <p>Mass: ${characterData.mass} kg</p>
                                    <p>Eye Color: ${characterData.eye_color}</p>
                                    <p>Hair Color: ${characterData.hair_color}</p>
                                `;
                            })
                            .catch((error) => {
                                console.error("Error fetching character data...", error);
                            });
                    }
                });
            });
        } else {
            characterSearchContainer.innerHTML = "No results found...";
        }
    })
    .catch((error) => {
        console.error("Error fetching search data...", error);
    });
});