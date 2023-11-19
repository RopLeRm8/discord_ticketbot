"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCommands = void 0;
const discord_js_1 = require("discord.js");
const index_1 = require("./index");
const setupCommands = async () => {
    const commands = await index_1.client.application?.commands.set([
        {
            name: "clear",
            description: "Clears a specified number of messages",
            options: [
                {
                    name: "number",
                    type: discord_js_1.ApplicationCommandOptionType.Integer,
                    description: "The number of messages to clear",
                    required: true,
                },
            ],
        },
        {
            name: "create",
            description: "Creates a new ticket",
            options: [
                {
                    name: "subject",
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    description: "The subject of the ticket",
                    required: true,
                },
            ],
        },
    ]);
    console.log("Commands registered:", commands);
};
exports.setupCommands = setupCommands;
