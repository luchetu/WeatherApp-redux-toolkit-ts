import { API_KEY, BASE_URL } from "../../config/weatherApi";

const fetchCoordinates = async (city: string) => {
    const response = await fetch(
        `${BASE_URL}geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`,
    );
    const result = await response.json();
    return result;
};

export const fetchWeatherData = async (city: string, language: string) => {
    const coordinates = await fetchCoordinates(city);
    const lat = coordinates[0].lat;
    const lon = coordinates[0].lon;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    const response = await fetch(
        `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&date=${date}&lang=${language}&appid=${API_KEY}`,
    );
    const responseData = await response.json();
    return responseData;
};
