const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/ddfc0938764a93974f8b2cb846cf2b54/${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, precipProbability } = body.currently;
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${temperature} degrees outside. There is a ${precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
