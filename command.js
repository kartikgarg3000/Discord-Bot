import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const commands = [
    {
        name: 'create',
        description: 'Create short URL',
        type: 1,
    },
    {
        name: 'joke',
        description: 'Tell a random joke',
        type: 1, // Slash command
    },
    {
        name: 'roll',
        description: 'Your roll diced',
        type: 1, // Slash command
    },
    {
        name: 'fact',
        description: 'Your random fact',
        type: 1, // Slash command
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.SECRET_KEY);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands('1303801803032367227'), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}
