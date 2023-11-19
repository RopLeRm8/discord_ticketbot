"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const onstart_1 = require("./events/onstart");
const onmessage_1 = require("./events/onmessage");
require("dotenv").config();
const myIntents = new discord_js_1.IntentsBitField();
myIntents.add(discord_js_1.IntentsBitField.Flags.GuildPresences, discord_js_1.IntentsBitField.Flags.GuildMembers, discord_js_1.IntentsBitField.Flags.MessageContent, discord_js_1.IntentsBitField.Flags.Guilds, discord_js_1.IntentsBitField.Flags.GuildMessages);
const client = new discord_js_1.Client({ intents: myIntents });
client.once(discord_js_1.Events.ClientReady, onstart_1.startHandler);
client.on(discord_js_1.Events.MessageCreate, onmessage_1.messageHandler);
client.login(process.env.BOT_TOKEN);
