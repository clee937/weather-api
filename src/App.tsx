import { useEffect, useState } from "react";
import "./App.scss";
import WeatherDisplay from "./WeatherDisplay/WeatherDisplay";
// import { Coordinates } from "./types/UserLocation";
import { WeatherInfo } from "./types/WeatherInfo";
import sunrise from "./assets/images/sunrise.png";
import sun from "./assets/images/sun.png";
import moon from "./assets/images/moon.png";
import Greeting from "./Greeting/Greeting";

const getGreeting = (hour: number) => {
  if (hour < 12) {
    return "Good Morning";
  }
  if (hour < 18) {
    return "Good Afternoon";
  }
  return "Good Evening";
};

const getGreetingImage = (hour: number) => {
  if (hour < 12) {
    return sunrise;
  }
  if (hour < 18) {
    return sun;
  }
  return moon;
};

function App() {
  // const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({
    location: "",
    temperature: 0,
    feelsLike: 0,
    condition: "",
    wind: 0,
    sunrise: "",
    sunset: "",
  });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // setUserLocation({ latitude, longitude });
          getWeather(latitude, longitude);
        },
        (error) => {
          console.log("Error getting user location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  };

  const getWeather = async (lat: number, long: number) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=a2bcc37b2425486998b155054240506&q=${lat},${long}&days=1&aqi=no&alerts=no`;
    const result = await fetch(url);
    const data = await result.json();
    console.log(data);

    const {
      location: { name },
      current: {
        condition: { text: condition } = "Loading…",
        temp_c,
        feelslike_c,
        wind_mph,
      },
      forecast: {
        forecastday: [
          {
            astro: { sunrise, sunset },
          },
        ],
      },
    } = data;

    setWeatherInfo({
      location: name,
      temperature: temp_c,
      feelsLike: feelslike_c,
      condition: condition,
      wind: wind_mph,
      sunrise: sunrise,
      sunset: sunset,
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const date = new Date();

  const currentHour = new Date().getHours();
  console.log({ date });
  const greeting = getGreeting(currentHour);
  const greetingImage = getGreetingImage(currentHour);

  return (
    <div className="app">
      {/* <img src={greetingImage} alt="current time icon" />
      <h1>{greeting}</h1>
      {userLocation && (
        <div>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Latitude: {userLocation.longitude}</p>
        </div>
      )}
      <h1></h1> */}
      <Greeting greeting={greeting} greetingImage={greetingImage} />
      <WeatherDisplay weather={weatherInfo} />
    </div>
  );
}

export default App;
