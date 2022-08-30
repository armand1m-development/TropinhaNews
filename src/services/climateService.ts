import axios from "axios";

const CLIMATE_TOKEN = process.env.CLIMATE_TOKEN;

export const getClimateUrl = (city: string) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CLIMATE_TOKEN}&units=metric`;

export const getClimateValue = async (city: string) => {
  const url = getClimateUrl(city);
  const resultClimate = await axios.get(url);
  const temperature = resultClimate.data.main.temp;

  return temperature;
};
