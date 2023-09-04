// This is like turning the robot on and setting up its tools.
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');

// These are ChoreBot's memory about chores and how to show them.
const { listChores, displayChores, displayLeaderboard, displayHelp } = require('./choreUtilities');

// These are secret codes ChoreBot needs to talk to Discord, its home.
const APPLICATION_ID = process.env.APPLICATION_ID;
const TOKEN = process.env.TOKEN;
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set';
const GUILD_ID = process.env.GUILD_ID;

// This is like ChoreBot's ear, listening to people talking in Discord.
const app = express();
app.use(express.json());

// ChoreBot uses this to understand and speak Discord's language.
const discord_api = axios.create({
  baseURL: 'https://discord.com/api/',
  timeout: 3000,
  headers: {
    "Authorization": `Bot ${TOKEN}`
  }
});

// When someone talks to ChoreBot, this is how ChoreBot responds.
app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body;

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    if (interaction.data.name === 'yo') {
      // If someone says "yo", ChoreBot says "Yo [your name]!" back.
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Yo ${interaction.member.user.username}!`,
        },
      });
    } else if (interaction.data.name === 'chores') {
      // If someone asks for chores, ChoreBot shows the chore list.
      const choreMessage = displayChores();
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: choreMessage,
        },
      });
    } else if (interaction.data.name === 'help') {
      // If someone needs help, ChoreBot shows how to use it.
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

// These are the things people can say to ChoreBot. Like "yo", "chores", or "help".
app.get('/register_commands', async (req, res) => {
  let commands = [
    {
      "name": "yo",
      "description": "replies with Yo!",
    },
    {
      "name": "chores",
      "description": "lists today's chores",
    },
    {
      "name": "help",
      "description": "provides help information",
    }
  ];

  try {
    await discord_api.put(
      `/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`,
      commands
    );
    return res.send('commands have been registered');
  } catch (e) {
    return res.send(`Oops, something went wrong: ${e.code}`);
  }
});

// ChoreBot will say this if someone finds it but doesn't know how to use it.
app.get('/', async (req, res) => {
  return res.send('Follow the instructions to talk to me!');
});

// ChoreBot's ear is now fully open, and it's listening on channel 8999.
app.listen(8999, () => {
  console.log('ChoreBot is listening and ready to help!');
});
