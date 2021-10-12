import axios from "axios";

type MainCity = string;

export const getClimateUrl = (city: MainCity) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3f97d7ef8fb43e049a8c95e27f22a52d&units=metric`;

export const getClimateValue = async (city: MainCity) => {
  const url = getClimateUrl(city);
  const resultClimate = await axios.get(url);

  const temperature = resultClimate.data.main.temp;
  return temperature;
};
