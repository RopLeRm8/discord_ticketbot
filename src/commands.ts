import { ApplicationCommandOptionType } from "discord.js";
import { client } from "./index";

export const setupCommands = async () => {
  const commands = await client.application?.commands.set([
    {
      name: "clear",
      description: "Clears a specified number of messages",
      options: [
        {
          name: "number",
          type: ApplicationCommandOptionType.Integer,
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
          type: ApplicationCommandOptionType.String,
          description: "The subject of the ticket",
          required: true,
        },
      ],
    },
  ]);
  console.log("Commands registered:", commands);
};
