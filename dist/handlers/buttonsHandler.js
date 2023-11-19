"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const claimedTickets = new Map();
async function buttonsHandler(interaction) {
    if (!interaction.isButton() || !interaction)
        return;
    const customId = interaction.customId;
    const channel = interaction.channel;
    const user = interaction.user;
    const member = interaction.guild?.members.cache.get(user.id);
    const isAdmin = member?.roles.cache.some((role) => role.name === "admin");
    const isTicketCreator = channel?.name.includes(member?.displayName || "");
    const isClaimed = claimedTickets.has(channel.id);
    switch (customId) {
        case "close_ticket":
            if (channel &&
                channel.type === discord_js_1.ChannelType.GuildText &&
                channel.deletable) {
                await interaction.reply(`Closing ticket in 60 seconds...`);
                let counter = 60;
                const intervalId = setInterval(async () => {
                    if (counter > 0) {
                        await interaction.editReply(`Closing ticket in ${counter--} seconds...`);
                    }
                    else {
                        clearInterval(intervalId);
                    }
                }, 1000);
                if (!interaction.guild)
                    return;
                try {
                    channel.permissionOverwrites.set([
                        {
                            id: interaction.guild.id,
                            deny: [discord_js_1.PermissionsBitField.Flags.SendMessages],
                            allow: [
                                discord_js_1.PermissionsBitField.Flags.ViewChannel,
                                discord_js_1.PermissionsBitField.Flags.ReadMessageHistory,
                            ],
                        },
                    ]);
                    console.log("Updated Permissions:", channel.permissionOverwrites.cache.map((p) => p.toJSON()));
                }
                catch (error) {
                    console.error(`Failed to override permissions`);
                }
                setTimeout(async () => {
                    clearInterval(intervalId);
                    await channel.delete("Closed by user");
                }, 60000);
            }
            break;
        case "claim_ticket":
        case "claim_ticket":
            if (channel && isAdmin && !isTicketCreator && !isClaimed) {
                await interaction.reply({
                    content: "Ticket claimed.",
                    ephemeral: true,
                });
                claimedTickets.set(channel.id, user.id);
                await channel.send(`<@${user.id}> has claimed this ticket.`);
            }
            else {
                let message = "You cannot claim this ticket.";
                if (isClaimed)
                    message = "This ticket has already been claimed.";
                await interaction.reply({ content: message, ephemeral: true });
            }
            break;
        case "invite_user":
            if (channel) {
                if (!isAdmin) {
                    await interaction.reply({
                        content: "You are not allowed to invite.",
                        ephemeral: true,
                    });
                    return;
                }
                await interaction.reply({
                    content: "Please insert user ID to add a user.",
                    ephemeral: true,
                });
                const filter = (m) => m.author.id === interaction.user.id;
                const collector = channel.createMessageCollector({
                    filter,
                    time: 30000,
                    max: 1,
                });
                collector.on("collect", async (message) => {
                    const userIdToInvite = message.content;
                    if (/^\d+$/.test(userIdToInvite)) {
                        await channel.permissionOverwrites.edit(userIdToInvite, {
                            ViewChannel: true,
                            SendMessages: true,
                            ReadMessageHistory: true,
                        });
                        await interaction.followUp({
                            content: "User has been invited.",
                            ephemeral: true,
                        });
                    }
                    else {
                        await interaction.followUp({
                            content: "Invalid user ID.",
                            ephemeral: true,
                        });
                    }
                });
                collector.on("end", (collected) => {
                    if (collected.size === 0) {
                        interaction.followUp({
                            content: "No user ID provided. Invitation cancelled.",
                            ephemeral: true,
                        });
                    }
                });
            }
            break;
        default:
            await interaction.reply({
                content: "Unknown action.",
                ephemeral: true,
            });
    }
}
exports.default = buttonsHandler;
