require("dotenv").config();

const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  Collection,
} = require("discord.js");
const mongoose = require("mongoose");
const { Pushup } = require("./Pushups");
const moment = require("moment");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log(`it's connect to the database`);
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online`);
});

// Create a collection to hold your slash commands
client.slashCommands = new Collection();

// Read all the files in the slashCommands folder
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".js"));

// Loop through the files and add them to the collection
for (const file of commandFiles) {
  // Require the file and get the exported object
  const command = require(path.join(__dirname, `./commands/${file}`));
  // Set the command name as the key and the command object as the value in the collection
  client.slashCommands.set(command.data.name, command);
}

// Write the event handler for the interactionCreate event
client.on("interactionCreate", async (interaction) => {
  // Check if the interaction is a slash command
  if (interaction.isCommand()) {
    // Get the command from the collection
    const command = client.slashCommands.get(interaction.commandName);

    // If the command exists, try to execute it
    if (command) {
      try {
        await command.execute(interaction);
      } catch (error) {
        // If there is an error, log it and reply with a message
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
