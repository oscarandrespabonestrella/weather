import React, { Component } from 'react';
import Skycons from 'react-skycons'
import WeatherIcons from 'react-weathericons';
import ReactTooltip from 'react-tooltip'

class ForecasItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon:{
                "partly-cloudy-night": "night-alt-cloudy",
                "partly-cloudy-day":"day-cloudy",
                "cloudy":"cloudy",
                "fog": "fog",
                "wind": "wind",
                "sleet": "sleet",
                "snow":"snow",
                "clear-night":"night-clear",
                "rain":"rain",
                "clear-day":"day-sunny"

            }
        }
    }
    render(){
        let Icon = this.state.icon[this.props.icon]
        let toltipID = "toolTip"+this.props.key
        return (
            <div data-type="light" data-tip='' data-for={toltipID} className="graph-knob">
                <span className="graph-temp">
                  <WeatherIcons name={Icon} />
                  {this.props.temperature}<sup>&deg;</sup><br/>
                  {this.props.day}
                </span>
                <ReactTooltip  id={toltipID}>
                    <p>Min. Temperature: {this.props.extraData.temperatureMin}</p>
                    <p>Precipitation: {this.props.extraData.precipIntensity}%</p>
                    <p>Wind: {this.props.extraData.windSpeed}Km/h</p>
                    <p>Pressure: {this.props.extraData.pressure}atm</p>
                </ReactTooltip>
            </div>
        )
    }
}

export default ForecasItem;