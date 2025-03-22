import { Context } from "telegraf";
import { ExtraTelegraf } from "..";


export default {
    name: "end",
    description: "End the chat",
    execute: async (ctx: Context, bot: ExtraTelegraf) => {
        if (bot.runningChats.includes(ctx.from?.id as number)) {
            let partner = bot.getPartner(ctx.from?.id as number);
            bot.runningChats = bot.runningChats.filter(id => id !== ctx.from?.id && id !== partner); // Remove both users from the runningChats array
            bot.messageMap.delete(ctx.from?.id as number); // Remove the user from the messageMap
            bot.messageMap.delete(partner); // Remove the partner from the messageMap
            await ctx.telegram.sendMessage(partner, "Your partner has ended the chat!\nUse /search to start a new chat.");
            return ctx.reply("You ended the chat.\n\nUse /search to start a new chat.");
        } else {
            return ctx.reply("You are not in a chat. Use /search to find a chat partner.");
        }
    }
}
