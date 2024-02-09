require("dotenv").config();

const { Client, IntentsBitField } = require("discord.js");

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
      interaction.reply(
        "You can access the Push-up Tracker here using the commands, `/pushups` or if you prefer you can also use the website https://paftrsickl.github.io/pushups/"
      );
    default:
      return;
  }
});

client.login(process.env.DISCORD_TOKEN);
