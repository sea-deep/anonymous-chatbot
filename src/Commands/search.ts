import { Context } from "telegraf";
import { ExtraTelegraf } from "..";


export default {
    name: "search",
    description: "Search for a chat",
    execute: async (ctx: Context, bot: ExtraTelegraf) => {
        if (bot.runningChats.includes(ctx.from?.id as number)) {
            return ctx.reply("You are already in a chat!\n\nUse /end to leave the chat or use /next to skip the current chat.");
        }
        if (bot.waiting === ctx.from?.id) {
            return ctx.reply("You are already in the queue!");
        } else if (bot.waiting !== null) {
            bot.runningChats.push(bot.waiting, ctx.from?.id as number);
            await ctx.telegram.sendMessage(bot.waiting, "Found a chat!\n\nUse /end to leave the chat or use /next to skip the current chat.");
            bot.waiting = null;
            return ctx.reply("Found a chat!\n\nUse /end to leave the chat or use /next to skip the current chat.");
        }
        bot.waiting = ctx.from?.id as number;
        return ctx.reply("Searching for a chat...");
    }
}