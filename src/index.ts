import { Client, GatewayIntentBits, Message } from 'discord.js';
import Bot from './lib/bot';
import dotenv from "dotenv";
import initDB from './db';
import scheduleCommand from './prefixCommands/schedule';
import handleReminders, { startReminderService } from './lib/reminderHandler';


dotenv.config();
initDB();

export const bot = new Bot(
  new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      // GatewayIntentBits.GuildMembers,
      // GatewayIntentBits.GuildMessageReactions,
      // GatewayIntentBits.DirectMessages
    ]
  })
)
bot.client.on('messageCreate', async (message: Message) => {
  console.log(message.content)
  if (message.content.startsWith('!schedule')) {
    await scheduleCommand(message); 
  }
});


bot.client.once('ready', async () => {
  try {
    console.log('Bot is ready!');
    startReminderService(bot.client);
  } catch (error) {
    console.error('Error starting reminder service:', error);
  }
});


bot.client.login(process.env.TOKEN);






