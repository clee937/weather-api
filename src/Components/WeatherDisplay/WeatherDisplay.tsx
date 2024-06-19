import { WeatherInfo } from "../../types/WeatherInfo";
import "./WeatherDisplay.scss";
import sunrise from "./../../assets/images/sunrise.png";
import sun from "./../../assets/images/sun.png";

type WeatherDisplayProps = {
  weather: WeatherInfo;
  icon: string;
};

const WeatherDisplay = ({ weather, icon }: WeatherDisplayProps) => {
  const {
    location: town,
    region,
    country,
    temperature,
    feelsLike,
    condition,
    wind,
    sunrise: sunriseTime,
    sunset: sunsetTime,
  } = weather;
  return (
    <>
      <div className="weather-display">
        <h2 className="weather-display__heading">
          {town}, {region}, {country}
        </h2>
        <div className="weather-display__condition-container">
          <div className="weather-display__condition-icon-container">
            <img
              className="weather-display__condition-icon"
              src={icon}
              alt="weather condition icon"
            />
          </div>
          <p className="weather-display__info">{condition}</p>
        </div>

        <p className="weather-display__info">Temperature: {temperature}°C</p>
        <p className="weather-display__info">Feels like: {feelsLike}°C</p>
        <p className="weather-display__info">Wind speed: {wind}mph</p>
      </div>
      <div className="astro">
        <div className="astro__sunrise-container">
          <div className="astro__image-container astro__image-container--sunrise">
            <img className="astro__image" src={sun} alt="sunrise icon" />
          </div>
          <p className="astro__sunrise">Sunrise: {sunriseTime}</p>
        </div>

        <div className="astro__sunrise-container">
          <div className="astro__image-container">
            <img className="astro__image" src={sunrise} alt="sunset icon" />
          </div>
          <p className="astro__sunset">Sunset: {sunsetTime}</p>
        </div>
      </div>
    </>
  );
};

export default WeatherDisplay;
