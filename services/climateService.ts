import axios from "axios";

type MainCity = string;

// const CLIMATE_TOKEN = process.env.CLIMATE_TOKEN;

export const getClimateUrl = (city: MainCity) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d51e247782178f89d048a4b2b946203&units=metric`;

export const getClimateValue = async (city: MainCity) => {
  const url = getClimateUrl(city);
  const resultClimate = await axios.get(url);

  const temperature = resultClimate.data.main.temp;
  return temperature;
};
