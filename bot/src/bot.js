require("dotenv").config();

const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const { pushups, addPushUp } = require("./Pushups");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "access":
      const embed = new EmbedBuilder()
        .setTitle("Push-Up Tracker")
        .setDescription("How to use Push-Up Tracker")
        .setColor(0xff0000)
        .setFields(
          {
            name: "Commands",
            value: "/pushups {number}",
            inline: false,
          },
          {
            name: "Website",
            value: "https://paftrsickl.github.io/pushups/",
            inline: false,
          }
        );
      interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    case "pushups":
      addPushUp(interaction);
      const embed2 = new EmbedBuilder()
        .setTitle("Push-Up Tracker")
        .setDescription("Keeping track of your Pushups")
        .setColor(0xff0000)
        .setFields(
          {
            name: `Today:`,
            value: `Your Push-Ups Today: ${
              pushups[interaction.member.id].pushups
            }`,
            inline: false,
          },
          ...pushups[interaction.member.id].history.slice(0, 7).reduce(
            (acc, now) => [
              ...acc,
              {
                name: `Date ${now.date}`,
                value: `${now.count} Push-ups`,
              },
            ],
            []
          )
        );

      interaction.reply({ embeds: [embed2] });
    default:
      return;
  }
});

client.login(process.env.DISCORD_TOKEN);
