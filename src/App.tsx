import "./App.scss";
import { useEffect, useState } from "react";
import WeatherDisplay from "./Components/WeatherDisplay/WeatherDisplay";
import { WeatherInfo } from "./types/WeatherInfo";
import sunrise from "./assets/images/sunrise.png";
import sun from "./assets/images/sun.png";
import moon from "./assets/images/moon.png";
import Greeting from "./Components/Greeting/Greeting";
import { icons } from "./data/icons";
import LoadingSpinner from "./Components/LoadingSpinner/LoadingSpinner";
import TodoForm from "./Components/TodoForm/TodoForm";
import { Todo } from "./types/Todo";
import TodoList from "./Components/TodoList/TodoList";

const getGreeting = (hour: number) => {
  if (hour < 12) return "Good Morning!";
  if (hour < 18) return "Good Afternoon!";
  return "Good Evening!";
};

const getGreetingImage = (hour: number) => {
  if (hour < 12) return sunrise;
  if (hour < 18) return sun;
  return moon;
};

function App() {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);

  const [todos, setTodos] = useState<Todo[]>(() => {
    const localStoredTodos = localStorage.getItem("todos");
    if (localStoredTodos == null) return [];

    return JSON.parse(localStoredTodos);
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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

  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async (lat: number, long: number) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${long}&days=1&aqi=no&alerts=no`;

    const result = await fetch(url);
    const data = await result.json();
    console.log(data);

    const {
      location: { name, region, country },
      current: {
        condition: { text: condition, code } = "Loading…",
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

    const sunriseTime = sunrise.replace(/^0+/, "");
    const sunsetTime = sunset.replace(/^0+/, "");

    setWeatherInfo({
      location: name,
      region: region,
      country: country,
      temperature: temp_c,
      feelsLike: feelslike_c,
      condition: condition,
      code: code,
      wind: wind_mph,
      sunrise: sunriseTime,
      sunset: sunsetTime,
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const currentHour = new Date().getHours();
  const greeting = getGreeting(currentHour);
  const greetingImage = getGreetingImage(currentHour);

  const getConditionIcon = (code: number, hour: number) => {
    if (hour > 4 && hour < 22) {
      for (const info in icons) {
        if (code === icons[info].code) {
          return icons[info].icon;
        }
      }
    } else {
      for (const info in icons) {
        if (code === icons[info].code) {
          return icons[info].icon_night;
        }
      }
    }
  };

  if (!weatherInfo) return <LoadingSpinner />;

  const addTodo = (todo: string) => {
    const newTodos = [...todos, { todo, isComplete: false }];
    setTodos(newTodos);
  };

  const conditionIcon = getConditionIcon(weatherInfo.code, currentHour);

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
  };

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_: Todo, i: number) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="app__weather">
        <Greeting greeting={greeting} greetingImage={greetingImage} />
        <WeatherDisplay weather={weatherInfo} icon={conditionIcon || sun} />
      </div>
      <div className="app__todos">
        <Greeting greeting="Todo List" />
        <TodoForm addTodo={addTodo} />

        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
