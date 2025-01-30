import { ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import Reminder, { IReminder, ReminderType } from "../schemas/reminder";



export default {
  data: new SlashCommandBuilder()
  .setName("calendar")
  .setDescription("View all upcoming events"),


  async  execute(interaction: ChatInputCommandInteraction) {
    const events = await Reminder.find().sort({ date: 1 });

    if (events.length === 0) {
        await interaction.reply("No upcoming events.");
        return;
    }

    const eventList = events.map(event => 
        `**${event.title}**\n📅 ${event.date ? event.date.toUTCString() : "Unknown Date"}\n🆔 ${event._id}\n${event.description || "No description"}`
    ).join("\n\n");
    
    await interaction.reply(eventList);
}

};
