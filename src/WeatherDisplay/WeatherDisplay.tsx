import { WeatherInfo } from "../types/WeatherInfo";
import "./WeatherDisplay.scss";

type WeatherDisplayProps = {
  weather: WeatherInfo;
};

const WeatherDisplay = ({ weather }: WeatherDisplayProps) => {
  const {
    location: town,
    country,
    temperature,
    feelsLike,
    condition,
    wind,
    time,
    sunrise,
    sunset,
  } = weather;
  return (
    <div className="weather-display">
      <h2 className="weather-display__heading">
        Location: {town}, {country}
      </h2>
      <p className="weather-display__info">Condition: {condition}</p>
      <p className="weather-display__info">Temperature: {temperature}°</p>
      <p className="weather-display__info">Feels like: {feelsLike}°</p>
      <p className="weather-display__info">Wind speed: {wind}mph</p>
      <p className="weather-display__info">Time: {time}</p>
      <p className="weather-display__info">Sunrise: {sunrise}</p>
      <p className="weather-display__info">Sunset: {sunset}</p>
    </div>
  );
};

export default WeatherDisplay;
