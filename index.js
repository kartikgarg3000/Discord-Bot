import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // To fetch jokes and other data from APIs

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Function to generate a random short ID
const generateShortId = () => {
  return Math.random().toString(36).substring(2, 8);
};

// Function to fetch a random joke from an API
const getJoke = async () => {
  try {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
    return `${data.setup} - ${data.punchline}`;
  } catch (error) {
    console.error('Error fetching joke:', error);
    return 'Sorry, I could not fetch a joke at the moment!';
  }
};

// Function to fetch weather info from an API (OpenWeatherMap)
const getWeather = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY; // Add your OpenWeatherMap API key in .env
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      const weather = data.weather[0].description;
      const temp = data.main.temp;
      return `The weather in ${city} is currently ${weather} with a temperature of ${temp}°C.`;
    } else {
      return `Sorry, I couldn't find the weather information for ${city}.`;
    }
  } catch (error) {
    console.error('Error fetching weather:', error);
    return 'Sorry, I could not fetch the weather at the moment!';
  }
};

// Function to roll a dice (1 to 6)
const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

// Function to fetch a random fact from an API (Random Fact API)
const getRandomFact = async () => {
  try {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error fetching fact:', error);
    return 'Sorry, I could not fetch a random fact at the moment!';
  }
};

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Respond with a default message
  message.reply({
    content: "Hii from Bot!"
  });

  // URL shortening logic
  if (message.content.startsWith('create')) {
    const url = message.content.split("create")[1].trim();
    if (url) {
      const shortId = generateShortId();
      const shortUrl = `https://short.url/${shortId}`;  // Simulating shortened URL
      return message.reply({
        content: `Short URL for ${url}: ${shortUrl}`,
      });
    } else {
      return message.reply({
        content: "Please provide a URL to shorten."
      });
    }
  }

  // Joke command logic
  if (message.content.startsWith('/joke')) {
    const joke = await getJoke();
    return message.reply({
      content: joke,
    });
  }

 
  // Dice roll command logic
  if (message.content.startsWith('/roll')) {
    const diceResult = rollDice();
    return message.reply({
      content: `You rolled a ${diceResult}! 🎲`,
    });
  }

  // Random fact command logic
  if (message.content.startsWith('/fact')) {
    const fact = await getRandomFact();
    return message.reply({
      content: fact,
    });
  }
});

client.on('interactionCreate', (interaction) => {
  interaction.reply("Pong!");
});

client.login(process.env.SECRET_KEY);  // Make sure to set the bot token in your .env file
