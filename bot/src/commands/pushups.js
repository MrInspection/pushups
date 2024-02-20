const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { Pushup } = require("../Pushups");
const moment = require("moment");
// Export an object with data and execute properties
module.exports = {
  // The data property contains the command definition
  data: new SlashCommandBuilder()
    .setName("pushups") // The name of the command
    .setDescription("Increments the number of pushup you have done in a day")
    .addNumberOption((option) =>
      option
        .setName("pushups")
        .setDescription("The number of Pushup")
        .setRequired(true)
    ),
  // The execute property contains the function that runs when the command is used
  async execute(interaction) {
    const userId = interaction.member.id;
    const numberOfPushups = interaction.options.get("pushups").value;

    Pushup.findOne({ user_id: `${userId}` })
      .then((pushup) => {
        if (pushup) {
          // If the document exists, use the incrementPushups method
          return pushup.incrementPushups(numberOfPushups);
        } else {
          // If the document doesn't exist, create a new one
          const newPushup = new Pushup({
            user_id: `${userId}`,
            pushups_today: numberOfPushups,
            today: new Date(),
          });
          return newPushup.save();
        }
      })
      .then((updatedPushup) => {
        const embed2 = new EmbedBuilder()
          .setTitle("Push-Up Tracker")
          .setDescription(`Your did ${numberOfPushups} Push-ups right now!:`)
          .setColor(0xff0000)
          .setFields({
            name: `Total number of Push-Ups today:`,
            value: `${updatedPushup.pushups_today} push-ups!`,
            inline: false,
          });

        interaction.reply({ embeds: [embed2] });
      })
      .catch((err) => {
        // Handle error
        console.error(err);
        interaction.reply(
          "We are having a problem with our API right now please try again later"
        );
      });
  },
};
