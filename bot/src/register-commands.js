require("dotenv").config();
const path = require("path");
const fs = require("fs");

const {
  REST,
  Routes,
  Application,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} = require("discord.js");

// Create an array to store your command data
const commands = [];

// Read all the files in the slashCommands folder
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands/"))
  .filter((file) => file.endsWith(".js"));

// Loop through the files and add the command data to the array
for (const file of commandFiles) {
  // Require the file and get the exported object
  const command = require(path.join(__dirname, "commands/", file));
  // Push the command data to the array
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registering slash commands");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Commands was registered successfully");
  } catch (error) {
    console.log(`there was an error ${error}`);
  }
})();
