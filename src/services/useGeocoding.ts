import { useState } from "react";
import { API_KEY, BASE_URL } from "../config/weatherApi";

interface Location {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

const useGeocoding = (): [
  Location | null,
  string | null,
  boolean,
  (city: string) => Promise<void>,
] => {
  const [coordinates, setCoordinates] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCoordinates = async (city: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`,
      );
      const data = await response.json();

      if (response.ok) {
        setCoordinates(data[0]);
      } else {
        setError("An error occurred while fetching coordinates.");
      }
    } catch (error) {
      setError("An error occurred while fetching coordinates.");
    } finally {
      setIsLoading(false);
    }
  };

  return [coordinates, error, isLoading, fetchCoordinates];
};

export default useGeocoding;
