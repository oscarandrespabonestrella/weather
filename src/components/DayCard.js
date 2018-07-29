import React, { Component } from 'react';
import Skycons from 'react-skycons'
import WeatherIcons from 'react-weathericons';

class Daycard extends Component {
    constructor(props) {
        super(props);
        this.state = {forecastCity: props.forecastCity, weatherCity: props.weatherCity}
    }
    render(){
        return (
            <div className="weather-main-card">
                <div className="iconContainer d-flex align-items-center" >
                    <div >
                        <Skycons  color='white' icon={this.state.weatherCity.icon.replace(/-/g,'_').toUpperCase()} autoplay={true} />
                    </div>
                    <div>
                        <h1>{this.state.weatherCity.temperature}°C</h1>
                        <p>{this.state.weatherCity.summary}</p>
                    </div>
                    <div>
                        <div>
                        <WeatherIcons  name="direction-up" /><span>{this.state.forecastCity.daily.data[0].temperatureHigh}°C</span>
                        </div>
                        <div>
                        <WeatherIcons  name="direction-down" /><span>{this.state.forecastCity.daily.data[0].temperatureLow}°C</span>
                        </div>

                    </div>

                </div>
                <div className="d-flex align-items-center justify-content-around">
                    <WeatherIcons  name="barometer" size="2x" />
                    <span>{this.state.weatherCity.pressure}atm</span>
                    <WeatherIcons  name="humidity" size="2x" />
                    <span>{this.state.weatherCity.humidity}</span>
                    <WeatherIcons  name="raindrop" size="2x" />
                    <span>{this.state.weatherCity.precipProbability}%</span>
                    <WeatherIcons  name="strong-wind" size="2x" />
                    <span>{this.state.weatherCity.windSpeed}Km/h</span>
                </div>
            </div>
        )
    }
}

export default Daycard;