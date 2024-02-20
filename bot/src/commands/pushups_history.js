const { SlashCommandBuilder } = require("@discordjs/builders");
const moment = require("moment");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");

const { Pushup } = require("../Pushups");

// Define a function to create embeds for each page
const generateEmbed = (myList, itemsPerPage, start) => {
  // Slice the list to get the current page
  const current = myList.slice(start, start + itemsPerPage);

  // Create a new embed with the title and description
  const embed = new EmbedBuilder()
    .setTitle("Push-Up Tracker")
    .setDescription("Keeping track of your Pushups")
    .setColor(0xff0000)
    .addFields(
      current.map((item) => ({
        name: `Date ${moment(item.date).format("MM DD - YYYY")}`,
        value: `Pushups - ${item.pushups}`,
      }))
    );

  // Return the embed
  return embed;
};

// Define a function to create buttons for the previous and next page
const generateButtons = (myList, itemsPerPage, start) => {
  const rows = new ActionRowBuilder();
  // Create a new button for the previous page
  const backButton = new ButtonBuilder()
    .setCustomId("back")
    .setLabel("Back")
    .setStyle(4)
    .setEmoji("⬅️");

  // Create a new button for the next page
  const nextButton = new ButtonBuilder()
    .setCustomId("next")
    .setLabel("Next")
    .setStyle(3)
    .setEmoji("➡️");

  // Create an array of buttons
  [
    // Add the back button if it is not the first page
    ...(start ? [backButton] : []),
    // Add the next button if it is not the last page
    ...(start + itemsPerPage < myList.length ? [nextButton] : []),
  ].map((button) => {
    rows.components.push(button);
  });

  // Return the buttons
  return rows;
};

// Export an object with data and execute properties
module.exports = {
  // The data property contains the command definition
  data: new SlashCommandBuilder()
    .setName("pushups_history") // The name of the command
    .setDescription("Show you the history of Pushups you have done"), // The description of the command
  // The execute property contains the function that runs when the command is used
  async execute(interaction) {
    const userId = interaction.member.id;

    let pushup = await Pushup.findOne({ user_id: `${userId}` });

    if (!pushup) {
      pushup = {
        pushups_today: 0,
        history: [],
      };
    }

    // Create a message component collector to listen for button clicks
    const collector = interaction.channel.createMessageComponentCollector({
      // Only collect button clicks from the original user
      filter: (i) => i.user.id === interaction.user.id,
      // Set a time limit
      time: 60000,
    });
    let index = 1;
    const itemsPerPage = 3;
    // Set a collect event listener
    collector.on("collect", async (i) => {
      // Update the index based on the button clicked
      i.customId === "back" ? (index -= itemsPerPage) : (index += itemsPerPage);

      // Edit the original message with a new embed and new buttons
      await i.update({
        embeds: [generateEmbed(pushup.history, itemsPerPage, index)],
        components: [generateButtons(pushup.history, itemsPerPage, index)],
      });
    });

    // Set an end event listener
    collector.on("end", (collected, reason) => {
      // Edit the original message with a new embed and no buttons
      interaction.editReply({
        embeds: [generateEmbed(pushup.history, 3, index)],
        components: [],
      });
    });

    // Reply to the user with a message
    await interaction.reply({
      embeds: [generateEmbed(pushup.history, 3, 1)],
      components: [generateButtons(pushup.history, itemsPerPage, 1)],
    });
  },
};
