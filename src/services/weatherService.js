import { DateTime } from 'luxon';

const API_KEY = 'U3ZA3QTB3WQRWMVVJEDMWUPKJ';
const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

const getWeatherData = (searchParams, unit) => {
  const url = new URL(BASE_URL + '/' + searchParams + '?key=' + API_KEY);

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

const formatCurrentWeather = (data) => {
  const {
    latitude,
    longitude,
    resolvedAddress,
    address,
    timezone,
    description,
    currentConditions: {
      datetime,
      datetimeEpoch,
      temp,
      feelslike,
      humidity,
      precipprob,
      windspeed,
      winddir,
      cloudcover,
      conditions,
      icon,
    },
    sunrise,
    sunset,
  } = data;

  return {
    latitude,
    longitude,
    resolvedAddress,
    address,
    timezone,
    description,
    datetime,
    datetimeEpoch,
    temp,
    feelslike,
    humidity,
    precipprob,
    windspeed,
    winddir,
    cloudcover,
    conditions,
    icon,
    sunrise,
    sunset,
  };
};

const formatForecastWeather = (data) => {
  const { timezone, days } = data;
  const hours = days[0].hours;

  let daily = days.slice(1, 8).map((d) => {
    return {
      title: formatToLocalTime(d.datetimeEpoch, timezone, 'ccc'),
      temp: d.temp,
      icon: d.icon,
      precipprob: d.precipprob,
    };
  });

  let hourly = hours.slice(8, 20).map((d) => {
    return {
      title: formatToLocalTime(d.datetimeEpoch, timezone, 'hh:mm a'),
      temp: d.temp,
      icon: d.icon,
      precipprob: d.precipprob,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(searchParams).then(
    formatCurrentWeather
  );

  const formattedForecastWeather = await getWeatherData(searchParams).then(
    formatForecastWeather
  );

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
  // return formattedCurrentWeather;
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrl = (code) =>
  `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${code}.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrl };
