require('dotenv').config();
const axios = require('axios');
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');

const { listChores, displayChores, displayLeaderboard, displayHelp } = require('./helpers');

const APPLICATION_ID = process.env.APPLICATION_ID;
const TOKEN = process.env.TOKEN;
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set';  // Default value for debugging
const GUILD_ID = process.env.GUILD_ID;

const app = express();
app.use(express.json());

// Initialize Axios instance
const discord_api = axios.create({
  baseURL: 'https://discord.com/api/',
  timeout: 3000,
  headers: {
    "Authorization": `Bot ${TOKEN}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Authorization"
  }
});

app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body;
  console.log("Received interaction:", interaction);

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    if (interaction.data.name === 'yo') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Yo ${interaction.member.user.username}!`,
        },
      });
    } else if (interaction.data.name === 'dm') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: '👍',
        },
      });
    } else if (interaction.data.name === 'chores') {
      const choreMessage = displayChores();
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: choreMessage,
        },
      });
    } else if (interaction.data.name === 'help') {
      const helpMessage = displayHelp();
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: helpMessage,
        },
      });
    }
  }
});

app.get('/register_commands', async (req, res) => {
  let slash_commands = [
    {
      "name": "yo",
      "description": "replies with Yo!",
      "options": []
    },
    {
      "name": "dm",
      "description": "sends user a DM",
      "options": []
    },
    {
      "name": "chores",
      "description": "lists today's chores",
      "options": []
    }
  ];

  try {
    let discord_response = await discord_api.put(
      `/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`,
      slash_commands
    );
    console.log(discord_response.data);
    return res.send('commands have been registered');
  } catch (e) {
    console.error(e.code);
    console.error(e.response?.data);
    return res.send(`${e.code} error from discord`);
  }
});

app.get('/', async (req, res) => {
  return res.send('Follow documentation');
});

app.listen(8999, () => {
  console.log('Server is running on port 8999');
});
