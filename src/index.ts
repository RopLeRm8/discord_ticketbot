import { Client, Events, IntentsBitField } from "discord.js";
import { startHandler } from "./events/onstart";
import { interactionHandler } from "./events/interactionCreate";
import buttonsHandler from "./handlers/buttonsHandler";
require("dotenv").config();

const myIntents = new IntentsBitField();
myIntents.add(
  IntentsBitField.Flags.GuildPresences,
  IntentsBitField.Flags.GuildMembers,
  IntentsBitField.Flags.MessageContent,
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMessages
);
export const client = new Client({ intents: myIntents });

client.once(Events.ClientReady, startHandler);
client.on(Events.InteractionCreate, interactionHandler);
client.on(Events.InteractionCreate, buttonsHandler);
client.login(process.env.BOT_TOKEN);
