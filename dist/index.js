"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const onstart_1 = require("./events/onstart");
const interactionCreate_1 = require("./events/interactionCreate");
const buttonsHandler_1 = __importDefault(require("./handlers/buttonsHandler"));
require("dotenv").config();
const myIntents = new discord_js_1.IntentsBitField();
myIntents.add(discord_js_1.IntentsBitField.Flags.GuildPresences, discord_js_1.IntentsBitField.Flags.GuildMembers, discord_js_1.IntentsBitField.Flags.MessageContent, discord_js_1.IntentsBitField.Flags.Guilds, discord_js_1.IntentsBitField.Flags.GuildMessages);
exports.client = new discord_js_1.Client({ intents: myIntents });
exports.client.once(discord_js_1.Events.ClientReady, onstart_1.startHandler);
exports.client.on(discord_js_1.Events.InteractionCreate, interactionCreate_1.interactionHandler);
exports.client.on(discord_js_1.Events.InteractionCreate, buttonsHandler_1.default);
exports.client.login(process.env.BOT_TOKEN);
