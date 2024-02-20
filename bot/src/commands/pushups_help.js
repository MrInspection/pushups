const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");

// Export an object with data and execute properties
module.exports = {
  // The data property contains the command definition
  data: new SlashCommandBuilder()
    .setName("pushups_help") // The name of the command
    .setDescription("Helps you to use Pushup Tracker"), // The description of the command
  // The execute property contains the function that runs when the command is used
  async execute(interaction) {
    // Reply to the user with a message
    const embed2 = new EmbedBuilder()
      .setTitle("Pushup Tacker - Help center")
      .setDescription("Helps you to keep track of your Pushups")
      .setColor(0xff0000)
      .setFields(
        {
          name: `Website`,
          value: `You can use the link: https://paftrsickl.github.io/pushups/`,
          inline: false,
        },
        {
          name: `/pushups_status`,
          value: `shows your status of pushups you have done in a day and 7 days from your history`,
          inline: false,
        },
        {
          name: `/pushups {pushups: Number}`,
          value: `Increments the number of Pushups you have done in a day`,
          inline: false,
        },
        {
          name: `/pushups_history`,
          value: `Shows your history of Pushups`,
          inline: false,
        }
      );
    interaction.reply({ embeds: [embed2] });
  },
};
