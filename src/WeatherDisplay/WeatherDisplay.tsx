import { WeatherInfo } from "../types/WeatherInfo";
import "./WeatherDisplay.scss";

type WeatherDisplayProps = {
  weather: WeatherInfo;
};

const WeatherDisplay = ({ weather }: WeatherDisplayProps) => {
  const {
    location: town,
    temperature,
    feelsLike,
    condition,
    wind,
    sunrise,
    sunset,
  } = weather;
  return (
    <div className="weather-display">
      <h2 className="weather-display__heading">{town}</h2>
      <p className="weather-display__info">Condition: {condition}</p>
      <p className="weather-display__info">Temperature: {temperature}°</p>
      <p className="weather-display__info">Feels like: {feelsLike}°</p>
      <p className="weather-display__info">Wind speed: {wind}mph</p>
      <p className="weather-display__info">Sunrise: {sunrise}</p>
      <p className="weather-display__info">Sunset: {sunset}</p>
    </div>
  );
};

export default WeatherDisplay;
