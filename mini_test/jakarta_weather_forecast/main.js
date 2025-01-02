require("dotenv").config();

const jakarta = {
  long: 106.8275,
  lat: -6.17,
};

const dateFormat = {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
};

const desiredTime = "10:00:00";

const apiKey = process.env.OPENWEATHER_API_KEY;

const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${jakarta.lat}&lon=${jakarta.long}&appid=${apiKey}&units=metric`;

async function getWeatherForecast() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== "200") {
      console.error("Error fetching weather data:", data.message);
      return;
    }

    const weatherList = data.list.filter((item) => {
      const forecastTime = new Date(item.dt * 1000);

      const forecastTimeStr = forecastTime.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Jakarta",
      });

      return forecastTimeStr === desiredTime;
    });

    if (weatherList) {
      weatherList.forEach((item) => {
        const forecastDate = new Date(item.dt * 1000).toLocaleDateString(
          "en-GB",
          dateFormat
        );

        const temperature = item.main.temp;

        console.log(`${forecastDate}: ${temperature}°C`);
      });
    } else {
      console.log(`No forecast data available for time ${desiredTime}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

getWeatherForecast();
