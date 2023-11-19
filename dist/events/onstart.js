"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startHandler = void 0;
const commands_1 = require("../commands");
const startHandler = async () => {
    console.log("Bot is online!");
    (0, commands_1.setupCommands)();
};
exports.startHandler = startHandler;
