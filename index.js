const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "!";

const logCommand = require('./commands/log');
const deleteCommand = require('./commands/delete');
const showCommand = require('./commands/show');

bot.on('ready', () => {
  console.log('Bot is online!');
});

bot.on('message', message => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'log':
      logCommand.execute(message, args);
      break;
    case 'delete':
      deleteCommand.execute(message, args);
      break;
    case 'show':
      showCommand.execute(message);
      break;
    default:
      message.channel.send("Invalid command.");
  }
});

bot.login(process.env.BOT_TOKEN);
