import axios from "axios";

type MainCity = string;

const CLIMATE_TOKEN = process.env.CLIMATE_TOKEN;

export const getClimateUrl = (city: MainCity) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CLIMATE_TOKEN}&units=metric`;

export const getClimateValue = async (city: MainCity) => {
  const url = getClimateUrl(city);
  const resultClimate = await axios.get(url);

  const temperature = resultClimate.data.main.temp;
  const cityName = resultClimate.data.name;
  return { temperature, cityName };
} 
