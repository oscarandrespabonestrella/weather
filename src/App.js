//libraries
import React, { Component } from 'react';
import DarkSkyApi from 'dark-sky-api';
import {connect} from "react-redux";
import { setPlace } from './store/actions/mainActions'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

//Components
import GeocoderInput from "./components/GeocoderInput"
import DayCard from "./components/DayCard"
import Week from "./components/Week"
import LastMonthItem from "./components/LastMonthItem"


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

  render() {
    let componentDataWeather
    let ForecastWeek
    let RenderLastMonth
    let showHistory
    if(this.state.classBackground!='default'){
      componentDataWeather = <DayCard  weatherCity={this.state.weatherCity} forecastCity={this.state.forecastCity}></DayCard>
      ForecastWeek = <Week week={this.state.forecastCity.daily.data}></Week>
      showHistory =  <div className="col-12 d-flex justify-content-center"><button onClick={this.populateLastMonth}> SHOW LAST MONTH HISTORY</button></div>
      RenderLastMonth = <LastMonthItem lastMonthForecast={this.state.lastMonthForecast}></LastMonthItem>
    }
    let classFinal = 'app row ' + this.state.classBackground
    return (
      <div className={classFinal}>
        <div className="col-12 col-md-4">
          <header className="app-header">
            <h1 className="app-title">Weather</h1>
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


