import React, { Component } from "react";
import Titles from "./components/Titles";
// import Form from "./components/Form";
import Weather from "./components/Weather";
import axios from "axios";

const API_KEY = "67297da4c387652c4857a1e54dae3f3f";

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    users: [],
    id: 0,
    date: undefined,
  };

  getWeather = async (e, id) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();
    if (city && country) {
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
      });
      axios.post("http://localhost/api", {
        date: new Date(Date.now()).toISOString(),
        //date: new Date(parseInt(id.toString().substring(0, 8), 16) * 1000),
        city: this.state.city,
        country: this.state.country,
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter value",
      });
    }
  };

  componentDidMount() {
    axios.get("http://localhost/api").then((res) => {
      this.setState({
        users: res.data,
        id: 0,
        city: "",
        country: "",
      });
      // console.log(data);
    });
  }

  cityChange = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  countryChange = (event) => {
    this.setState({
      country: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  {/* <Form
                    onChange={this.cityChange}
                    getWeather={this.getWeather}
                  /> */}
                  <form onSubmit={(e) => this.getWeather(e, this.state.id)}>
                    <input
                      onChange={(e) => this.cityChange(e)}
                      type="text"
                      name="city"
                      placeholder="City..."
                    ></input>
                    <input
                      onChange={(e) => this.countryChange(e)}
                      type="text"
                      name="country"
                      placeholder="Country..."
                    ></input>
                    <button>Get Weather</button>
                  </form>
                  <Weather
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
