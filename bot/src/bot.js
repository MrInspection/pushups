require("dotenv").config();

const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");
const { Pushup } = require("./Pushups");
const moment = require("moment");

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

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("!speakpushup")) {
    if (message.author.id !== "382258788729880586") return;
    const text = message.content.slice(12); // Remove '!speak ' from the message

    // Delete the original message
    if (message.deletable) {
      await message.delete();
    }

    // Send the new message
    message.channel.send(text);
  }
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
            .setDescription("Keeping track of your Pushups")
            .setColor(0xff0000)
            .setFields(
              {
                name: `Your Push-ups Today:`,
                value: `${updatedPushup.pushups_today} push-ups!`,
                inline: false,
              },
              ...updatedPushup.history.slice(0, 7).reduce(
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
          console.log(updatedPushup);
        })
        .catch((err) => {
          // Handle error
          console.error(err);
        });
    default:
      return;
  }
});

client.login(process.env.DISCORD_TOKEN);
