import React from "react"
import Location from "./location.png"
//import Snow from "./snow.png"
//import Abc from "./Abc"

class Main extends React.Component{
    constructor(){
        super()
        this.state={
            temp: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: undefined
            //temps: {},
            //descrip: "",
            //weathers: [],
           // city: "",
           // day: "Toronto",
            //show: false
        }
        //this.handleChange = this.handleChange.bind(this)
        //this.handleClick = this.handleClick.bind(this)
    }

    /*componentDidMount(){
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.day}&appid=195802116ab7194a8e4db94e45215cea`)
            .then(response => response.json())
            .then(response => {
                const {weather, main} = response
                this.setState({
                    temps: main,
                    weathers: weather
                })
            })
    }*/

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=195802116ab7194a8e4db94e45215cea`);
        const data = await api_call.json();
        if(city){
            this.setState({
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ""
            });
        }
        else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter values"
            });
        }
    }

    getTempC(temp){
        const celcius = Math.floor(temp - 273.15);
        return celcius;
    }
/*
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleClick(e) {
        e.preventDefault()
        const rand = this.state.weathers[0].description
        this.setState({ 
            day: this.state.city,
            descrip: rand,
            show: !this.state.show
         })
    }
*/



    render(){

        const dateBuilder = (d) => {
            let months = ["January","February","March","April","May","June","July","August",
            "September","October","November","December"]
            let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

            let day = days[d.getDay()]
            let date = d.getDate()
            let month = months[d.getMonth()]
            let year = d.getFullYear()

            return `${day} ${", "} ${month} ${date} ${", "} ${year}`
        }

        const locationIcon = <img className="icon" src={Location} alt="icon" />

        //let celcius = (this.state.temps.temp - 273.15).toFixed(2)

        //const snowing = this.state.descrip === "overcast clouds"? <img className="icon" src={Snow} alt="snow"/> : this.state.descrip

        return(
            <div>
                <header>Weather Forecast</header>
                <div className="dayCard">
                    <form onSubmit={this.getWeather}>
                        <input type="text"
                            name="city"
                            className="search"
                            placeholder="Enter city name"
                            autocomplete="off"
                            //value={this.state.city}
                            //onChange={this.handleChange}
                            
                        />
                        {/*<button onClick={this.handleClick}>Get Weather</button>*/}
                        {/*<button className="get">Find Weather</button>*/}
                    </form>
                    <div className="location-box">
                        <div className="location">{this.state.city? locationIcon : ""} {this.state.city? this.state.city + ", " : ""} {this.state.country}</div>
                        <div className="date">{this.state.city? dateBuilder(new Date()) : ""}</div>
                        <div className="temp">{this.state.error? this.state.error : ""}</div>
                    </div>
                <div className="weather-box">
                        <div className="temp">{this.state.temp? this.getTempC(this.state.temp) + "°": ""}</div>
                        <div className="description">{this.state.description ? this.state.description : ""}</div>
                        <div className="humidity">{this.state.humidity? "Humidity: " + this.state.humidity +"%" : ""}</div>
                </div>
                    {/*
                    <div className="weather-box">
                        <div className="temp">{this.state.show ? celcius+"°C" : "Click button"}</div>
                        <div className="description">{this.state.show ? snowing : ""}</div>
                        <div>{this.state.day}</div>
                        <div>{this.state.city}</div>
                        <div className="weather"><Abc value={this.state.weathers}/></div>
                    </div>
                    */}
                    {//<img className="icon" src={Sun} alt="sun"></img>
    }
                </div>
            </div>
        )
    }
}

export default Main