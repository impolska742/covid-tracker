import "./App.css";
import { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import { Card } from "@material-ui/core";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

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

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log("YOOOOOOOOOOOO >>>>>>>>>>", countryCode);

    // https://disease.sh/v3/covid-19/all
    // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        // All of the data from the country response
        setCountryInfo(data);
      });
  };

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
      <div className="app__left">
        <div className="app__header">
          {/* Header */}
          {/* Title + Drop-down menu */}
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
          <InfoBox title="Recovered" cases={1234} total={3000} />
          <InfoBox title="Deaths" cases={12345} total={4000} />
        </div>
        <Map />
      </div>
      <Card className="app__right">
        {/* Table - Country Cases */}
        {/* Graph */}
        <CardContent>
          <h3>Live cases by country</h3>
          <h3>World wide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
