import { Context, Telegraf } from "telegraf";
import { Command } from "../Utils/commandHandler";


export default {
    name: "start",
    description: "Start the bot",
    execute: async (ctx: Context, bot: Telegraf<Context>) => {
        await ctx.reply(`Hello @${ctx.from?.username}!\n\nUse /search to start a new chat.\nUse /help to see the available commands.`);
    }
} as Command;