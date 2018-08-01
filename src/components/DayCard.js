import React, { Component } from 'react';
import Skycons from 'react-skycons'
import WeatherIcons from 'react-weathericons';
import ReactTooltip from 'react-tooltip'

class Daycard extends Component {
    constructor(props) {
        super(props);
        // this.state = {forecastCity: props.forecastCity, weatherCity: props.weatherCity}
    }
    render(){
        return (
            <div className="col-12 d-flex justify-content-center">
                <div className="col-12 col-md-5 weather-main-card">
                    <div className="icon-container d-flex align-items-center" >
                        <div >
                            <Skycons  color='white' icon={this.props.weatherCity.icon.replace(/-/g,'_').toUpperCase()} autoplay={true} />
                        </div>
                        <div>
                            <h1>{this.props.weatherCity.temperature}°C</h1>
                            <p data-type="light"  data-tip='' data-for="summary">{this.props.weatherCity.summary}</p>
                        </div>
                        <div>
                            <div data-type="light"  data-tip='' data-for="maxTemp">
                            <WeatherIcons  name="direction-up" /><span >{this.props.forecastCity.daily.data[0].temperatureHigh}°C</span>
                            </div>
                            <div data-type="light"  data-tip='' data-for="minTemp">
                            <WeatherIcons  name="direction-down" /><span>{this.props.forecastCity.daily.data[0].temperatureLow}°C</span>
                            </div>

                        </div>

                    </div>
                    <div className="d-flex align-items-center justify-content-around">
                        <div className="d-flex align-items-center" data-type="light"  data-tip='' data-for="pressure">
                            <WeatherIcons  name="barometer" size="2x" />
                            <span >{this.props.weatherCity.pressure}atm</span>
                        </div>
                        <div  className="d-flex align-items-center" data-type="light" data-tip='' data-for="humidity">
                            <WeatherIcons  name="humidity" size="2x" />
                            <span>{this.props.weatherCity.humidity}</span>
                        </div>
                        <div className="d-flex align-items-center" data-type="light" data-tip='' data-for="raindrop">
                            <WeatherIcons  name="raindrop" size="2x" />
                            <span >{this.props.weatherCity.precipProbability}%</span>
                        </div>
                        <div className="d-flex align-items-center" data-type="light" data-tip='' data-for="wind">
                            <WeatherIcons  name="strong-wind" size="2x" />
                            <span>{this.props.weatherCity.windSpeed}Km/h</span>
                        </div>
                    </div>
                    <ReactTooltip  id="summary">{this.props.forecastCity.daily.summary}</ReactTooltip>
                    <ReactTooltip  id="maxTemp">Max. Temperature</ReactTooltip>
                    <ReactTooltip  id="minTemp">Min. Temperature</ReactTooltip>
                    <ReactTooltip  id="pressure">Pressure</ReactTooltip>
                    <ReactTooltip  id="humidity">Humidity</ReactTooltip>
                    <ReactTooltip  id="raindrop">Rain Probability</ReactTooltip>
                    <ReactTooltip  id="wind">Wind Speed</ReactTooltip>
                </div>

            </div>
        )
    }
}

export default Daycard;