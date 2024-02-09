require("dotenv").config();

const {
  REST,
  Routes,
  Application,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} = require("discord.js");

const commands = [
  {
    name: "access",
    description: "Helps you how to use Push-up Tracker",
  },
  {
    name: "pushups",
    description: "Keep track of your Push-ups",
    options: [
      {
        name: "pushups",
        description: "Number of Push-ups",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
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
