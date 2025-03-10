const country_name = document.getElementById("country-name");
const btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  const country = country_name.value;
  getCountryArr(country);
});

updateContent = (countryArray) => {
  const countryInfoC = document.getElementById("country-info");
  countryInfoC.innerHTML = "";
  if (countryArray.error) {
    countryInfoC.innerHTML = `<p>${countryArray.error}</p>`;
    return;
  }
  //checking if neighbors is empty
  neighbourHTML = "";
  if (countryArray.neighbours == undefined) {
    countryArray.neighbours = "None";
  } else {
    countryArray.neighbours = countryArray.neighbours.join(", ");
    for (let i = 0; i < countryArray.neighbours.length; i++) {
      neighbourHTML += `<p>${countryArray.neighbours[i]}</p>`;
    }
  }
  const CountryInfoHTML = `
        <img src="${countryArray.flag}" alt="${countryArray.name}'s Flag" />
        <h2>${countryArray.name}</h2>
        <p><strong>Capital:</strong> ${countryArray.capital}</p>
        <p><strong>Population:</strong> ${countryArray.population}</p>
        <p><strong>Region:</strong> ${countryArray.region}</p>
        <p><strong>Neighbours:</strong> ${countryArray.neighbours}</p>
        ${neighbourHTML}
    `;

  countryInfoC.innerHTML = CountryInfoHTML;
};

async function getCountryImage(country_name) {
  await fetch(`https://restcountries.com/v3.1/name/${country_name}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Country not found or misspelled");
      }
      return response.json();
    })
    .then((data) => {
      const countryInfo = data[0];
      const countryFlag = countryInfo.flags.png;
      console.log(countryInfo.name);
      return countryFlag;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getCountryArr() {
  const countryN = country_name.value;
  await fetch(`https://restcountries.com/v3.1/name/${countryN}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Country not found or misspelled");
      }
      return response.json();
    })
    .then((data) => {
      const countryStuff = data[0];
      const countryArray = {
        name: countryStuff.name.common,
        capital: countryStuff.capital,
        population: countryStuff.population,
        region: countryStuff.region,
        flag: countryStuff.flags.png,
        neighbours: countryStuff.borders,
        colors: countryStuff.colors,
      };
      console.log(countryStuff.name);
      updateContent(countryArray);
    })
    .catch((error) => {
      console.log(error);
    });
}
