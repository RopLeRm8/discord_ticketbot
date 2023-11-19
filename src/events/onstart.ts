import { setupCommands } from "../commands";

export const startHandler = async () => {
  console.log("Bot is online!");
  setupCommands();
};
