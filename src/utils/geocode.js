const request = require("request");
const geoCode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=b9bef5ef2de4b1bce27fa6fb50aca7da&query=${address}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect location service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else if (body.data.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].name,
      });
    }
  });
};

module.exports = geoCode;
