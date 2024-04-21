import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./features/weather/weatherSlice";
import Search from "./components/search/Search";
import WeatherDisplay from "./components/weather/WeatherDisplay";
import LanguageSwitcher from "./components/language/LanguageSwitcher";
import { Radio } from "react-loader-spinner";
import "./styles/Styles.scss";
import { changeLanguage } from './features/language/languageSlice';


const App: React.FC = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState<string>("Nairobi");
  const { data: coordinates, error, loading } = useSelector((state: any) => state.weather);
  const { currentLanguage } = useSelector((state: any) => state.language);
  const [isOpen, setIsOpen] = useState(false);



  const handleLanguageChange = (language: string) => {
    dispatch(changeLanguage(language));
    setIsOpen(false);
  };

  const getCoordinates = useCallback(() => {
    dispatch<any>(fetchWeather({ city, language: currentLanguage }));
  }, [city, dispatch, currentLanguage]);

  useEffect(() => {
    getCoordinates();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getCoordinates();
  };

  return (
    <>
      <LanguageSwitcher
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleLanguageChange={handleLanguageChange}
      />
      <Search
        onSubmit={handleSubmit}
        city={city}
        setCity={setCity} />
      <Radio
        visible={loading === "pending"}
        height="80"
        width="80"
        colors={["#007bff", "#007bff", "#007bff"]}
        ariaLabel="radio-loading"
        wrapperClass="loader"
      />
      {error?.length > 0 && <p>Error occcured:{error}</p>}
      {loading === "succeeded" && !error && (
        <WeatherDisplay data={coordinates} />
      )}
    </>
  );
};

export default App;
