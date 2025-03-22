import { Context } from "telegraf";
import { ExtraTelegraf } from "..";
import { Command } from "../Utils/commandHandler";

export default {
    name: "next",
    description: "Skip the current chat and search for a new one",
    execute: async (ctx: Context, bot: ExtraTelegraf) => {
        let reply = "Searching for a chat...";
        if (bot.runningChats.includes(ctx.from?.id as number)) {
            let partner = bot.getPartner(ctx.from?.id as number);
            reply = "You skipped the previous chat.\nSearching for a new chat..."
            bot.runningChats = bot.runningChats.filter(id => id !== ctx.from?.id && id !== partner);
            bot.messageMap.delete(ctx.from?.id as number);
            bot.messageMap.delete(partner);

            await ctx.telegram.sendMessage(partner, "Your partner has skipped this chat!\nUse /search to start a new chat.");
        }
        if (bot.waiting !== null) {
            bot.runningChats.push(bot.waiting, ctx.from?.id as number);
            await ctx.telegram.sendMessage(bot.waiting, "Found a chat!\n\nUse /end to leave the chat or use /next to skip the current chat.");
            bot.waiting = null;
            return ctx.reply("Found a new chat!\n\nUse /end to leave the chat or use /next to skip the current chat.");
        }

        bot.waiting = ctx.from?.id as number;
        return ctx.reply(reply);

    }
} as Command;