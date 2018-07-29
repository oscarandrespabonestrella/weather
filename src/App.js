import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import GeocoderInput from "./components/GeocoderInput"
import DayCard from "./components/DayCard"
import ForecastItem from "./components/ForecastItem"
import DarkSkyApi from 'dark-sky-api';
import {connect} from "react-redux";
import { setPlace } from './store/actions/mainActions'


DarkSkyApi.apiKey = '3c03d34bbb55c5dc401264a0222d6291';
DarkSkyApi.units = 'auto'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address:'',
      position:{},
      weatherCity:{},
      forecastCity:{},
      classBackground: "default",
      days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    }
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address =>{
      this.setState({ address });
      geocodeByAddress(address)
      .then(result=>getLatLng(result[0]))
      .then(({lat,lng})=>{
          this.props.setCoordinates([lat,lng])
          this.getCityWeather(lat,lng)
      })
  }
  componentDidMount(){

  }
  getCityWeather = async (lat,lng)=>{
    let position = {latitude: lat, longitude: lng }
    let weather = JSON.parse(localStorage.getItem('weatherForecast'))
    let Currentweather =JSON.parse(localStorage.getItem('currentweather'))
    try{
      if(Currentweather == null){
        Currentweather = await DarkSkyApi.loadCurrent(position)
        // localStorage.setItem('currentweather',JSON.stringify(Currentweather))
      }
      if(weather == null){
        weather = await DarkSkyApi.loadForecast(position)
        // localStorage.setItem('weatherForecast',JSON.stringify(weather))
      }
      this.setState({weatherCity:Currentweather,forecastCity : weather,position:position});
      this.setState({classBackground:Currentweather.icon})
    }catch(e){
      console.log(e)
    }
  }

  populateWeek = () => {
    const week = this.state.forecastCity.daily.data;
    const listItems = week.map((day,index) =>
      <ForecastItem
        extraData={{rain: day.precipIntensity, windSpeed: day.windSpeed, pressure: day.pressure,temperatureMin:day.temperatureMin}}
        key={index}
        day={this.state.days[new Date(day.dateTime).getDay()]}
        temperature={day.temperatureMax}
        icon={day.icon}
      />
    );
    return (
      <div className="row">
          <div className="col-8">
            <div className="graph d-flex justify-content-between">{listItems}</div>
        </div>
      </div>
    );
  }
  populateLastMonth = async () => {
    const week = this.state.forecastCity.daily.data;
    try{
      const weatherLastMonth = await DarkSkyApi.loadTime("time", this.state.position)
      const listItems = week.map((day,index) =>
        <ForecastItem
          extraData={{rain: day.precipIntensity, windSpeed: day.windSpeed, pressure: day.pressure,temperatureMin:day.temperatureMin}}
          key={index}
          day={this.state.days[new Date(day.dateTime).getDay()]}
          temperature={day.temperatureMax}
          icon={day.icon}
        />
      );
      return (
        <div className="row">
            <div className="col-8">
              <div className="graph d-flex justify-content-between">{listItems}</div>
          </div>
        </div>
      );
    }catch(e){

    }

  }

  render() {
    let componentDataWeather
    let ForecastWeek
    if(this.state.classBackground!='default'){
      componentDataWeather = <DayCard weatherCity={this.state.weatherCity} forecastCity={this.state.forecastCity}></DayCard>
      ForecastWeek = this.populateWeek()
    }
    let classFinal = 'App ' + this.state.classBackground
    return (
      <div className={classFinal}>
        <div className="row">
          <header className="App-header">
            <h1 className="App-title">Weather</h1>
          </header>
        </div>
        <div className="row">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <GeocoderInput value={this.state.address} onChange={this.handleChange} onSelect={this.handleSelect} />
          </div>
        </div>
        <div className="row">
          {componentDataWeather}
        </div>
        {ForecastWeek}
        <div className="row">
          <button> SHOW LAST MONTH HISTORY</button>
        </div>
      </div>
    );
  }
}




const mapDispatchToProps = dispatch =>{
  return{
    setCoordinates : (coordinates) => dispatch(setPlace(coordinates)),
  };
};

const mapStateToProps = data => {
  return {
    place: data.states.coordinates
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);


