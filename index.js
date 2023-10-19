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
        console.error("Error fetching data.", error);
    });
});