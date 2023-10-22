const request = require("request");
const dotenv = require("dotenv").config();

const cities = {
  tokyo: { lat: 35.6895, lon: 139.6917 },
};

const cityName = process.argv[2].toLowerCase();
const cityData = cities[cityName];

if (!cityData) {
  console.log("City not found");
  process.exit(1);
}

const options = {
  url: `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${process.env.API_KEY}`,
  method: "GET",
  json: true,
};

request(options, (error, res, body) => {
  if (error) {
    console.error("Error fetching weather data:", error);
    process.exit(1);
  }

  if (res.statusCode !== 200) {
    console.error("API returned an error:", body.message);
    process.exit(1);
  }

  console.log(
    `The temperature in ${
      cityName.charAt(0).toUpperCase() + cityName.slice(1)
    } is ${body.main.temp}°C.`
  );
});
