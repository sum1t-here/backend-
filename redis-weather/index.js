import express from "express";
import { fetchWeatherApi } from "openmeteo";

const app = express();

const port = 3000;

app.get("/", async (req, res) => {
    const params = { "latitude": 26.17, "longitude": 91.74, "daily": ["sunrise", "sunset", "daylight_duration"], "hourly": "temperature_2m", "timezone": "GMT" };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    console.log(
        `\nCoordinates: ${latitude}°N ${longitude}°E`,
        `\nElevation: ${elevation}m asl`,
        `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
        `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    );

    const hourly = response.hourly();
    const daily = response.daily();

    const sunrise = daily.variables(0);
    const sunset = daily.variables(1);

    const weatherData = {
        hourly: {
            time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature_2m: hourly.variables(0).valuesArray(),
        },
        daily: {
            time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
            ),
            // Map Int64 values to according structure
            sunrise: [...Array(sunrise.valuesInt64Length())].map(
                (_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
            ),
            // Map Int64 values to according structure
            sunset: [...Array(sunset.valuesInt64Length())].map(
                (_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
            ),
            daylight_duration: daily.variables(2).valuesArray(),
        },
    };

    res.json({
        "Hourly data": weatherData.hourly,
        "Daily data": weatherData.daily,
    })
})

app.listen(port, () => {
    console.log(`Server is running successfully !!! at ${port}`);
});