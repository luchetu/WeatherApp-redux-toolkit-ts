import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../config/weatherApi";

interface WeatherData {
  lat: number;
  lon: number;
  name: string;
  country: string;
  weather: any;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  temp: {
    min: number;
    max: number;
    afternoon: number;
    night: number;
    evening: number;
    morning: number;
  };
  wind: {
    speed: number;
  };
}

interface ErrorResponse {
  message: string;
}

type ResponseData = WeatherData | ErrorResponse;

const useWeatherData = (
  lat: number,
  lon: number,
): { isLoading: boolean; data: WeatherData | null; error: string | null } => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const date = `${year}-${month}-${day}`;

        const response = await fetch(
          `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&date=${date}&appid=${API_KEY}`,
        );
        const responseData: ResponseData = await response.json();

        if (response.ok) {
          if ("message" in responseData) {
            setError(responseData.message);
          } else {
            setData(responseData);
          }
        } else {
          setError("An error occurred while fetching weather data.");
        }
      } catch (error) {
        setError("An error occurred while fetching weather data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  return { isLoading, data, error };
};

export default useWeatherData;
