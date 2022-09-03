import React from 'react';
import { formatToLocalTime, iconUrl } from '../services/weatherService';

function Details({
  weather: {
    resolvedAddress,
    datetimeEpoch,
    timezone,
    temp,
    conditions,
    precipprob,
    icon,
    feelslike,
  },
}) {
  return (
    <div className="mx-auto max-w-screen-xl mt-5 py-8 px-16 bg-gradient-to-b from-blue-500 to-blue-300 h-fit shadow-lg shadow-gray-400 rounded-md flex flex-row justify-between">
      <div className="flex items-start flex-col text-white">
        <p className="font-medium text-lg text-start">{resolvedAddress}</p>
        <p className="font-light text-lg text-start">
          {formatToLocalTime(datetimeEpoch, timezone)}
        </p>
        <p className="text-7xl font-medium">{temp.toFixed()}°</p>
        <p className="font-medium text-lg">{conditions}</p>
        <p className="font-medium text-lg text-start">
          {precipprob &&
            `${precipprob}% chance of rain through ${formatToLocalTime(
              datetimeEpoch,
              timezone,
              'hh:mm a'
            )}`}
        </p>
      </div>
      <div className="flex align-middle items-center text-white flex-col justify-center">
        <img src={iconUrl(icon)} className="" alt="" />
        <p>
          {temp.toFixed()}°/{feelslike.toFixed()}°
        </p>
      </div>
    </div>
  );
}

export default Details;
