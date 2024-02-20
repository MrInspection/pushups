const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { Pushup } = require("../Pushups");
const moment = require("moment");

// Export an object with data and execute properties
module.exports = {
  // The data property contains the command definition
  data: new SlashCommandBuilder()
    .setName("pushups_status") // The name of the command
    .setDescription("Show you your status of pushups"), // The description of the command
  // The execute property contains the function that runs when the command is used
  async execute(interaction) {
    // Reply to the user with a message
    const userId = interaction.member.id;

    let pushup = await Pushup.findOne({ user_id: `${userId}` });

    if (!pushup) {
      pushup = {
        pushups_today: 0,
        history: [],
      };
    }

    const embed2 = new EmbedBuilder()
      .setTitle("Push-Up Tracker")
      .setDescription("Keeping track of your Pushups")
      .setColor(0xff0000)
      .setFields(
        {
          name: `Your Push-ups Today:`,
          value: `${pushup.pushups_today} push-ups!`,
          inline: false,
        },
        ...pushup.history.slice(0, 7).reduce(
          (acc, now) => [
            ...acc,
            {
              name: `Date ${moment(now.date).format("MM DD - YYYY")}`,
              value: `${now.pushups} Push-ups`,
            },
          ],
          []
        )
      );

    interaction.reply({ embeds: [embed2] });
  },
};
