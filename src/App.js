import "./App.css";
import { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);
  const url = "https://disease.sh/v3/covid-19/countries";

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     const countries = data.map((country) => ({
  //       name: country.country,
  //       value: country.countryInfo.iso3,
  //     }));
  //     setCountries(countries);
  //   };
  //   getData();
  // }, [url]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {/* Loop Through all the countries and  show a drop down list of the options*/}
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + Drop-down menu */}

      {/* Info Box - 1 */}
      {/* Info Box - 2 */}
      {/* Info Box - 3 */}

      {/* Table - Country Cases */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
