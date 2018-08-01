import React, { Component } from 'react';
import ForecastItem from "./ForecastItem"

class Week extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        }
    }
    render(){
        return (
            <div className="col-12 d-flex justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="forecast-item d-flex justify-content-between">
                        {this.props.week.map((day,index) =>
                        <ForecastItem
                            extraData={{rain: day.precipProbability, windSpeed: day.windSpeed, pressure: day.pressure,temperatureMin:day.temperatureMin}}
                            key={index}
                            id={index}
                            day={this.state.days[new Date(day.dateTime).getDay()]}
                            temperature={day.temperatureMax}
                            icon={day.icon}
                        />
                        )}
                    </div>
                </div>
            </div>

        )
    }
}

export default Week;