"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionHandler = void 0;
const discord_js_1 = require("discord.js");
const isAdmin = (member) => {
    return member?.roles.cache.some((role) => role.name === "admin");
};
const interactionHandler = async (interaction) => {
    if (!interaction.isCommand())
        return;
    const commandName = interaction.commandName;
    const member = interaction.member;
    const options = interaction.options;
    let replyMessage = "";
    switch (commandName) {
        case "clear":
            if (!isAdmin) {
                replyMessage = "You don't have permission to use this command.";
            }
            const num = options.getInteger("number") || 0;
            if (num < 1 || num > 100) {
                replyMessage = "Invalid number of messages to delete.";
            }
            if (replyMessage.length > 0) {
                await interaction.reply({
                    content: replyMessage,
                    ephemeral: true,
                });
                return;
            }
            const channel = interaction.channel;
            if (channel instanceof discord_js_1.TextChannel) {
                await channel
                    .bulkDelete(num, true)
                    .catch((error) => console.error(`Could not delete messages: ${error}`));
                replyMessage = `${num} messages have been deleted.`;
            }
            break;
        case "create":
            const subject = options.getString("subject") || "No subject provided";
            const guild = interaction.guild;
            if (guild) {
                const channel = await guild.channels.create({
                    name: `ticket-${member.displayName}`,
                    type: discord_js_1.ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: guild.id,
                            deny: discord_js_1.PermissionsBitField.Flags.ViewChannel,
                        },
                        {
                            id: member.id,
                            allow: [
                                discord_js_1.PermissionsBitField.Flags.ViewChannel,
                                discord_js_1.PermissionsBitField.Flags.ReadMessageHistory,
                                discord_js_1.PermissionsBitField.Flags.SendMessages,
                            ],
                        },
                        {
                            id: "1162070495223619635",
                            allow: [
                                discord_js_1.PermissionsBitField.Flags.ViewChannel,
                                discord_js_1.PermissionsBitField.Flags.ReadMessageHistory,
                                discord_js_1.PermissionsBitField.Flags.SendMessages,
                            ],
                        },
                    ],
                });
                const row = {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 4,
                            label: "Close",
                            custom_id: "close_ticket",
                        },
                        {
                            type: 2,
                            style: 1,
                            label: "Claim",
                            custom_id: "claim_ticket",
                        },
                        {
                            type: 2,
                            style: 2,
                            label: "Invite",
                            custom_id: "invite_user",
                        },
                    ],
                };
                await channel.send({
                    content: "React with the buttons below to either close this ticket or claim it.",
                    components: [row],
                });
                replyMessage = `Ticket channel <#${channel.id}> created for subject: ${subject}.`;
            }
            else {
                replyMessage = "Could not find the guild.";
            }
            break;
        default:
            replyMessage = "Unknown command.";
    }
    await interaction.reply({
        content: replyMessage,
        ephemeral: true,
    });
};
exports.interactionHandler = interactionHandler;
