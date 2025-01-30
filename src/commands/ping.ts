import { CommandInteraction, SlashCommandBuilder } from 'discord.js';


export default {
  data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('ping the bot'),


  async execute(interaction: CommandInteraction) {
    await interaction.reply('Ponghngfhjg !');
  }
};
