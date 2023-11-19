"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionHandler = void 0;
const discord_js_1 = require("discord.js");
const interactionHandler = async (interaction) => {
    console.log("start");
    if (!interaction.isCommand())
        return;
    console.log("pass");
    const { commandName } = interaction;
    if (commandName === "clear") {
        if ("roles" in interaction.member) {
            const member = interaction.member;
            if (!member.roles.cache.some((role) => role.name === "admin")) {
                await interaction.reply({
                    content: "You don't have permission to use this command.",
                    ephemeral: true,
                });
                return;
            }
        }
        const options = interaction.options;
        const num = options.getInteger("number");
        if (!num || num < 1 || num > 100) {
            await interaction.reply({
                content: "Invalid number of messages to delete.",
                ephemeral: true,
            });
            return;
        }
        const channel = interaction.channel;
        if (channel instanceof discord_js_1.TextChannel) {
            await channel
                .bulkDelete(num + 1, true)
                .catch((error) => console.error(`Could not delete messages: ${error}`));
            await interaction.reply({
                content: "Messages deleted.",
                ephemeral: true,
            });
        }
    }
};
exports.interactionHandler = interactionHandler;
