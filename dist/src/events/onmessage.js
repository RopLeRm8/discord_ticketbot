"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHandler = void 0;
const discord_js_1 = require("discord.js");
const dsbotconfig_1 = require("../../config/dsbotconfig");
const messageHandler = async (message) => {
    if (message.author.bot)
        return;
    if (!message.content.startsWith(dsbotconfig_1.config.prefix))
        return;
    const args = message.content.slice(dsbotconfig_1.config.prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();
    const msgAuthorPing = `<@${message.author.id}>`;
    switch (command) {
        case "clear":
            if (!message.member?.roles.cache.some((role) => role.name === "admin")) {
                message.channel.send(`Couldn't delete the messages due to the privilege limits ${msgAuthorPing}`);
                return;
            }
            const num = parseInt(args[0]);
            if (isNaN(num) || num < 1 || num > 100)
                return;
            if (!(message.channel instanceof discord_js_1.TextChannel))
                return;
            await message.channel
                .bulkDelete(num + 1, true)
                .catch((error) => console.error(`Could not delete messages: ${error}`));
            break;
        default:
            message.channel.send("Unknown command.");
    }
};
exports.messageHandler = messageHandler;
