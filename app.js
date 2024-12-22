import readline from "readline/promises";

const API_KEY = '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getWeather = async (city) => {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found. Please check the city name and try again.');
        }

        const weatherData = await response.json();
        console.log('\nWeather information:');
        console.log(`City: ${weatherData.name}`);
        console.log(`Temperature: ${weatherData.main.temp}°C`);
        console.log(`Weather: ${weatherData.weather[0].description}`);
        console.log(`Humidity: ${weatherData.main.humidity}%`);
        console.log(`Wind Speed: ${weatherData.wind.speed} m/s`);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

const city = await rl.question('Enter a city name to get its weather: ');
await getWeather(city);
rl.close();

