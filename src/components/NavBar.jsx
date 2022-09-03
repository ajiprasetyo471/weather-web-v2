import React, { useState } from 'react';
import { UilSearch, UilMapMarker } from '@iconscout/react-unicons';

function NavBar({ setQuery, units, setUnits }) {
  const [city, setCity] = useState('');

  const handleSearchClick = () => {
    if (city !== '') setQuery(city);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery(`${lat}%2C${lon}`);
      });
    }
  };

  return (
    <div className="px-10 py-5 bg-blue-400 text-white text-lg font-medium flex items-center justify-between">
      <p className="text-2xl font-light">
        we<span className="font-bold">web</span>
      </p>
      <div className="flex flex-row items-center justify-center">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="search city..."
          className="focus:outline-none w-full shadow-xl font-light text-black capitalize placeholder:lowercase py-2 px-5 mr-2 rounded-lg"
        />
        <UilSearch
          size={30}
          className="mx-2 text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilMapMarker
          size={30}
          className="mx-2 text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <button className="text-xl text-white font-light transition ease-out hover:scale-125">
          °C
        </button>
        <span
          className="text-xl text-white
         mx-1"
        >
          |
        </span>
        <button className="text-xl text-white font-light transition ease-out hover:scale-125">
          °F
        </button>
      </div>
    </div>
  );
}

export default NavBar;
