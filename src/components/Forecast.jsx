import React from 'react';
import { WiRaindrops } from 'react-icons/wi';
import { iconUrl } from '../services/weatherService';

const Forecast = ({ title, items }) => {
  return (
    <div className="mx-auto max-w-screen-xl mt-8 py-8 px-16 bg-white h-fit shadow-lg shadow-gray-300 rounded-md">
      <div className="flex items-center justify-start">
        <p className="font-medium text-lg text-gray-700">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="mt-5 flex flex-row items-center justify-between">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-med text-sm mb-1">{item.title}</p>
            <p className="font-bold text-lg text-3xl text-blue-600">
              {item.temp.toFixed()}°
            </p>
            <img src={iconUrl(item.icon)} alt="" />
            <span>
              <WiRaindrops className="inline -mr-3 text-blue-400" size={40} />{' '}
              {item.precipprob}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
