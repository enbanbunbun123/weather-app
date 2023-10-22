const request = require("request");
const dotenv = require("dotenv").config();

const options = {
  url: `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=metric&appid=${process.env.API_KEY}`,
  method: "GET",
  json: true,
};

request(options, (error, res, body) => {
  console.log(body.main.temp);
});
