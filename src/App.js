import './App.css';
import NavBar from './components/NavBar';
import Details from './components/Details';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';

function App() {
  // const handleLocationClick = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       let lat = position.coords.latitude;
  //       let lon = position.coords.longitude;

  //       setQuery(`${lat}%2C${lon}`);
  //     });
  //   }
  // };
  const [query, setQuery] = useState('kendal');
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData(query).then((data) => {
        setWeather(data);
      });
    };

    // let lon, lat;
    // navigator.geolocation.getCurrentPosition((position) => {
    //   lon = position.coords.longitude;
    //   lat = position.coords.latitude;
    //   fetchWeather({ ...lon, ...lat });
    // });
    fetchWeather();
  }, [query, units]);

  return (
    <div className="App  pb-10">
      {weather && (
        <div>
          <NavBar setQuery={setQuery} units={units} setUnits={setUnits} />
          <Details weather={weather} />
          <Forecast items={weather.hourly} title="Hourly Forecast" />
          <Forecast items={weather.daily} title="Daily Forecast" />
        </div>
      )}
    </div>
  );
}

export default App;
