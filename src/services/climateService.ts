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

export type Forecast = {
  dt_txt: string;
  weather: {
    description: string;
  }[];
};

export const getForecast = async (city: MainCity) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${CLIMATE_TOKEN}&units=metric&lang=pt_br`;
  const resultForecast = await axios.get<{
    list: Forecast[];
  }>(url);

  return resultForecast.data.list.slice(0, 4).map(
    (forecast) =>
      `${new Intl.DateTimeFormat("pt-BR", {
        hourCycle: "h24",
        hour: "numeric",
      }).format(
        new Date(forecast.dt_txt)
      )}Hrs - ${forecast.weather[0].description.toUpperCase()}`
  );
};
