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
      position:[],
      weatherCity:{},
      forecastCity:{},
      classBackground: "default",
      days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      lastMonthTimes:[],
      lastMonthForecast:[],
      auxButtonHistory:true
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
    // Auxiliar classes to save api calls
    // let weather = JSON.parse(localStorage.getItem('weatherForecast'))
    // let Currentweather =JSON.parse(localStorage.getItem('currentweather'))
    try{
      // if(Currentweather == null){
        this.setState({lastMonthForecast:[]})
        let Currentweather = await DarkSkyApi.loadCurrent(position)
        // localStorage.setItem('currentweather',JSON.stringify(Currentweather))
      // }
      // if(weather == null){
        let weather = await DarkSkyApi.loadForecast(position)
        // localStorage.setItem('weatherForecast',JSON.stringify(weather))
      // }
      this.setState({weatherCity:Currentweather,forecastCity : weather,position:position});
      this.setState({classBackground:Currentweather.icon})
    }catch(e){
      console.log(e)
    }
  }

  populateLastMonth = async ()=>{
    try{
      // Auxiliar classes to save api calls
      // let lastMonth = JSON.parse(localStorage.getItem('lastMonth'))
      // if(lastMonth == null){
        for(let i=30; i>=1;i--){
            var d = new Date();
            let day = Math.floor(d.setDate(d.getDate() - i) / 1000)
            let response = await DarkSkyApi.loadTime(day, this.state.position)
            this.setState({ lastMonthForecast: [...this.state.lastMonthForecast, response] })
        }
      //   localStorage.setItem('lastMonth',JSON.stringify(this.state.lastMonthForecast))
      // }else{
      //   this.setState({ lastMonthForecast: lastMonth})
      // }
    }catch(e){
      console.log(e)
    }

  }

  populateWeek = () => {
    const week = this.state.forecastCity.daily.data;
    const listItems = week.map((day,index) =>
      <ForecastItem
        extraData={{rain: day.precipProbability, windSpeed: day.windSpeed, pressure: day.pressure,temperatureMin:day.temperatureMin}}
        key={index}
        id={index}
        day={this.state.days[new Date(day.dateTime).getDay()]}
        temperature={day.temperatureMax}
        icon={day.icon}
      />
    );
    return (
      <div className="col-12 d-flex justify-content-center">
          <div className="col-12 col-md-8">
            <div className="graph d-flex justify-content-between">{listItems}</div>
        </div>
      </div>
    );
  }
  createLastMonthsCards= () => {
      console.log(this.state.lastMonthForecast)
      const previousDays = this.state.lastMonthForecast.map((day,index) =>
      <ForecastItem
        extraData={{rain: day.daily.data[0].precipProbability, windSpeed: day.daily.data[0].windSpeed, pressure: day.daily.data[0].pressure,temperatureMin:day.daily.data[0].temperature}}
        key={index}
        id={index}
        day={new Date(day.daily.data[0].dateTime).toLocaleDateString('nl-Be')}
        temperature={day.daily.data[0].temperature}
        icon={day.daily.data[0].icon}
      />
      );
      return (
        <div className="col-12">
            <div className="col-12">
              <div className="graph lastMonth d-flex justify-content-between">{previousDays}</div>
          </div>
        </div>
      );
  }

  render() {
    let componentDataWeather
    let ForecastWeek
    let RenderLastMonth
    let showHistory
    if(this.state.classBackground!='default'){
      componentDataWeather = <DayCard  weatherCity={this.state.weatherCity} forecastCity={this.state.forecastCity}></DayCard>
      ForecastWeek = this.populateWeek();
      RenderLastMonth = this.createLastMonthsCards();
      showHistory =  <div className="col-12 d-flex justify-content-center"><button onClick={this.populateLastMonth}> SHOW LAST MONTH HISTORY</button></div>
    }
    let classFinal = 'App row ' + this.state.classBackground
    return (
      <div className={classFinal}>
        <div className="col-12 col-md-4">
          <header className="App-header">
            <h1 className="App-title">Weather</h1>
          </header>
          <GeocoderInput value={this.state.address} onChange={this.handleChange} onSelect={this.handleSelect} />
        </div>
        {componentDataWeather}
        {ForecastWeek}
        {showHistory}
        {RenderLastMonth}
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


