import React, { useState } from "react";

const Main = () => {

    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState([]);

    const API_KEY = "195802116ab7194a8e4db94e45215cea";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`;

    const getWeather = async () => {
        if(query !== ""){
            const api_call = await fetch(url);
            const data = await api_call.json();
            setWeather(data);
            setQuery("");
            console.log(data);
        }
    }

    const onChange = e =>{
        setQuery(e.target.value);
    }

    const onSubmit = e =>{
        e.preventDefault();
        getWeather();
    }

    const getTempC = temp =>{
       const celcius = Math.floor(temp - 273.15);
       return celcius;
    }

    const firstUpper = string =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const displayLocation = () => {  
        return(
            <div className="location">
                {weather.name && <img className="icon" src="/images/location.png" alt="icon" />}{weather.name && weather.name + ", " + weather.sys.country}
            </div>
        ) 
    }

    const dateBuilder = (e) => {
        let months = ["January","February","March","April","May","June","July","August",
        "September","October","November","December"]
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        let day = days[e.getDay()];
        let date = e.getDate();
        let month = months[e.getMonth()];
        let year = e.getFullYear();

        return `${day} ${", "} ${month} ${date} ${", "} ${year}`;
    }

    return(
        <div className="app">
            <header>Weather App</header>
            <form onSubmit={onSubmit}>
                    <input 
                        type="text"
                        className="search"
                        placeholder="Enter city name"
                        autoComplete="off"
                        onChange={onChange}
                        value={query}
                    />
            </form>
            <div className="dayCard">
                <div className="location-box">
                    {displayLocation()}
                    <div className="date">{weather.name && dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                    <div className="temp">{weather.name && getTempC(weather.main.temp) + "°"}</div>
                    <div className="description">{weather.name && firstUpper(weather.weather[0].description)}</div>
                    <div className="humidity">{weather.name && "Humidity: " + weather.main.humidity +"%"}</div>
                </div>
            </div>
        </div>
    )
}

export default Main;