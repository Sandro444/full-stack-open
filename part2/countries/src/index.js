import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import _ from "underscore";

const API = "7bb66a058129831717e9ec9d89396046";

const App = () => {
    const [countryValue, setCountryValue] = useState("");
    const [countryList, setCountryList] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [currentCapital, setCurrentCapital] = useState("");
    const handleCountryValue = (e) => {
        setCountryValue(e.target.value);
    };

    const fetchWeather = (city) => {
        if (currentCapital != city) {
            axios
                .get(
                    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
                )
                .then((response) => {
                    setWeatherData(response.data);
                    setCurrentCapital(city);
                });
        }
    };

    const renderWeather = () => {
        return weatherData == null ? (
            "loading weather..."
        ) : (
            <>
              <h1>Temperature in {currentCapital} </h1>
                <p>
                    <b>temperature:</b> {weatherData.main.temp} Celsius
                </p>
                <p><b>description:</b> {weatherData.weather[0].description} </p>
                <p><b>wind:</b> speed - {weatherData.wind.speed} | deg - {weatherData.wind.deg} </p>
            </>
        );
    };

    const showCountry = (code) => {
        axios
            .get(`https://restcountries.eu/rest/v2/alpha/${code}`)
            .then((response) => {
                setCountryList([response.data]);
            })
            .then(() => fetchWeather(countryList[0].capital));
    };

    useEffect(() => {
        axios
            .get(`https://restcountries.eu/rest/v2/name/${countryValue}`)
            .then((response) => setCountryList(response.data))
            .catch((err) => {
                if (err.response.status == 404) {
                    setCountryList([]);
                }
            });
    }, [countryValue]);

    const renderCountries = () => {
        if (!_.isEqual(countryList, []) && countryValue !== "") {
            if (countryList.length <= 10 && countryList.length > 1) {
                return countryList.map((country) => {
                    return (
                        <>
                            <li key={country["alpha3Code"]}>
                                {country.name}{" "}
                                <button
                                    onClick={(e) => {
                                        showCountry(country["alpha3Code"]);
                                        fetchWeather(country.capital);
                                    }}
                                >
                                    show
                                </button>
                            </li>
                        </>
                    );
                });
            } else if (countryList.length === 1) {
                let country = countryList[0];
                fetchWeather(country.capital);
                return (
                    <>
                        <h1> {country.name} </h1>
                        <p> capital {country.capital} </p>
                        <p> population {country.population} </p>
                        <h2> Languages </h2>
                        {country.languages.map((lang) => (
                            <li key={lang.name}> {lang.name} </li>
                        ))}
                        <img height="200" width="200" src={country.flag}></img>
                        {renderWeather()}
                    </>
                );
            } else {
                return <p>Too many results. Enter more specific query</p>;
            }
        } else if (_.isEqual(countryList, []) && countryValue !== "") {
            return <p>no countries found</p>;
        } else {
            return <p>enter search query</p>;
        }
    };

    return (
        <>
            <p>
                find countries{" "}
                <input value={countryValue} onChange={handleCountryValue} />{" "}
            </p>
            {renderCountries()}
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
