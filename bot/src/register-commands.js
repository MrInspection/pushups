require("dotenv").config();

const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "access",
    description: "Helps you how to use Push-up Tracker",
  },
];

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
