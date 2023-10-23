import React, { useState } from "react";

const cities: { [key: string]: { lat: number; lon: number } } = {
  hokkaido: { lat: 43.0642, lon: 141.3469 },
  aomori: { lat: 40.8246, lon: 140.74 },
  iwate: { lat: 39.7036, lon: 141.1525 },
  miyagi: { lat: 38.2682, lon: 140.8694 },
  akita: { lat: 39.7186, lon: 140.1023 },
  yamagata: { lat: 38.2404, lon: 140.3633 },
  fukushima: { lat: 37.7503, lon: 140.4676 },
  ibaraki: { lat: 36.3418, lon: 140.4468 },
  tochigi: { lat: 36.5657, lon: 139.8836 },
  gunma: { lat: 36.3911, lon: 139.0608 },
  saitama: { lat: 35.8569, lon: 139.6489 },
  chiba: { lat: 35.605, lon: 140.1233 },
  tokyo: { lat: 35.6895, lon: 139.6917 },
  kanagawa: { lat: 35.4475, lon: 139.6425 },
  niigata: { lat: 37.9024, lon: 139.0232 },
  toyama: { lat: 36.6953, lon: 137.2113 },
  ishikawa: { lat: 36.5947, lon: 136.6256 },
  fukui: { lat: 36.0652, lon: 136.2216 },
  yamanashi: { lat: 35.6642, lon: 138.5683 },
  nagano: { lat: 36.6513, lon: 138.1811 },
  gifu: { lat: 35.3912, lon: 136.7222 },
  shizuoka: { lat: 34.9769, lon: 138.3831 },
  aichi: { lat: 35.1802, lon: 136.9066 },
  mie: { lat: 34.7303, lon: 136.5086 },
  shiga: { lat: 35.0045, lon: 135.8686 },
  kyoto: { lat: 35.0214, lon: 135.7554 },
  osaka: { lat: 34.6863, lon: 135.52 },
  hyogo: { lat: 34.6913, lon: 135.183 },
  nara: { lat: 34.6851, lon: 135.805 },
  wakayama: { lat: 34.226, lon: 135.1675 },
  tottori: { lat: 35.5039, lon: 134.2381 },
  shimane: { lat: 35.4723, lon: 133.0505 },
  okayama: { lat: 34.6618, lon: 133.9344 },
  hiroshima: { lat: 34.3966, lon: 132.4596 },
  yamaguchi: { lat: 34.1858, lon: 131.4714 },
  tokushima: { lat: 34.0658, lon: 134.5593 },
  kagawa: { lat: 34.3401, lon: 134.0434 },
  ehime: { lat: 33.8417, lon: 132.7661 },
  kochi: { lat: 33.5597, lon: 133.5311 },
  fukuoka: { lat: 33.6064, lon: 130.4181 },
  saga: { lat: 33.2494, lon: 130.2988 },
  nagasaki: { lat: 32.7448, lon: 129.8737 },
  kumamoto: { lat: 32.7898, lon: 130.7417 },
  oita: { lat: 33.2382, lon: 131.6126 },
  miyazaki: { lat: 31.9111, lon: 131.4239 },
  kagoshima: { lat: 31.5602, lon: 130.5571 },
  okinawa: { lat: 26.2123, lon: 127.6809 },
};

function Top() {
  const [cityName, setCityName] = useState<string>("");
  const [temperature, setTemperature] = useState<string | null>(null);
  const [weather, setWeather] = useState<string | null>(null);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityName(e.target.value);
  };

  const getWeatherData = async () => {
    const cityData = cities[cityName];

    if (!cityData) {
      alert("都市名が不正です");
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (response.status !== 200) {
        const message = data.message || "Error fetching weather data";
        throw new Error(message);
      }

      setTemperature(
        `The temperature in ${
          cityName.charAt(0).toUpperCase() + cityName.slice(1)
        } is ${data.main.temp}°C.`
      );
      setWeather(data.weather[0].main);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div>
      <select value={cityName} onChange={handleCityChange}>
        <option value="">都市を選択してください</option>
        {Object.keys(cities).map((city) => (
          <option key={city} value={city}>
            {city.charAt(0).toUpperCase() + city.slice(1)}
          </option>
        ))}
      </select>
      <button onClick={getWeatherData}>Get Weather Data</button>
      {temperature && <p>{temperature}</p>}
      {weather && <p>{weather}</p>}
    </div>
  );
}

export default Top;
