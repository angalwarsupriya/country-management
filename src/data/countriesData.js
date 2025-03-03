// fetchCountries.js
export const fetchCountries = async () => {
	try {
	  const response = await fetch('https://restcountries.com/v3.1/all');
	  const data = await response.json();
	  return data.map(country => ({
		countryName: country.name.common,
		flagURL: `https://flagcdn.com/48x36/${country.cca2.toLowerCase()}.png`
	  }));
	} catch (error) {
	  console.error('Error fetching country data:', error);
	  return [];
	}
  };
  