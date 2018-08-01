import React, { Component } from 'react';
import ForecastItem from "./ForecastItem"

class LastMonthItem extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="col-12">
            <div className="forecast-item lastMonth d-flex justify-content-between">
            {this.props.lastMonthForecast.map((day,index) =>
                <ForecastItem
                    extraData={{rain: day.daily.data[0].precipProbability, windSpeed: day.daily.data[0].windSpeed, pressure: day.daily.data[0].pressure,temperatureMin:day.daily.data[0].temperature}}
                    key={index}
                    id={index}
                    day={new Date(day.daily.data[0].dateTime).toLocaleDateString('nl-Be')}
                    temperature={day.daily.data[0].temperatureMax}
                    icon={day.daily.data[0].icon}
                />
            )}
            </div>
        </div>

        )
    }
}

export default LastMonthItem;