const request = require("request");

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3e4581ebc183c32da648b96ce8ed37dc&query=${lat},${lng}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. There is a ${body.current.precip}% chance of rain. and the humidity is ${body.current.humidity} %`
      );
    }
  });
};

module.exports = forecast;
