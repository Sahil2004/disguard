import Discord, { Intents } from "discord.js";
import { BOT_TOKEN, MONGO_URI } from "./config";
import { connectToDB } from "./utils/mongo";
import { HandleMessage, HandleCommand } from "./controllers/index";
import { registeringCommands } from "./deployCommands";

const main = async () => {
  await connectToDB(MONGO_URI);

  const client = new Discord.Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_MESSAGES,
    ],
  });

  registeringCommands();

  client.on("interactionCreate", async (interaction: Discord.Interaction) => {
    if (!interaction.isCommand()) return;
    HandleCommand(interaction);
  });

  client.on("messageCreate", (msg: Discord.Message) => {
    HandleMessage(msg);
  });

  client.on("ready", () => {
    console.log(`--> Disguard is up and running!`);
  });

  client.login(BOT_TOKEN);
};

main();
