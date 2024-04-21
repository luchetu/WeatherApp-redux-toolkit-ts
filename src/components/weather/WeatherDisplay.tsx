import React from "react";
import { WeatherData } from "../../types/weatherData";
import { FaMapMarker } from "react-icons/fa";
import { TiWeatherCloudy, TiWeatherSunny } from "react-icons/ti";
import { WiStrongWind, WiBarometer, WiHumidity } from "react-icons/wi";
import styles from "./weather.module.scss";

interface WeatherDisplayProps {
  data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {

  return (
    <>
      <div className={styles.temp}>

        <div className={styles.label}>
          <sup id="marker">
            <FaMapMarker />
          </sup>
          <h1 className={styles.name}>{data.name}</h1>
          <sub className={styles.country}>{data.sys.country}</sub>
        </div>

        <h1 className={styles.temp}>{data.main.temp}°C</h1>
        <div className={styles.minMax}>
          <span className={styles.max}>{data.main.temp_max}°C</span>
          <span className={styles.slash}>/</span>
          <span className={styles.min}>{data.main.temp_min}°C</span>
        </div>
        <span className={styles.description}>
          {data.weather[0].description.includes("clear") ? (
            <TiWeatherSunny />
          ) : (
            <TiWeatherCloudy />
          )}
          <span className={styles.desc}>{data.weather[0].description}</span>
        </span>
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <WiStrongWind />
          <span>Wind: {data.wind.speed} m/s</span>
        </div>
        <div className={styles.card}>
          <WiBarometer />
          <span>Pressure: {data.main.pressure} hPa</span>
        </div>
        <div className={styles.card}>
          <WiHumidity />
          <span>Humidity: {data.main.humidity} %</span>
        </div>
      </div>
    </>
  );
};

export default WeatherDisplay;
