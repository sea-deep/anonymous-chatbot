import * as dotenv from 'dotenv';
dotenv.config();

import { Context, Telegraf } from "telegraf";

export class ExtraTelegraf extends Telegraf<Context> {
    waiting: number | null = null;
    runningChats: Array<number> = [];
    messageMap: Map<number, { [key: number]: number }> = new Map();
    getPartner(id: number) {
        let index = this.runningChats.indexOf(id);
        if (index % 2 === 0) {
            return this.runningChats[index + 1];
        } else {
            return this.runningChats[index - 1];
        }
    }
}

export const bot = new ExtraTelegraf(process.env.BOT_TOKEN);

import("./Utils/commandHandler.js");
import("./Utils/eventHandler.js");
import("./Utils/actionHandler.js");

console.log("[INFO] - Bot is online");
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));