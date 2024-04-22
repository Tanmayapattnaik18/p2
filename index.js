const apiUrl = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries';
const countriesContainer = document.getElementById('countriesContainer');
const sortButton = document.getElementById('sortButton');

async function fetchCountries() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        const countries = responseData.data; 
        return countries;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return []; 
    }
}


function displayCountries(countries) {
    countriesContainer.innerHTML = '';
    if (!Array.isArray(countries)) {
        console.error('Invalid data format:', countries);
        return;
    }
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
            <h2>${country.name}</h2>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Subregion:</strong> ${country.subregion}</p>
        `;
        countriesContainer.appendChild(countryCard);
    });
}


function sortCountriesByPopulation(countries) {
    return countries.slice().sort((a, b) => b.population - a.population); // Use slice to create a new array before sorting
}


sortButton.addEventListener('click', async () => {
    const countries = await fetchCountries();
    const sortedCountries = sortCountriesByPopulation(countries);
    displayCountries(sortedCountries);
});


window.onload = async () => {
    const countries = await fetchCountries();
    displayCountries(countries);
};
